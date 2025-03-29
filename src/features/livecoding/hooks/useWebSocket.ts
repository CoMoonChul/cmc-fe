import { useState, useEffect, useRef } from 'react'

const WS_BASE_URL = 'ws://localhost:8080/ws/livecoding'

export default function useWebSocket(roomId: string, isConnected: boolean) {
  const [messages, setMessages] = useState<string[]>([])
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (!roomId || !isConnected) {
      return
    }

    const ws = new WebSocket(`${WS_BASE_URL}/${roomId}`)
    socketRef.current = ws

    ws.onopen = () => {
      console.log('✅ WebSocket Connected')
    }

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data])
    }

    ws.onerror = (error) => {
      console.error('❌ WebSocket Error:', error)
    }

    ws.onclose = () => {
      console.log('❌ WebSocket Disconnected')
    }

    return () => {
      ws.close()
    }
  }, [roomId, isConnected])

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message)
    } else {
      console.error('⚠️ WebSocket is not connected.')
    }
  }

  return { messages, sendMessage }
}
