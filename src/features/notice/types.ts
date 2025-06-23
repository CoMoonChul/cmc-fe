export const noticeKeys = {
  all: ['notice'] as const,
  list: (...conditions: number[]) =>
    [...noticeKeys.all, 'list', ...conditions] as const,
}
