export const aiKeys = {
  all: ['ai'] as const,
  detail: (id: number) => [...aiKeys.all, 'detail', id] as const,
}
