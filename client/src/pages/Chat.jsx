import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const suggestions = [
  "What services do you offer?",
  "How much does a project cost?",
  "Can you build an AI agent?",
  "How do I get started?",
];

export default function Chat() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hi! I'm ZeeBot, your AI assistant. Ask me anything about our services, pricing, or how to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    // Snapshot the prior turns so the bot has conversation memory.
    const history = messages.map((m) => ({ role: m.role === "user" ? "user" : "bot", text: m.text }));

    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      const reply =
        res.ok && data.success
          ? data.reply
          : data.error || "Sorry, something went wrong. Please try again.";
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "I couldn't reach the server. Please check your connection and try again." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  return (
    <main className="bg-black min-h-screen pt-28 md:pt-32 pb-10">
      <div className="max-w-[820px] mx-auto px-4 md:px-6 h-[calc(100vh-160px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-white/10">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-[#CCFF00] flex items-center justify-center text-black font-extrabold text-lg">
              Z
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-black" />
          </div>
          <div>
            <h1 className="text-white font-semibold leading-tight">ZeeBot Assistant</h1>
            <p className="text-white/50 text-xs">Online · typically replies instantly</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-[#CCFF00] flex items-center justify-center text-black font-bold text-sm shrink-0 mr-2 mt-0.5">
                  Z
                </div>
              )}
              <div
                className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#CCFF00] text-black rounded-br-md"
                    : "bg-[#141414] border border-white/10 text-white/90 rounded-bl-md"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-[#CCFF00] flex items-center justify-center text-black font-bold text-sm shrink-0 mr-2 mt-0.5">
                Z
              </div>
              <div className="bg-[#141414] border border-white/10 rounded-2xl rounded-bl-md px-4 py-3.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 pb-4">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs text-white/70 border border-white/15 hover:border-[#CCFF00] hover:text-[#CCFF00] rounded-full px-4 py-2 transition"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-[#141414] border border-white/10 rounded-full p-1.5 focus-within:border-[#CCFF00]/50 transition"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm px-4 py-2.5 outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            className="w-10 h-10 rounded-full bg-[#CCFF00] hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </main>
  );
}
