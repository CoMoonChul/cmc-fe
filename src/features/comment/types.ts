export const COMMENT_TARGET = {
  REVIEW: 0,
  BATTLE: 1,
}

export const commentKeys = {
  all: ['comment'] as const,
  list: (...conditions: number[]) =>
    [...commentKeys.all, 'list', ...conditions] as const,
}
