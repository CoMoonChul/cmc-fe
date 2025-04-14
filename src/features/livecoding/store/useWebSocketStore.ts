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
  applyDiff: (diff: diff) => void
}

const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  isConnected: false,
  messages: [],
  socket: null,

  connect: (roomId) => {
    if (get().isConnected) return

    const socket = new WebSocket(`ws://localhost:8080/ws/livecoding/${roomId}`)

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        const { liveCodingChatType, action, msg, usernum, diff } = data
        const user = useUserStore.getState().user

        // 코드 diff 수신 처리
        if (liveCodingChatType === 2 && diff) {
          if (user.userNum !== usernum) {
            get().applyDiff(diff)
          }
          return
        }

        let formattedMessage = ''

        if (liveCodingChatType === 0) {
          if (action === 2) {
            alert('호스트와 연결이 끊겼습니다.')
            redirect('/')
            return
          }
          formattedMessage =
            action === 0
              ? `${usernum} 님이 입장하셨습니다.`
              : `${usernum} 님이 퇴장하셨습니다.`
        } else if (liveCodingChatType === 1) {
          formattedMessage = `${usernum}: ${msg}`
        }

        if (formattedMessage) {
          set((state) => ({
            messages: [...state.messages, formattedMessage],
          }))
        }
      } catch (error) {
        console.error('❌ WebSocket 메시지 파싱 오류:', error)
        redirect('/')
      }
    }

    socket.onopen = () => {
      console.log('✅ WebSocket Connected')
      set({ isConnected: true, socket, messages: [] })
    }

    socket.onclose = () => {
      console.log('❌ WebSocket Disconnected')
      set({ isConnected: false, socket: null })
    }

    socket.onerror = (error) => {
      console.error('❌ WebSocket Error:', error)
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
    console.log('🧩 받은 diff:', diff)
    // TODO: 에디터 상태 반영 로직
  },
}))

export default useWebSocketStore
