"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import useWebSocket from "@/features/livecoding/hooks/LiveCodingWebSocket";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

export default function LiveCodingPage() {
  const params = useParams();
  const roomId = typeof params.id === "string" ? params.id : "";
  const { messages, sendMessage } = useWebSocket(roomId);
  const [input, setInput] = useState("");
  const [code, setCode] = useState("// 실시간 코드 공유\nconsole.log('Hello, World!');");

  const inputRef = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // 초대 링크 복사 함수
  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://livecoding.example.com/room/${roomId}`);
      alert("초대 링크가 복사되었습니다!");
    } catch (err) {
      console.error("초대 링크 복사 실패:", err);
    }
  };

  // 엔터 입력 시 메시지 전송 후 채팅창으로 포커스 이동
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        sendMessage(input);
        setInput("");
        setTimeout(() => {
          chatBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 100);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      {/* 방정보 영역 */}
      <div className="w-full bg-white dark:bg-gray-800 shadow-md px-6 py-2 flex items-center text-sm font-semibold border-b border-gray-300 dark:border-gray-700">
        <span className="text-gray-900 dark:text-gray-100">참여인원 (1/3)</span>
      </div>

      <div className="flex flex-grow">
        {/* 코드 편집기 (8) */}
        <div className="w-4/5 p-6 flex flex-col">
          <div className="flex-grow border rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4">
            <CodeMirror
              value={code}
              height="500px"
              theme={dracula}
              extensions={[javascript()]}
              onChange={(value) => setCode(value)}
            />
          </div>
        </div>

        {/* 채팅 영역 (2) */}
        <div className="w-1/5 p-4 bg-gray-200 dark:bg-gray-800 border-l border-gray-400 dark:border-gray-700 flex flex-col">
          {/* 채팅 제목 & 초대링크 복사 버튼 */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">채팅</h2>
            <button
              onClick={copyInviteLink}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              초대링크 복사
            </button>
          </div>

          {/* 채팅 메시지 영역 */}
          <div
            className="flex-grow h-72 overflow-y-auto p-2 border rounded-lg bg-white dark:bg-gray-900"
            onClick={() => inputRef.current?.focus()} // 클릭 시 입력창 포커스
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-600 mb-1 text-sm text-gray-900 dark:text-gray-100"
              >
                {msg}
              </div>
            ))}
            <div ref={chatBoxRef} />
          </div>

          {/* 채팅 입력 영역 */}
          <div className="mt-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring focus:ring-blue-400"
              placeholder="메시지 입력... (Enter: 전송, Shift+Enter: 줄바꿈)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
