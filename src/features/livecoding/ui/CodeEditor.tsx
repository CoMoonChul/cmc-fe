import { useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import { LIVECODING } from '#/generate'

// CodeEditor 컴포넌트
export default function CodeEditor({ roomInfo }: { roomInfo: LIVECODING.SelectLiveCodingResDTO | null }) {
  const [code, setCode] = useState("console.log('CMC')");
  const [language, setLanguage] = useState("javascript");
  const [copyButtonText, setCopyButtonText] = useState("복사");
  const [inviteButtonText, setInviteButtonText] = useState("초대링크 복사");
  const [isHovered, setIsHovered] = useState(false);

  const copyInviteLink = () => {
    if (!roomInfo?.link) {
      return;
    }
    navigator.clipboard
      .writeText(roomInfo.link)
      .then(() => {
        setInviteButtonText("초대링크 복사됨!");
        setTimeout(() => setInviteButtonText("초대링크 복사"), 2000);
      })
      .catch(() => alert("❌ 초대 링크 복사에 실패했습니다."));
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyButtonText("복사됨!");
      setTimeout(() => setCopyButtonText("복사"), 1000);
    });
  };

  return (
    <div className="flex flex-col">
      {/* 방정보 영역 */}
      <div className="flex items-center justify-between mb-4 p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
        <div className="flex space-x-4">
          <button
            onClick={copyInviteLink}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out"
          >
            {inviteButtonText}
          </button>
          <button
            onClick={() => {/* 강퇴 동작 */}}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-800 hover:bg-red-400 hover:text-white transition duration-300 ease-in-out"
          >
            강퇴
          </button>
        </div>
        <h2 className="text-xl font-semibold text-white">언어 선택</h2>
        <div className="space-x-4">
          <button
            onClick={() => setLanguage("javascript")}
            className={`px-4 py-2 text-sm rounded-lg transition duration-300 ease-in-out transform ${
              language === "javascript"
                ? "bg-blue-600 text-white scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"
            }`}
          >
            JavaScript
          </button>
          <button
            onClick={() => setLanguage("java")}
            className={`px-4 py-2 text-sm rounded-lg transition duration-300 ease-in-out transform ${
              language === "java"
                ? "bg-blue-600 text-white scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"
            }`}
          >
            Java
          </button>
        </div>
      </div>

      {/* 코드 에디터 영역 */}
      <div className="relative flex-grow border rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}  // 마우스 오버 시 상태 변경
          onMouseLeave={() => setIsHovered(false)} // 마우스 떠나면 상태 변경
        >
          <CodeMirror
            value={code}
            height="500px"
            theme={dracula}
            extensions={[language === "javascript" ? javascript() : java()]}
            onChange={(value) => setCode(value)}
          />
          {isHovered && (
            <button
              onClick={copyCodeToClipboard}
              style={{ top: "12px", right: "12px" }}
              className="absolute px-3 py-1 text-xs font-medium text-gray-800
                     bg-gray-300 border border-gray-400 rounded-md shadow-sm
                     hover:bg-gray-400 transition"
            >
              {copyButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
