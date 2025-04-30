import React, { RefObject } from 'react'

export interface CodeEditorProps {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
  language: 'javascript' | 'java'
  setLanguage: React.Dispatch<React.SetStateAction<'javascript' | 'java'>>
  copyCodeToClipboard: () => void
  copyButtonText: string
}

export interface ChatProps {
  messages: string[]
  input: string
  setInput: (value: string) => void
  sendMessage: (message: string) => void
  inputRef: RefObject<HTMLInputElement | null>
  chatBoxRef: RefObject<HTMLDivElement | null>
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  copyInviteLink: () => void
}

export interface inviteCodeFn {
  copyInviteLink: () => void
}
