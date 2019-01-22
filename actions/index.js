const Encoding = require('encoding-japanese');
const Cheerio = require('cheerio');

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
  dispatch({
    type: 'VIEW_LOAD_SCORE_STARTED',
  });
  return fetch(selectedWikiLink)
    .then(res => res.text())
    .then(res => {
      let $ = Cheerio.load(res);
      return $('img[title$=".png"]').attr('src');
    })
    .then(res => {
      dispatch({
        type: 'VIEW_LOAD_SCORE_FINISHED',
      });
    })
    .catch(err => {
      dispatch({
        type: 'VIEW_LOAD_SCORE_FAILED',
      });
    });
};

/**
 * [action creator - search score screen, toggle searchbar]
 */
export const search_toggle_searchBar = () => ({
  type: 'SEARCH_TOGGLE_SEARCHBAR',
});

/**
 * [action creator - search score screen, search bar keyword change handler]
 * @param  {[string]} keyword: the keyword
 */
export const search_searchBar_onChange = keyword => ({
  type: 'SEARCH_SEARCHBAR_ONCHANGE',
  keyword,
});
