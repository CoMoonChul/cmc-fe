interface Notification {
  create_user: number
  created_at: string
  link_url: string
  noti_content: string
  noti_id: number
  noti_template_id: number
  noti_template_nm: string
  noti_title: string
  noti_type: 'NOTI' | 'JOIN' | 'LINK'
  reason_noti: string
  send_at: string
  send_state: string
  user_num: number
}

const formatDate = (date: string) => {
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
  notification,
  onDelete,
  onAccept,
}: {
  notification: Notification
  onDelete: (id: number) => void
  onAccept: (id: number, link: string) => void
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-2 relative">
      {/* 삭제 버튼 */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition"
        onClick={() => onDelete(notification.noti_id)}
      >
        X
      </button>

      {/* 생성 날짜 */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {formatDate(notification.created_at)}
      </p>

      {/* 알림 제목 */}
      <h3 className="font-semibold">{notification.noti_title}</h3>

      {/* 알림 내용 */}
      {notification.noti_type === 'LINK' ? (
        <a
          href={notification.link_url}
          className="text-blue-500 hover:underline"
        >
          {notification.reason_noti}
        </a>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">
          {notification.reason_noti}
        </p>
      )}

      {/* 버튼 영역 */}
      {notification.noti_type === 'LINK' && (
        <a
          href={notification.link_url}
          className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
        >
          이동
        </a>
      )}
      {notification.noti_type === 'JOIN' && (
        <div className="flex gap-2 mt-2">
          <button
            className="flex-1 px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition"
            onClick={() =>
              onAccept(notification.noti_id, notification.link_url)
            }
          >
            수락
          </button>
          <button
            onClick={() => onDelete(notification.noti_id)}
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
