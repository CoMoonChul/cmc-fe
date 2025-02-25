import React from 'react'
import { Button } from '@/shared/components/ui/Button' // ✅ Button.tsx 임포트

export default function BattlePage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Battle Page</h1>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Battle Page</h1>
      {/* ✅ Primary 버튼 */}
      <Button label="Primary Button" variant="primary" />
    </div>
  )
}
