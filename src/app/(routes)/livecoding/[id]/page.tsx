"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import useWebSocket from '@/features/livecoding/hooks/LiveCodingWebSocket'

export default function LiveCodingPage() {
  const params = useParams();
  const roomId = typeof params.id === "string" ? params.id : ""; // ✅ 안전한 값 체크
  const { messages, sendMessage, isConnected } = useWebSocket(roomId);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-xl font-semibold mb-4">Live Coding Room: {roomId}</h1>
        <div className="h-64 overflow-y-auto border rounded-lg p-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className="p-2 rounded-lg bg-blue-100 mb-2">{msg}</div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
        </p>
      </div>
    </div>
  );
}
