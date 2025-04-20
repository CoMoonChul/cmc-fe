const IconNotification = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`w-5 h-5 ${className ?? ''}`}
      fill="currentColor"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <title></title>{' '}
        <g data-name="Layer 2" id="Layer_2">
          {' '}
          <path d="M16,8a3,3,0,1,1,3-3A3,3,0,0,1,16,8Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,16,4Z"></path>{' '}
          <path d="M16,30a5,5,0,0,1-4.84-3.75,1,1,0,0,1,1-1.25h7.74a1,1,0,0,1,1,1.25A5,5,0,0,1,16,30Zm-2.24-3a3,3,0,0,0,4.48,0Z"></path>{' '}
          <path d="M28,27H4a1,1,0,0,1-1-1V24.2a3,3,0,0,1,2.77-3V14a8,8,0,0,1,8-8h4.46a8,8,0,0,1,8,8v7.21a3,3,0,0,1,2.77,3V26A1,1,0,0,1,28,27ZM5,25H27v-.8a1,1,0,0,0-1-1h-.77a1,1,0,0,1-1-1V14a6,6,0,0,0-6-6H13.77a6,6,0,0,0-6,6v8.2a1,1,0,0,1-1,1H6a1,1,0,0,0-1,1Z"></path>{' '}
        </g>{' '}
      </g>
    </svg>
  )
}

export default IconNotification
