export const reviewKeys = {
  all: ['review'] as const,
  list: (...conditions: number[]) =>
    [...reviewKeys.all, 'list', ...conditions] as const,
  detail: (reviewId: number) =>
    [...reviewKeys.all, 'detail', reviewId] as const,
}
