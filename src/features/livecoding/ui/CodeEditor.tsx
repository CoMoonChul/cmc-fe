import { useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";

export default function CodeEditor() {
  const [code, setCode] = useState("console.log('CMC')");
  const [language, setLanguage] = useState("javascript");
  const [copyButtonText, setCopyButtonText] = useState("복사");
  const [isHovered, setIsHovered] = useState(false);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyButtonText("복사됨!");
      setTimeout(() => setCopyButtonText("복사"), 1000);
    });
  };

  return (
    <div className="flex flex-col">
      {/* 헤더 영역 */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">코드 편집기</h2>
        <div className="space-x-2">
          <button
            onClick={() => setLanguage("javascript")}
            className={`px-3 py-1 text-xs rounded-lg transition ${
              language === "javascript"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-900 hover:bg-gray-400"
            }`}
          >
            JavaScript
          </button>
          <button
            onClick={() => setLanguage("java")}
            className={`px-3 py-1 text-xs rounded-lg transition ${
              language === "java"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-900 hover:bg-gray-400"
            }`}
          >
            Java
          </button>
        </div>
      </div>

      {/* 코드 에디터 영역 */}
      <div
        className="relative flex-grow border rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* CodeMirror를 감싸는 컨테이너(여기서 버튼의 absolute 위치 기준이 됨) */}
        <div className="relative">
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
