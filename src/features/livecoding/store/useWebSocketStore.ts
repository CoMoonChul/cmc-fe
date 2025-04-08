import { create } from 'zustand'
import { redirect } from 'next/navigation'
import useUserStore from '@/shared/store/useUserStore'

interface WebSocketStore {
  isConnected: boolean
  messages: string[]
  socket: WebSocket | null
  connect: (roomId: string) => void
  sendMessage: (message: string) => void
  disconnect: () => void
  applyDiff: (diff: any) => void // diff 적용 함수 추가
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
        const { liveCodingChatType, action, msg, usernum, diff } = data
        const user = useUserStore.getState().user
        // 코드 업데이트 메시지 (liveCodingChatType === 2)
        if (liveCodingChatType === 2 && diff) {
          console.log('############');
          console.log('보낸사람');
          console.log(usernum);
          console.log('현재로그인' );
          console.log(user.userNum);
          console.log(user.userNum===usernum);
          console.log('############');
          get().applyDiff(diff)

          console.log('코드 업데이트!')
          console.log(data)
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

  // diff를 적용하는 함수 추가
  applyDiff: (diff) => {
    const { socket } = get()
    // 여기에 diff를 CodeMirror에 적용하는 로직을 추가하세요.
    console.log('받은 diff:', diff)
    // diff를 바탕으로 CodeMirror 내용 업데이트
  },
}))

export default useWebSocketStore
