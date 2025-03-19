import { useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";

export default function CodeEditor() {
    const [code, setCode] = useState("console.log('CMC')");
    const [language, setLanguage] = useState("javascript");
    const [copyButtonText, setCopyButtonText] = useState("복사");

    const copyCodeToClipboard = () => {
      navigator.clipboard.writeText(code).then(() => {
        setCopyButtonText("복사됨!");
        setTimeout(() => setCopyButtonText("복사"), 1000);
      });
    };

    return (
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">코드 편집기</h2>
          <div className="space-x-2">
            <button
              onClick={copyCodeToClipboard}
              className="px-3 py-1 text-xs bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              {copyButtonText}
            </button>
            <button
              onClick={() => setLanguage("javascript")}
              className={`px-3 py-1 text-xs rounded-lg transition ${
                language === "javascript" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-900 hover:bg-gray-400"
              }`}
            >
              JavaScript
            </button>
            <button
              onClick={() => setLanguage("java")}
              className={`px-3 py-1 text-xs rounded-lg transition ${
                language === "java" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-900 hover:bg-gray-400"
              }`}
            >
              Java
            </button>
          </div>
        </div>

        {/* 코드 에디터 */}
        <div className="flex-grow border rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4">
          <CodeMirror
            value={code}
            height="500px"
            theme={dracula}
            extensions={[language === "javascript" ? javascript() : java()]}
            onChange={(value) => setCode(value)}
          />
        </div>
      </div>
    );
  }
