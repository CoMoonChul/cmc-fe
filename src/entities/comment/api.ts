import { Configuration } from '#/generate/configuration'
import { COMMENT } from '#/generate'

const api = new COMMENT.CommentControllerApi(
  new Configuration({ basePath: '/api' }),
)

export async function createComment(data: COMMENT.CreateCommentReqDTO) {
  try {
    const response = await api.createComment(data)
    return response
  } catch (error) {
    throw new Error('fail')
  }
}

export async function selectComment(id: number) {
  try {
    const response = await api.selectComment(id)
    return response
  } catch (error) {
    throw new Error('fail')
  }
}
