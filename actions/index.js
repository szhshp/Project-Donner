export const search_select_category = categoryObj => ({
  type: 'SEARCH_SELECT_CATEGORY',
  categoryObj,
});

export const search_reset_category = () => ({
  type: 'SEARCH_RESET_CATEGORY',
});

export const search_select_score = scoreObj => ({
  type: 'SEARCH_SELECT_SCORE',
  scoreObj,
});
