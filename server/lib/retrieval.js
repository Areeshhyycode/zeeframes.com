// Lightweight retrieval helpers for grounding the chatbot in uploaded
// documents. No external vector DB required: we split text into overlapping
// chunks and score them against the question by keyword overlap. If a
// GROQ_API_KEY is configured the matched context is sent to an LLM for a
// natural answer; otherwise we fall back to returning the best-matching passage.

const CHUNK_SIZE = 1200;
const CHUNK_OVERLAP = 200;

// Split a long string into ~CHUNK_SIZE character pieces with some overlap so a
// sentence spanning a boundary is still retrievable.
function chunkText(text) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return [];

  const chunks = [];
  let start = 0;
  while (start < clean.length) {
    const end = Math.min(start + CHUNK_SIZE, clean.length);
    chunks.push(clean.slice(start, end));
    if (end === clean.length) break;
    start = end - CHUNK_OVERLAP;
  }
  return chunks;
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'to',
  'of', 'in', 'on', 'for', 'with', 'do', 'does', 'how', 'what', 'can', 'you',
  'your', 'i', 'me', 'my', 'we', 'it', 'this', 'that', 'at', 'as', 'by',
]);

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

// Score every chunk against the question and return the top matches.
function retrieve(question, allChunks, topK = 4) {
  const qTokens = tokenize(question);
  if (!qTokens.length || !allChunks.length) return [];

  const scored = allChunks.map((chunk) => {
    const tokens = new Set(tokenize(chunk));
    let score = 0;
    for (const t of qTokens) if (tokens.has(t)) score += 1;
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
}

const HANDOFF = "I'm not certain about that based on what I have. I'll connect you with a human from our team.";

// Generate an answer. Uses Groq if configured, else an extractive fallback.
async function generateAnswer(question, contextChunks, history = []) {
  const context = contextChunks.join('\n\n---\n\n');

  if (process.env.GROQ_API_KEY) {
    try {
      return await groqAnswer(question, context, history);
    } catch (err) {
      console.error('Groq generation failed, falling back:', err.message);
    }
  }

  // No LLM available — return the most relevant passage directly.
  if (!contextChunks.length) return HANDOFF;
  const best = contextChunks[0];
  return best.length > 600 ? best.slice(0, 600).trim() + '…' : best.trim();
}

async function groqAnswer(question, context, history) {
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const systemPrompt =
    'You are ZeeBot, the AI customer support agent for ZeeFrames, an AI automation agency. ' +
    'Answer the user ONLY using the CONTEXT below. Be concise and friendly. ' +
    "If the context does not contain the answer, reply with exactly: \"" + HANDOFF + "\"\n\n" +
    'CONTEXT:\n' + (context || '(no relevant documents found)');

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6).map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: String(m.text || ''),
    })),
    { role: 'user', content: question },
  ];

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 500 }),
  });

  if (!res.ok) {
    throw new Error(`Groq API ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || HANDOFF;
}

module.exports = { chunkText, retrieve, generateAnswer, HANDOFF };
