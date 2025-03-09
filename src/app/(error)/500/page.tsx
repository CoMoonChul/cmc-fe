import Link from 'next/link'

export default function Error500() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300 p-6">
      <h1 className="text-5xl font-bold text-red-600">500</h1>
      <p className="text-lg font-semibold mt-4">
        서버에서 오류가 발생했습니다.
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        잠시 후 다시 시도해주세요.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition active:opacity-80"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
