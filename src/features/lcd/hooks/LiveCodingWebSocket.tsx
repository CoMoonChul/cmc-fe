'use client'

import { useEffect, useRef, useState } from 'react'

export function useLiveCodingWebSocket(roomId: string) {
  const [messages, setMessages] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (!roomId) {
      console.warn('⚠️ roomId가 비어 있음. WebSocket을 연결하지 않음.')
      return
    }

    console.log('🔗 WebSocket 연결 시도:', wsUrl)

    const socket = new WebSocket(wsUrl)
    const wsUrl = `ws://localhost:8080/ws/livecoding/ws/${roomId}` // 세그먼트 3개를 갖춘 WebSocket URL

    socket.onopen = () => {
      console.log('✅ WebSocket 연결 성공:', wsUrl)
      setIsConnected(true)
    }

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data])
    }

    socket.onclose = (event) => {
      console.log('❌ WebSocket 연결 종료:', event)
      setIsConnected(false)
    }

    socket.onerror = (error) => {
      console.error('WebSocket 오류 발생:', error)
      setIsConnected(false)
    }

    socketRef.current = socket

    return () => {
      console.log('🔌 WebSocket 연결 해제')
      socket.close()
    }
  }, [roomId])

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message)
    } else {
      console.warn('⚠️ WebSocket이 연결되지 않음. 메시지를 보낼 수 없음.')
    }
  }

  return { messages, sendMessage, isConnected }
}
