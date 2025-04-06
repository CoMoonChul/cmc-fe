import { create } from 'zustand'

interface WebSocketStore {
  isConnected: boolean
  messages: string[]
  socket: WebSocket | null
  connect: (roomId: string) => void
  sendMessage: (message: string) => void
  disconnect: () => void
}

const useWebSocketStore = create<WebSocketStore>((set) => ({
  isConnected: false,
  messages: [],
  socket: null,
  connect: (roomId) => {
    const socket = new WebSocket(`ws://localhost:8080/ws/livecoding/${roomId}`)

    socket.onopen = () => set({ isConnected: true, socket })
    socket.onclose = () => set({ isConnected: false, socket: null })
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        const { liveCodingChatType, action, msg, usernum } = data

        let formattedMessage = ''

        if (liveCodingChatType === 0) {
          // 입퇴장 메시지 처리
          formattedMessage =
            action === 0
              ? `${usernum} 님이 입장하셨습니다.`
              : `${usernum} 님이 퇴장하셨습니다.`
        } else if (liveCodingChatType === 1) {
          // 채팅 메시지 처리
          formattedMessage = `${usernum}: ${msg}`
        }

        if (formattedMessage) {
          set((state) => ({ messages: [...state.messages, formattedMessage] }))
        }
      } catch (error) {
        console.error('WebSocket 메시지 처리 오류:', error)
      }
    }
  },
  sendMessage: (message: string) => {
    set((state) => {
      const socket = state.socket
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message)
      } else {
        console.error('WebSocket 연결이 되어 있지 않습니다.')
      }
      return state // 여기서 상태를 그대로 반환
    })
  },
  disconnect: () => {
    set((state) => {
      const socket = state.socket
      if (socket) {
        socket.close()
        return { socket: null } // 상태 객체 반환
      }
      return {} // 상태가 변경되지 않으면 빈 객체 반환
    })
  },
}))

export default useWebSocketStore
