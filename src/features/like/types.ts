export const likeKeys = {
  all: ['like'] as const,
  state: (id: number) => [...likeKeys.all, 'state', id] as const,
}
