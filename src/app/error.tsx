'use client'

import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300 p-6">
      <h1 className="text-5xl font-bold text-red-600">500</h1>
      <p className="text-lg font-semibold mt-4">오류가 발생했습니다.</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {error.message}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition active:opacity-80"
      >
        다시 시도
      </button>
      <Link
        href="/"
        className="mt-2 px-6 py-3 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition active:opacity-80"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
