import { FileSystem, WebBrowser } from 'expo';

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
 * [action creator - view score screen, loading score]
 * @param  {[string]} selectedWikiLink: wiki link
 * @return  {[thunk]} fetch to load score link
 */
export const load_score = (selectedWikiLink, selectedLevel) => (
  dispatch,
  getState
) => {
  dispatch({
    type: 'VIEW_LOAD_SCORE_STARTED',
    selectedWikiLink,
    selectedLevel,
  });
  return fetch(selectedWikiLink)
    .then(res => res.text())
    .then(res => {
      let $ = Cheerio.load(res);
      return $('img[title$=".png"]').attr('src');
    })
    .then(selectedScoreLink => {
      dispatch({
        type: 'VIEW_LOAD_SCORE_FINISHED',
        selectedScoreLink,
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

/**
 * [action creator - view score screen, request for score picture]
 * @param  {[object]} scoreObj
 * @param  {[object]} levelObj
 * @return  {[func]} load score func
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

  return load_score(selectedWikiLink, levelObj);
};

/**
 * [action creator - view score screen, reset/hide the modal]
 * @return  {[func]}
 */
export const view_reset_scoreModal = () => ({
  type: 'VIEW_RESET_SCOREMODAL',
});

/**
 * [action creator - setting screen, change auto save config]
 * @param  {[boolean]} autoSave: auto save on/off
 */
export const setting_toggleAutoSave = autoSave => (dispatch, getState) => {
  dispatch({
    type: 'SETTING_CHANGE_AUTOSAVE',
    autoSave,
  });
  return dispatch(setting_write());
};

/**
 * [action creator - global, write setting obj in state to file]
 * @return  {[thunk]} TODO
 */
export const setting_write = () => (dispatch, getState) => {
  console.log('setting.write', getState().app.settings);
  FileSystem.writeAsStringAsync(
    `${FileSystem.documentDirectory}setting.json`,
    JSON.stringify(getState().app.settings)
  );
};

/**
 * [action creator - global, read setting file to state]
 * @return  {[thunk]} file IO to read config file
 */
export const setting_read = () => (dispatch, getState) => {
  /*dispatch({
    type: 'SETTING_READ_STARTED',
  });*/

  return FileSystem.getInfoAsync(`${FileSystem.documentDirectory}setting.json`)
    .then(res => {
      console.log('Setting.read.fileStatus', res);
      if (res.exists) {
        /* if exists then read and push to state */
        FileSystem.readAsStringAsync(
          `${FileSystem.documentDirectory}setting.json`
        )
          .then(res => JSON.parse(res))
          .then(res => {
            dispatch({
              type: 'SETTING_READ_FINISHED',
              settings: res,
            });
            console.log('Setting.read.Finished', res);
          });
      } else {
        /* if not exists then create new one and push default value to state */
        FileSystem.writeAsStringAsync(
          `${FileSystem.documentDirectory}setting.json`,
          JSON.stringify(getState().app.settings)
        ).then(res => {
          dispatch({
            type: 'SETTING_READ_FINISHED',
          });
        });
      }
    })
    .catch(err => {
      dispatch({
        type: 'SETTING_READ_FAILED',
      });
    });
};
