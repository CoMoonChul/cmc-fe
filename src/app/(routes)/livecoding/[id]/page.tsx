"use client";

import CodeEditor from '@/features/livecoding/ui/CodeEditor'
import Chat from '@/features/livecoding/ui/Chat'

export default function LiveCodingPage() {
  const copyInviteLink = () => {
    navigator.clipboard.writeText("초대 링크").then(() => alert("초대 링크가 복사되었습니다!"));
  };

  return (
    <div className="flex h-screen">
      <div className="w-4/5 p-4">
        <CodeEditor />
      </div>
      <Chat copyInviteLink={() => navigator.clipboard.writeText("초대 링크")} />
    </div>
  );
}
