export const groupKeys = {
  all: ['group'] as const,
  list: (...conditions: number[]) =>
    [...groupKeys.all, 'list', ...conditions] as const,
  detail: (groupId: number) => [...groupKeys.all, 'detail', groupId] as const,
}
