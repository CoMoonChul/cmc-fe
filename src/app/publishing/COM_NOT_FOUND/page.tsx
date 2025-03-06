import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-300 px-6">
      <h1 className="text-[96px] font-bold tracking-tight text-gray-800 dark:text-gray-200">
        404
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className="mt-6 px-5 py-3 rounded-md text-sm font-medium transition 
        bg-gray-900 text-white dark:bg-[#2A2A2A] dark:text-gray-200 
        hover:bg-gray-700 dark:hover:bg-[#3A3A3A]"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}

export default NotFoundPage
