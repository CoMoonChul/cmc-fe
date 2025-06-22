export const battleKeys = {
  all: ['battle'] as const,
  list: (...conditions: number[]) =>
    [...battleKeys.all, 'list', ...conditions] as const,
  detail: (battleId: number) =>
    [...battleKeys.all, 'detail', battleId] as const,
  voteState: (battleId: number) =>
    [...battleKeys.all, 'voteState', battleId] as const,
}
