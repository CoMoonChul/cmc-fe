import { create } from 'zustand'
import { redirect } from 'next/navigation'

interface WebSocketStore {
  isConnected: boolean
  messages: string[]
  socket: WebSocket | null
  connect: (roomId: string) => void
  sendMessage: (message: string) => void
  disconnect: () => void
}

const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  isConnected: false,
  messages: [],
  socket: null,
  connect: (roomId) => {
    const socket = new WebSocket(`ws://localhost:8080/ws/livecoding/${roomId}`)

    socket.onopen = () => {
      console.log('✅ WebSocket Connected')
      set({ isConnected: true, socket, messages: [] }) // ✅ 메시지 초기화
    }

    socket.onclose = () => {
      console.log('❌ WebSocket Disconnected')
      set({ isConnected: false, socket: null })
    }

    socket.onerror = (error) => {
      console.error('❌ WebSocket Error:', error)
      redirect('/')
    }

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        const { liveCodingChatType, action, msg, usernum } = data

        let formattedMessage = ''

        // 코드 업데이트 메시지 (무시)
        if (liveCodingChatType === 2) {
          console.log('코드 업데이트 !')
          return
        }

        if (liveCodingChatType === 0) {
          // 호스트 연결 종료 처리
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
          // 채팅 메시지
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
  },

  sendMessage: (message: string) => {
    const { socket } = get()
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message)
    } else {
      console.error('⚠️ WebSocket 연결이 되어 있지 않습니다.')
    }
  },

  disconnect: () => {
    const { socket } = get()
    if (socket) {
      socket.close()
      set({ socket: null, isConnected: false })
    }
  },
}))


export default useWebSocketStore
