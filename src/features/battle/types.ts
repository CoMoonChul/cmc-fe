export const QUERY_KEYS = {
  BATTLE: {
    DETAIL: 'battle.detail',
    LIST: 'battle.list',
    VOTE_STATE: 'battle.voteState',
  } as const,
}

export const battleKeys = {
  all: ['battle'] as const,
  list: () => [...battleKeys.all, 'list'] as const,
  detail: (battleId: number) =>
    [...battleKeys.all, 'detail', battleId] as const,
  voteState: (battleId: number) =>
    [...battleKeys.all, 'voteState', battleId] as const,
}
