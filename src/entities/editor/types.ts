import { User } from '../user/types'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { python } from '@codemirror/lang-python'

// Editor table
export interface Editor {
  codeEditNum?: number
  content?: number
  language?: string
  user?: User
  createdAt?: string
  updatedAt?: string
}

type LanguageExtension = typeof javascript | typeof java | typeof python

// code mirror language types
export const languageExtensions: Record<
  string,
  ReturnType<LanguageExtension>
> = {
  javascript: javascript(),
  java: java(),
  python: python(),
}
