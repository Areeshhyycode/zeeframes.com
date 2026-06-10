import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiUrl } from "../lib/api";

export default function Admin() {
  const { user, token } = useAuth();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const fileRef = useRef(null);

  const authHeaders = { Authorization: `Bearer ${token}` };

  const loadDocs = async () => {
    try {
      const res = await fetch(apiUrl("/api/documents"), { headers: authHeaders });
      const data = await res.json();
      if (res.ok && data.success) setDocs(data.data);
      else setError(data.error || "Failed to load documents");
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Please choose a file first.");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);

    setUploading(true);
    try {
      const res = await fetch(apiUrl("/api/documents"), {
        method: "POST",
        headers: authHeaders,
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }
      setNotice(`Added "${data.data.name}" (${data.data.chunkCount} chunks) to the knowledge base.`);
      if (fileRef.current) fileRef.current.value = "";
      loadDocs();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove "${name}" from the knowledge base?`)) return;
    try {
      const res = await fetch(apiUrl(`/api/documents/${id}`), {
        method: "DELETE",
        headers: authHeaders,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDocs((d) => d.filter((doc) => doc._id !== id));
      } else {
        setError(data.error || "Delete failed");
      }
    } catch {
      setError("Could not reach the server.");
    }
  };

  return (
    <main className="bg-black min-h-screen pt-28 md:pt-32 pb-16 px-4">
      <div className="max-w-[900px] mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-white text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-white/50 text-sm mt-1">
              Signed in as {user?.name} · Upload documents to teach ZeeBot
            </p>
          </div>
          <span className="text-xs font-medium text-[#CCFF00] border border-[#CCFF00]/30 bg-[#CCFF00]/10 rounded-full px-3 py-1">
            ADMIN
          </span>
        </div>

        {/* Upload card */}
        <form
          onSubmit={handleUpload}
          className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-white font-semibold mb-1">Add to knowledge base</h2>
          <p className="text-white/50 text-sm mb-4">
            Upload a PDF, TXT or MD file. ZeeBot will answer customer questions using its contents.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.txt,.md,application/pdf,text/plain"
              className="flex-1 text-sm text-white/70 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#CCFF00] file:text-black file:font-semibold file:cursor-pointer bg-[#141414] border border-white/10 rounded-lg p-1.5"
            />
            <button
              type="submit"
              disabled={uploading}
              className="bg-[#CCFF00] hover:bg-yellow-300 disabled:opacity-50 text-black font-semibold rounded-lg px-6 py-2.5 transition whitespace-nowrap"
            >
              {uploading ? "Processing…" : "Upload"}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          {notice && <p className="text-[#CCFF00] text-sm mt-3">{notice}</p>}
        </form>

        {/* Documents list */}
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">
            Knowledge base{" "}
            <span className="text-white/40 font-normal text-sm">({docs.length})</span>
          </h2>

          {loading ? (
            <p className="text-white/40 text-sm">Loading…</p>
          ) : docs.length === 0 ? (
            <p className="text-white/40 text-sm">No documents yet. Upload one above to get started.</p>
          ) : (
            <ul className="divide-y divide-white/10">
              {docs.map((doc) => (
                <li key={doc._id} className="flex items-center justify-between py-3 gap-4">
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{doc.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {doc.chunkCount} chunks · {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(doc._id, doc.name)}
                    className="text-red-400/80 hover:text-red-400 text-sm shrink-0 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
