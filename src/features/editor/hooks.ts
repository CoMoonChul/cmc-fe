import { EDITOR } from '#/generate'
import { useQuery } from '@tanstack/react-query'
import { selectEditor } from '@/entities/editor/api'
export const useEditor = (id: number) => {
  return useQuery<EDITOR.SelectEditorResDTO>({
    queryKey: ['editor', id],
    queryFn: () => selectEditor(id),
  })
}
