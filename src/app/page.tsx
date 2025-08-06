"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are Dave-Agent, a helpful AI assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (data?.choices?.[0]?.message) {
        setMessages([...newMessages, data.choices[0].message]);
      } else {
        console.error("Unexpected API response:", data);
        alert("Something went wrong. Please check your API key or request.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error. Please check your API key or network.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🤖 Dave-Agent</h1>

      <div className="w-full max-w-2xl space-y-4 bg-gray-800 p-4 rounded-lg overflow-y-auto h-[70vh]">
        {messages.slice(1).map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded ${
              msg.role === "user"
                ? "bg-blue-600 text-right"
                : "bg-gray-700 text-left"
            }`}
          >
            <p>
              <strong>{msg.role === "user" ? "You" : "Dave-Agent"}:</strong>{" "}
              {msg.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 w-full max-w-2xl flex">
        <input
          className="flex-1 p-3 rounded-l bg-gray-700 text-white outline-none"
          value={input}
          placeholder="Ask Dave-Agent something..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-green-600 px-4 rounded-r hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </main>
  );
}
