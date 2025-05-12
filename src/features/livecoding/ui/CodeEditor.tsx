'use client'
import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { dracula } from '@uiw/codemirror-theme-dracula'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { LIVECODING } from '#/generate'
import { debounce } from 'lodash'
import { updateLiveCodingSnippet } from '@/entities/livecoding/api'
import useWebSocketStore from '@/features/livecoding/store/useWebSocketStore'
import DiffMatchPatch from 'diff-match-patch'
import { python } from '@codemirror/lang-python'
import { replaceDomainWithCurrent } from '@/shared/lib/url'

export default function CodeEditor({
  roomInfo,
  snippet,
}: {
  roomInfo: LIVECODING.SelectLiveCodingResDTO | null
  snippet: LIVECODING.SelectLiveCodingSnippetResDTO | null
}) {
  const isRemoteUpdateRef = useRef(false)
  const editorRef = useRef<ReactCodeMirrorRef>(null)
  const [code, setCode] = useState(snippet?.livecode || "console.log('CMC')")
  const [language, setLanguage] = useState(snippet?.language || 'javascript')
  const [copyButtonText, setCopyButtonText] = useState('복사')
  const [inviteButtonText, setInviteButtonText] = useState('초대링크 복사')
  const [isHovered, setIsHovered] = useState(false)

  // 최신 코드 기준을 저장하는 ref
  const lastSyncedCodeRef = useRef(snippet?.livecode || "console.log('CMC')")
  const [isTooSmall, setIsTooSmall] = useState(false)

  useEffect(() => {
    const checkWidth = () => setIsTooSmall(window.innerWidth < 740)
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  // diff 수신 후 에디터에 적용
  useEffect(() => {
    useWebSocketStore.setState({
      applyDiff: (diff, language) => {
        if (!editorRef.current?.view) return

        const parsedDiff =
          typeof diff === 'string' ? JSON.parse(JSON.parse(diff)) : diff
        const dmp = new DiffMatchPatch()
        const currentText = editorRef.current.view.state.doc.toString()
        const patches = dmp.patch_make(
          currentText,
          parsedDiff.map((d: { op: number; text: string }) => [d.op, d.text]),
        )
        const [newText] = dmp.patch_apply(patches, currentText)

        isRemoteUpdateRef.current = true
        editorRef.current.view.dispatch({
          changes: {
            from: 0,
            to: currentText.length,
            insert: newText,
          },
        })

        setCode(newText)
        setLanguage(language)
        lastSyncedCodeRef.current = newText
      },
    })
  }, [])

  const copyInviteLink = () => {
    if (!roomInfo?.link) return
    const link = replaceDomainWithCurrent(roomInfo.link)
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setInviteButtonText('초대링크 복사됨!')
        setTimeout(() => setInviteButtonText('초대링크 복사'), 2000)
      })
      .catch(() => alert('클립보드 복사에 실패했습니다.'))
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
      isRemoteUpdateRef.current = false
      return
    }
    debouncedUpdate(value)
  }

  const updateCode = useCallback(
    (newCode: string) => {
      if (!roomInfo || !snippet) return
      const dmp = new DiffMatchPatch()
      const diffs = dmp.diff_main(lastSyncedCodeRef.current, newCode)
      dmp.diff_cleanupSemantic(diffs)

      const diff = diffs.map(([op, text]: [number, string]) => ({ op, text }))
      const cursorPos = { line: 0, ch: 0 }
      const isBroadcast = true

      console.log('diff', diff)
      const snippetReq: LIVECODING.UpdateLiveCodingSnippetReqDTO = {
        code: newCode,
        roomId: roomInfo.roomId,
        hostId: roomInfo.hostId,
        diff,
        language,
        cursorPos,
        isBroadcast,
      }

      updateLiveCodingSnippet(snippetReq)

      lastSyncedCodeRef.current = newCode
    },
    [roomInfo, snippet, language],
  )

  const debouncedUpdate = useMemo(() => debounce(updateCode, 500), [updateCode])

  if (isTooSmall) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-gray-800 dark:text-white bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-2">⚠️ 화면이 너무 작습니다</h2>
        <p className="text-base leading-relaxed">
          실시간 코드 공유는 <strong>가로 화면 700px 이상</strong>에서 이용하실
          수 있어요.
          <br />
          PC나 태블릿 등 더 큰 화면으로 접속해 주세요.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4 p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
        <div className="flex space-x-4">
          <button
            onClick={copyInviteLink}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white transition"
          >
            {inviteButtonText}
          </button>
          {/*<button className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-800 hover:bg-red-400 hover:text-white transition">*/}
          {/*  강퇴*/}
          {/*</button>*/}
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
          <button
            onClick={() => setLanguage('python')}
            className={`px-4 py-2 text-sm rounded-lg transition duration-300 ease-in-out transform ${
              language === 'python'
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white'
            }`}
          >
            Python
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
            extensions={[
              language === 'javascript'
                ? javascript()
                : language === 'java'
                  ? java()
                  : python(),
            ]}
            onChange={editCode}
          />
          {isHovered && (
            <button
              onClick={copyCodeToClipboard}
              style={{ top: '12px', right: '12px' }}
              className="absolute px-3 py-1 text-xs font-medium text-gray-800 bg-gray-300 border border-gray-400 rounded-md shadow-sm hover:bg-gray-400 transition"
            >
              {copyButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
