const Encoding = require('encoding-japanese');

/**
 * [action creator - search score screen, selected a category]
 * @param  {[object]} categoryObj [the selected category object]
 */
export const search_select_category = categoryObj => ({
  type: 'SEARCH_SELECT_CATEGORY',
  categoryObj,
});

/**
 * [action creator - search score screen, reset category select]
 */
export const search_reset_category = () => ({
  type: 'SEARCH_RESET_CATEGORY',
});

/**
 * [action creator - search score screen, selected a score]
 * @param  {[object]} scoreObj [the selected score object]
 */
export const search_select_score = scoreObj => ({
  type: 'SEARCH_SELECT_SCORE',
  scoreObj,
});

/**
 * [action creator - view score screen, request for score picture]
 * @param  {[object]} scoreObj
 * @param  {[object]} levelObj
 * @return  {[func]}
 */
export const view_load_score = (scoreObj, levelObj) => {
  let scorePath = `難易度表/${levelObj.title}/${scoreObj.title}`;
  let encodedScorePath = Encoding.convert(Encoding.stringToCode(scorePath), {
    to: 'EUCJP',
    from: 'UNICODE',
  });
  let selectedWikiLink =
    'https://www.wikihouse.com/taiko/index.php?' +
    Encoding.urlEncode(encodedScorePath);

  return load_score(selectedWikiLink);
};

/**
 * [action creator - view score screen, loading score]
 * @param  {[string]} selectedWikiLink: wiki link
 * @return  {[thunk]} load score function, will do fetch in it
 */
export const load_score = selectedWikiLink => (dispatch, getState) => {
  dispatch(view_load_score_started);
  return view_load_score_loading(selectedWikiLink);
};

export const view_load_score_started = () => ({
  type: 'VIEW_LOAD_SCORE_STARTED',
});

export const view_load_score_loading = (scoreObj, levelObj) => ({
  type: 'VIEW_LOAD_SCORE_LOADING',
  scoreObj,
  levelObj,
});
