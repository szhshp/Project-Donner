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
 * [action creator - view score screen, loading score, spider the picture link in wiki link]
 * @param  {[string]} selectedWikiLink: wiki link
 * @param  {[obj]} selectedLevel: selected level obj
 * @param  {[boolean]} onlyDownload: true = just download score but do not show modal
 * @return  {[thunk]} fetch score picture
 */
export const load_score = (selectedWikiLink, selectedLevel, onlyDownload) => (
  dispatch,
  getState
) => {
  dispatch({
    type: 'VIEWSCREEN_LOAD_SCORE_STARTED',
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
      if (onlyDownload) {
        dispatch(viewScreen_download_score(selectedScoreLink));
      } else {
        dispatch({
          type: 'VIEWSCREEN_LOAD_SCORE_FINISHED',
          selectedScoreLink,
          onlyDownload: false,
        });
      }
    })
    .catch(err => {
      dispatch({
        type: 'VIEWSCREEN_LOAD_SCORE_FAILED',
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
export const viewScreen_load_score = (scoreObj, levelObj, onlyDownload) => {
  let scorePath = `難易度表/${levelObj.title}/${scoreObj.title}`;
  let encodedScorePath = Encoding.convert(Encoding.stringToCode(scorePath), {
    to: 'EUCJP',
    from: 'UNICODE',
  });
  let selectedWikiLink =
    'https://www.wikihouse.com/taiko/index.php?' +
    Encoding.urlEncode(encodedScorePath);

  return load_score(selectedWikiLink, levelObj, onlyDownload);
};

/**
 * [action creator - view score screen, reset/hide the modal]
 */
export const viewScreen_reset_scoreModal = () => ({
  type: 'VIEWSCREEN_RESET_SCOREMODAL',
});

/**
 * [action creator - view score screen, save score locally]
 */
export const viewScreen_download_score = selectedScoreLink => (
  dispatch,
  getState
) => {
  // TODO: dispatch download start
  console.log('score.download ', {
    selectedScoreLink,
    pictureLink: `https://www.wikihouse.com/taiko/${selectedScoreLink}`,
    localPath: `${FileSystem.documentDirectory}${selectedScoreLink}`,
  });

  /* download the score picture */
  return FileSystem.getInfoAsync(
    `${FileSystem.documentDirectory}savedScore/`
  ).then(res => {
    if (res.exists) {
      FileSystem.downloadAsync(
        `https://www.wikihouse.com/taiko/${selectedScoreLink}`,
        `${FileSystem.documentDirectory}savedScore/${selectedScoreLink.replace(
          'attach/',
          ''
        )}`
      )
        .then(res => {
          dispatch({
            type: 'VIEWSCREEN_LOAD_SCORE_FINISHED',
            selectedScoreLink,
            onlyDownload: false, /* TODO */ 
          });
          /*TODO: refresh setting */
          /*dispatch(setting_read());*/
        })
        .catch(err => console.log(err));
    } else {
      console.log('created savedScore folder');
      FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}savedScore/`
      );
    }
  });
};

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
        /* if not exists then create new setting file and push default value to state */
        FileSystem.writeAsStringAsync(
          `${FileSystem.documentDirectory}setting.json`,
          JSON.stringify(getState().app.settings)
        ).then(res => {
          dispatch({
            type: 'SETTING_READ_FINISHED',
          });
        });
        /* create a new sub folder */
        FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}savedScore/`
        );
      }
    })
    .catch(err => {
      dispatch({
        type: 'SETTING_READ_FAILED',
      });
    });
};
