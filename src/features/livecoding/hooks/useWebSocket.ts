import { useState, useEffect, useRef } from 'react'
import { redirect } from 'next/navigation'

const WS_BASE_URL = 'ws://localhost:8080/ws/livecoding'

export default function useWebSocket(roomId: string | undefined) {
  const [messages, setMessages] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (!roomId) {
      return
    }

    const ws = new WebSocket(`${WS_BASE_URL}/${roomId}`)
    socketRef.current = ws

    ws.onopen = () => {
      console.log('✅ WebSocket Connected')
      setIsConnected(true)
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        const { liveCodingChatType, action, msg, usernum } = data

        let formattedMessage = ''

        if (liveCodingChatType === 2) {
          console.log('코드 업데이트 ! ')
          return
        }

        if (liveCodingChatType === 0) {
          // 입퇴장 메시지

          if (action === 2) {
            alert('호스트와 연결이 끊겼습니다.')
            redirect('/')
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
          setMessages((prev) => [...prev, formattedMessage])
        }
      } catch (error) {
        console.error('❌ WebSocket Message Parsing Error:', error)
        redirect('/')
      }
    }

    ws.onerror = (error) => {
      console.error('❌ WebSocket Error:', error)
      redirect('/')
    }

    ws.onclose = () => {
      console.log('❌ WebSocket Disconnected')
      setIsConnected(false)
    }

    return () => {
      ws.close()
    }
  }, [roomId])

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message)
    } else {
      console.error('⚠️ WebSocket is not connected.')
    }
  }

  return { messages, sendMessage, isConnected }
}
