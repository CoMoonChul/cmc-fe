const formatDate = (date?: string) => {
  if (!date) return '날짜 없음' // 기본값 처리
  console.log('dddd : ', date)

  const date2 = new Date(date.replace(' ', 'T'))
  const now = new Date()
  const diffMs = now.getTime() - date2.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 24) return `${diffHours}시간 전`
  return date2.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const NoticeCard = ({
  notiId,
  userNum,
  notiTemplateId,
  sendAt,
  sendState,
  linkUrl,
  createdAt,
  reasonNoti,
  notiTitle,
  notiType,
  onDelete,
  onAccept,
}: {
  notiId: number
  userNum: number
  notiTemplateId: number
  sendAt?: string
  sendState?: string
  linkUrl?: string
  createdAt: string
  reasonNoti: string
  notiTitle: string
  notiType: string
  onDelete: (id: number | undefined) => void
  onAccept: (id: number | undefined, link: string | undefined) => void
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-2 relative">
      {/* 삭제 버튼 */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition"
        onClick={() => onDelete(notiId)}
      >
        X
      </button>

      {/* 생성 날짜 */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {formatDate(createdAt)}
      </p>

      {/* 알림 제목 */}
      <h3 className="font-semibold">{notiTitle}</h3>

      {/* 알림 내용 */}
      {notiType === 'LINK' ? (
        <a
          // href={link_url}
          onClick={(e) => {
            e.preventDefault()
            onAccept(notiId, linkUrl ?? '')
          }}
          className="text-blue-500 hover:underline"
        >
          {reasonNoti}
        </a>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">{reasonNoti}</p>
      )}

      {/* 버튼 영역 */}
      {notiType === 'LINK' && (
        <a
          // href={link_url}
          onClick={(e) => {
            e.preventDefault()
            onAccept(notiId, linkUrl ?? '')
          }}
          className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
        >
          이동
        </a>
      )}
      {notiType === 'JOIN' && (
        <div className="flex gap-2 mt-2">
          <button
            className="flex-1 px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition"
            onClick={() => onAccept(notiId, linkUrl ?? '')}
          >
            수락
          </button>
          <button
            onClick={() => onDelete(notiId)}
            className="flex-1 px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
          >
            거절
          </button>
        </div>
      )}
    </div>
  )
}

export default NoticeCard
