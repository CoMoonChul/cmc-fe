'use client'
import { useGetMyGroupList } from '@/features/group/hooks/useMyGroupList'
import { useDeleteGroupMutation } from '../hooks/useDeleteGroupMutation'
import { usePopupStore } from '@/shared/store/usePopupStore'
import { GROUP } from '#/generate'

type GroupManageAreaProps = {
  setOpenCreateModal: (value: boolean) => void
  setOpenManageModal: (value: boolean) => void
  setGroupId: (value: number | null) => void
}

const GroupManageArea = ({
  setOpenCreateModal,
  setOpenManageModal,
  setGroupId,
}: GroupManageAreaProps) => {
  const { data: groupData } = useGetMyGroupList()
  const { openPopup } = usePopupStore.getState()
  const deleteGroupMutation = useDeleteGroupMutation()

  const deleteGroup = (groupId: number) => {
    const req: GROUP.DeleteReqDTO = {
      groupId: groupId,
    }
    deleteGroupMutation.mutate(req)
  }

  const onClickDeleteGroup = (groupId: number) => {
    openPopup('', '삭제하시겠습니까?', () => deleteGroup(groupId))
  }

  return (
    <div className="w-full mt-10">
      <p className="text-lg font-semibold mb-4">나의 그룹</p>

      {(groupData?.groups.length ?? 0) === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          그룹을 만들어 회의에 초대하거나 게시물을 공유해보세요.
        </p>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700 border rounded-lg">
          {groupData?.groups.map((group) => (
            <div
              key={group.groupId}
              className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition relative"
              onClick={() => {
                setGroupId(group.groupId ?? 0)
                setOpenManageModal(true)
              }}
            >
              <p className="flex-1 font-medium text-gray-900 dark:text-gray-100 truncate">
                {group.groupName}
              </p>
              {group.groupRole === 'MASTER' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onClickDeleteGroup(group.groupId)
                  }}
                  className="text-gray-400 hover:text-red-500 ml-2"
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {(groupData?.groups?.length ?? 0) < 3 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setOpenCreateModal(true)}
            className="px-5 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
          >
            + 그룹 만들기
          </button>
        </div>
      )}
    </div>
  )
}

export default GroupManageArea
