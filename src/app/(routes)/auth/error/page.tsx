import Link from 'next/link'

type SearchParams = Promise<{ [key: string]: string | undefined }>

const AuthErrorPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams
  const error = searchParams.error

  const getErrorMessage = () => {
    if (error === 'AccessDenied') {
      return '아직 코문철 회원이 아니거나 로그인 중 문제가 발생했어요.\n회원가입 후 다시 시도해 주세요.'
    }
    return '알 수 없는 오류가 발생했어요.\n잠시 후 다시 시도해 주세요.'
  }

  return (
    <div className="flex h-screen justify-center items-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          로그인 실패
        </h1>
        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line mb-6">
          {getErrorMessage()}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/user/login"
            className="w-full block text-center p-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition active:opacity-80"
          >
            다시 로그인하러 가기
          </Link>
          <Link
            href="/user/join"
            className="w-full block text-center p-3 rounded-md border border-blue-600 text-blue-600 font-medium transition hover:bg-blue-50 dark:hover:bg-gray-800 active:opacity-80"
          >
            회원가입 하러 가기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthErrorPage
