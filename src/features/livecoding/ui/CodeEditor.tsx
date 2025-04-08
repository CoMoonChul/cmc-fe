'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { dracula } from '@uiw/codemirror-theme-dracula'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { LIVECODING } from '#/generate'
import { debounce } from 'lodash'
import { updateLiveCodingSnippet } from '@/entities/livecoding/api'
import useWebSocketStore from '@/features/livecoding/store/useWebSocketStore'
const DiffMatchPatch = require('diff-match-patch')

export default function CodeEditor({
                                     roomInfo,
                                     snippet,
                                   }: {
  roomInfo: LIVECODING.SelectLiveCodingResDTO | null
  snippet: LIVECODING.SelectLiveCodingSnippetResDTO | null
}) {
  const isRemoteUpdateRef = useRef(false)
  const editorRef = useRef<ReactCodeMirrorRef>(null)
  const [code, setCode] = useState<string>(
    snippet?.livecode || "console.log('CMC')",
  )
  const [language, setLanguage] = useState<string>(
    snippet?.language || 'javascript',
  )
  const [copyButtonText, setCopyButtonText] = useState('복사')
  const [inviteButtonText, setInviteButtonText] = useState('초대링크 복사')
  const [isHovered, setIsHovered] = useState(false)

  const { applyDiff: storeApplyDiff } = useWebSocketStore()

  // 🔁 WebSocket에서 diff 수신 시 에디터에 적용하는 함수
  useEffect(() => {
    useWebSocketStore.setState({
      applyDiff: (diff) => {
        if (!editorRef.current?.view) return;

        const parsedDiff = typeof diff === 'string' ? JSON.parse(JSON.parse(diff)) : diff;
        const dmp = new DiffMatchPatch();
        const currentText = editorRef.current.view.state.doc.toString();
        const patches = dmp.patch_make(currentText, parsedDiff.map((d: { op: any; text: any }) => [d.op, d.text]));
        const [newText] = dmp.patch_apply(patches, currentText);

        isRemoteUpdateRef.current = true; // ✨ remote update 시작
        editorRef.current.view.dispatch({
          changes: {
            from: 0,
            to: currentText.length,
            insert: newText,
          },
        });
        setCode(newText);
        console.log('✅ diff 적용 완료');
      },
    });

  }, [])



  const copyInviteLink = () => {
    if (!roomInfo?.link) return
    navigator.clipboard
      .writeText(roomInfo.link)
      .then(() => {
        setInviteButtonText('초대링크 복사됨!')
        setTimeout(() => setInviteButtonText('초대링크 복사'), 2000)
      })
      .catch(() => alert('❌ 초대 링크 복사에 실패했습니다.'))
  }

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyButtonText('복사됨!')
      setTimeout(() => setCopyButtonText('복사'), 1000)
    })
  }

  const editCode = (value: string) => {
    setCode(value)
    if (isRemoteUpdateRef.current) {
      // ✋ 서버에서 온 diff 적용 중이면 skip
      isRemoteUpdateRef.current = false;
      return;
    }
    debouncedUpdate(value)
  }

  const debouncedUpdate = useCallback(
    debounce((newCode: string) => {
      if (!roomInfo || !snippet) return
      const dmp = new DiffMatchPatch()
      const diffs = dmp.diff_main(snippet.livecode || '', newCode)
      dmp.diff_cleanupSemantic(diffs)

      const diff = diffs.map(([op, text]: [number, string]) => ({ op, text }))
      const cursorPos = { line: 0, ch: 0 } // TODO: 실제 커서 위치 계산 가능하면 대체

      updateLiveCodingSnippet(
        roomInfo.roomId,
        roomInfo.hostId,
        diff,
        language,
        cursorPos,
      )
        .then((res) => console.log('✅ 코드 업데이트 성공', res))
        .catch((err) => console.error('❌ 코드 업데이트 실패:', err))
    }, 500),
    [roomInfo, language, snippet],
  )

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4 p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
        <div className="flex space-x-4">
          <button
            onClick={copyInviteLink}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out"
          >
            {inviteButtonText}
          </button>
          <button
            onClick={() => {
              /* 강퇴 동작 */
            }}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-800 hover:bg-red-400 hover:text-white transition duration-300 ease-in-out"
          >
            강퇴
          </button>
        </div>
        <h2 className="text-xl font-semibold text-white">언어 선택</h2>
        <div className="space-x-4">
          <button
            onClick={() => setLanguage('javascript')}
            className={`px-4 py-2 text-sm rounded-lg transition duration-300 ease-in-out transform ${
              language === 'javascript'
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white'
            }`}
          >
            JavaScript
          </button>
          <button
            onClick={() => setLanguage('java')}
            className={`px-4 py-2 text-sm rounded-lg transition duration-300 ease-in-out transform ${
              language === 'java'
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white'
            }`}
          >
            Java
          </button>
        </div>
      </div>

      <div className="relative flex-grow border rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CodeMirror
            ref={editorRef}
            value={code}
            height="500px"
            theme={dracula}
            extensions={[language === 'javascript' ? javascript() : java()]}
            onChange={(value) => editCode(value)}
          />
          {isHovered && (
            <button
              onClick={copyCodeToClipboard}
              style={{ top: '12px', right: '12px' }}
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
  )
}
