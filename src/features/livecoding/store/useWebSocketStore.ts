import { create } from 'zustand'
import { redirect } from 'next/navigation'
import useUserStore from '@/shared/store/useUserStore'
import { diff } from '@/entities/livecoding/types'

interface WebSocketStore {
  isConnected: boolean
  messages: string[]
  socket: WebSocket | null
  connect: (roomId: string) => void
  sendMessage: (message: string) => void
  disconnect: () => void
  applyDiff: (diff: diff, language: string) => void
}

const CHAT_TYPE = {
  IN_OUT: 0,
  CHAT: 1,
  UPDATE: 2,
} as const

const ACTION_TYPE = {
  JOIN: 0,
  LEAVE: 1,
  DELETE: 2,
} as const

const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  isConnected: false,
  messages: [],
  socket: null,

  connect: (roomId) => {
    if (get().isConnected) return

    const wsBaseUrl =
      process.env.NEXT_PUBLIC_WS_BASE_URL || 'ws://localhost:8080'
    const socket = new WebSocket(`${wsBaseUrl}/ws/livecoding/${roomId}`)

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        const {
          liveCodingChatType,
          action,
          msg,
          usernum,
          username,
          diff,
          language,
        } = data
        const user = useUserStore.getState().user
        // 코드 diff 수신 처리
        if (liveCodingChatType === CHAT_TYPE.UPDATE && diff) {
          if (user.userNum !== usernum) {
            get().applyDiff(diff, language)
          }
          return
        }

        let formattedMessage = ''

        if (liveCodingChatType === CHAT_TYPE.IN_OUT) {
          if (action === ACTION_TYPE.DELETE) {
            alert('호스트와 연결이 끊겼습니다.')
            redirect('/')
            return
          }
          formattedMessage =
            action === ACTION_TYPE.JOIN
              ? `${username} 님이 입장하셨습니다.`
              : `${username} 님이 퇴장하셨습니다.`
        } else if (liveCodingChatType === CHAT_TYPE.CHAT) {
          formattedMessage = `${username}: ${msg}`
        }

        if (formattedMessage) {
          set((state) => ({
            messages: [...state.messages, formattedMessage],
          }))
        }
      } catch (error) {
        console.error('WebSocket 메시지 파싱 오류:', error)
        redirect('/')
      }
    }

    socket.onopen = () => {
      console.log('WebSocket Connected')
      set({ isConnected: true, socket, messages: [] })
    }

    socket.onclose = () => {
      console.log('WebSocket Disconnected')
      set({ isConnected: false, socket: null })
      redirect('/')
    }

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error)
      redirect('/')
    }

    socket.onmessage = handleMessage
  },

  sendMessage: (message: string) => {
    const { socket } = get()
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message)
    } else {
      console.error('WebSocket 연결이 되어 있지 않습니다.')
    }
  },

  disconnect: () => {
    const { socket } = get()
    if (socket) {
      socket.onopen = null
      socket.onclose = null
      socket.onerror = null
      socket.onmessage = null
      socket.close()
      set({ socket: null, isConnected: false })
    }
  },

  applyDiff: (diff) => {
    // TODO: 에디터 상태 반영 로직
  },
}))

export default useWebSocketStore
