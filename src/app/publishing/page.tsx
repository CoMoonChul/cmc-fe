import Link from 'next/link'

const Publishing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-300 p-6">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
        퍼블리싱 목록
      </h1>
      <div className="w-full max-w-lg bg-white dark:bg-[#2A2A2A] shadow-md rounded-xl p-6">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          공통
        </h2>
        <ul className="space-y-3  mb-4">
          <PubbleItem link="/COM/NOT_FOUND" />
          <PubbleItem link="/COM/LOADING" />
          <PubbleItem link="/COM/ERROR_500" />
        </ul>
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          리뷰
        </h2>
        <ul className="space-y-3 mb-4">
          <PubbleItem link="/REVIEW/LIST" />
          <PubbleItem link="/REVIEW/DETAIL" />
          <PubbleItem link="/REVIEW/FORM" />
        </ul>
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          배틀
        </h2>
        <ul className="space-y-3  mb-4">
          <PubbleItem link="/BATTLE/LIST" />
          <PubbleItem link="/BATTLE/DETAIL" />
          <PubbleItem link="/BATTLE/RESULT" />
          <PubbleItem link="/BATTLE/DETAIL" />
          <PubbleItem link="/BATTLE/CREATE" />
        </ul>
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          회원
        </h2>
        <ul className="space-y-3  mb-4">
          <PubbleItem link="/USER/SIGNUP" />
          <PubbleItem link="/USER/LOGIN" />
          <PubbleItem link="/USER/ACCOUNT_RECOVER" />
          <PubbleItem link="/USER/PROFILE" />
        </ul>
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          알림
        </h2>
        <ul className="space-y-3  mb-4">
          <PubbleItem link="/NOTI/LIST" />
        </ul>
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          실시간공유
        </h2>
        <ul className="space-y-3  mb-4">
          <PubbleItem link="/LIVECODING/LIVE" />
        </ul>
      </div>
    </div>
  )
}

const PubbleItem = ({ link }: { link: string }) => {
  return (
    <li>
      <Link
        href={'/publishing' + link}
        className="block px-5 py-3 rounded-lg transition text-center 
        bg-gray-200 text-gray-900 hover:bg-gray-300 
        dark:bg-[#3A3A3A] dark:text-gray-100 dark:hover:bg-[#444444]"
      >
        {link}
      </Link>
    </li>
  )
}

export default Publishing
