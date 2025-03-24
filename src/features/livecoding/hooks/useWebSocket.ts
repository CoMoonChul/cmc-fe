import { useState, useEffect, useRef } from 'react'

const WS_BASE_URL = 'ws://localhost:8080/ws/livecoding' // ✅ 백엔드 WebSocket URL

export default function useWebSocket(roomId: string) {
  const [messages, setMessages] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (!roomId) return

    const ws = new WebSocket(`${WS_BASE_URL}/${roomId}`)
    socketRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)
      console.log('✅ WebSocket Connected')
    }

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data])
    }

    ws.onerror = (error) => {
      console.error('❌ WebSocket Error:', error)
    }

    ws.onclose = () => {
      setIsConnected(false)
      console.log('❌ WebSocket Disconnected')
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
