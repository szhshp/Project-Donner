import { FileSystem, WebBrowser } from 'expo';

const Encoding = require('encoding-japanese');
const Cheerio = require('cheerio');

/**
 * [action creator - search score screen, selected a category]
 * @param  {[object]} categoryObj [the selected category object]
 */
export const searchScreen_select_category = categoryObj => ({
  type: 'SEARCHSCREEN_SELECT_CATEGORY',
  categoryObj,
});

/**
 * [action creator - search score screen, reset category select]
 */
export const searchScreen_reset_category = () => ({
  type: 'SEARCHSCREEN_RESET_CATEGORY',
});

/**
 * [action creator - search score screen, selected a score]
 * @param  {[object]} scoreObj [the selected score object]
 */
export const searchScreen_select_score = scoreObj => ({
  type: 'SEARCHSCREEN_SELECT_SCORE',
  scoreObj,
});

/**
 * [action creator - view score screen, spider the picture link in wiki link]
 * @param  {[string]} selectedWikiLink: wiki link
 * @param  {[obj]} scoreObj: selected score obj
 * @param  {[obj]} levelObj: selected level obj
 * @param  {[boolean]} downloadOnly: true = just download score but do not show modal
 * @return  {[thunk]} fetch score picture
 */
export const fetch_score = (
  selectedWikiLink,
  scoreObj,
  levelObj,
  downloadOnly
) => (dispatch, getState) => {
  /* fetch score event started*/

  /* if already downloaded */
  if (getState().app.settings.savedScore.arrScore.filter( e => 
    ((JSON.stringify(e.scoreObj) == JSON.stringify(scoreObj)) 
      && (JSON.stringify(e.levelObj) == JSON.stringify(levelObj)))
  ).length > 0) {
    return dispatch({
      type: 'VIEWSCREEN_LOAD_SCORE_FAILED',
      message: '此谱面已存在',
    });
  }

  dispatch({
    type: 'VIEWSCREEN_LOAD_SCORE_STARTED',
    selectedWikiLink,
    levelObj,
  });

  return fetch(selectedWikiLink)
    .then(res => res.text())
    .then(res => {
      /* spider the png source link */
      let $ = Cheerio.load(res);
      return $('img[title$=".png"]').attr('src');
    })
    .then(selectedScoreLink => {
      if (getState().app.settings.autoSave) {
        /* download and show in modal */
        dispatch(download_score(selectedScoreLink, scoreObj, levelObj));
        dispatch({
          type: 'VIEWSCREEN_LOAD_SCORE_FINISHED',
          selectedScoreLink,
        });
      } else if (downloadOnly) {
        /* download only */
        dispatch(download_score(selectedScoreLink, scoreObj, levelObj));
      } else {
        /* show in modal */
        dispatch({
          type: 'VIEWSCREEN_LOAD_SCORE_FINISHED',
          selectedScoreLink,
        });
      }
    })
    .catch(err => {
      dispatch({
        type: 'VIEWSCREEN_LOAD_SCORE_FAILED',
        message: '请求数据失败, 可能 Namco 不在服务区?',
      });
    });
};

/**
 * [action creator - search score screen, toggle searchbar]
 */
export const searchScreen_toggle_searchBar = () => ({
  type: 'SEARCHSCREEN_TOGGLE_SEARCHBAR',
});

/**
 * [action creator - search score screen, search bar keyword change handler]
 * @param  {[string]} keyword: the keyword
 */
export const searchScreen_searchBar_onChange = keyword => ({
  type: 'SEARCHSCREEN_SEARCHBAR_ONCHANGE',
  keyword,
});

/**
 * [action creator - view score screen, request for score picture]
 * @param  {[object]} scoreObj
 * @param  {[object]} levelObj
 * @return  {[func]} load score func
 */
export const viewScreen_load_score = (scoreObj, levelObj, downloadOnly) => {
  let scorePath = `難易度表/${levelObj.title}/${scoreObj.title}`;
  let encodedScorePath = Encoding.convert(Encoding.stringToCode(scorePath), {
    to: 'EUCJP',
    from: 'UNICODE',
  });
  let selectedWikiLink =
    'https://www.wikihouse.com/taiko/index.php?' +
    Encoding.urlEncode(encodedScorePath);

  return fetch_score(selectedWikiLink, scoreObj, levelObj, downloadOnly);
};

/**
 * [action creator - view score screen, reset/hide the modal]
 */
export const viewScreen_reset_scoreModal = () => ({
  type: 'VIEWSCREEN_RESET_SCOREMODAL',
});

/**
 * [action creator - view score screen, save score locally]
 * @param  {[string]} selectedScoreLink: direct score picture link
 * @return  {[func]} download, save locally, refresh the state
 */
export const download_score = (selectedScoreLink, scoreObj, levelObj) => (
  dispatch,
  getState
) => {
  // TODO: dispatch download start action?
  /*console.log('score.download.started', {
    selectedScoreLink,
    pictureLink: `https://www.wikihouse.com/taiko/${selectedScoreLink}`,
    localPath: `${FileSystem.documentDirectory}${selectedScoreLink}`,
  });*/

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
            type: 'VIEWSCREEN_DOWNLOAD_SCORE_FINISHED',
            relativePath: `savedScore/${selectedScoreLink.replace(
              'attach/',
              ''
            )}`,
            scoreObj,
            levelObj,
          });
        })
        .then(res => {
          dispatch(setting_write());
        })
        .catch(err => console.log(err));
    } else {
      console.log('Error: savedscore folder not exists');
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
  // console.log('setting.write', getState().app.settings);
  FileSystem.writeAsStringAsync(
    `${FileSystem.documentDirectory}setting.json`,
    JSON.stringify(getState().app.settings)
  ).catch(error => console.log(error));
};

/**
 * [action creator - global, read setting file to state]
 * @return  {[thunk]} file IO to read config file
 */
export const setting_read = () => (dispatch, getState) => {
  // TODO: dispatch setting read start action?
  /*dispatch({
    type: 'SETTING_READ_STARTED',
  });*/
  // console.log('setting read started');
  return FileSystem.getInfoAsync(`${FileSystem.documentDirectory}setting.json`)
    .then(res => {
      // console.log('setting.read.configExists', res);
      if (res.exists) {
        /* load the app setting */
        FileSystem.readAsStringAsync(
          `${FileSystem.documentDirectory}setting.json`
        )
          .then(res => JSON.parse(res))
          .then(res => {
            dispatch({
              type: 'SETTING_READ_FINISHED',
              settings: res,
            });
          });
      } else {
        /* create new setting file and push default value to state */
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

/**
 * [action creator - global, load saved score from application cached data ]
 * @param  {[int]} i: the saved score index
 */

export const load_savedScore = i => ({
  type: 'VIEWSCREEN_LOAD_SAVEDSCORE',
  index: i,
});

/**
 * [action creator - global, fetch for latest version ]
 * @param  {[thunk]} fetch in return
 */

export const load_latest_version = () => (dispatch, getState) => {
  return fetch('https://api.github.com/repos/szhielelp/Project-Donner/releases')
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: 'SETTING_LOAD_LATESTVERSION',
        latest_version_info: res,
      });
    })
    .catch(e => {
      console.log('load_latest_version: Failed');
    });
};

/**
 * [action creator - saved score screen, toggle delete view ]
 */
export const savedScore_toggle_deleteView = () => ({
  type: 'SAVEDSCORE_TOGGLE_DELETEVIEW',
});

/**
 * [action creator - saved score screen, show delete confirm modal ]
 * @param  {[int]} i: the saved score index
 */
export const savedScore_toggle_deleteConfirm = (i) => ({
  type: 'SAVEDSCORE_TOGGLE_DELETECONFIRM',
  index: i,
});


/**
 * [action creator - saved score screen, directly delete saved score in cached]
 * @return  {[thunk]} file IO to read config file
 */
export const savedScore_delete = () => (dispatch, getState) => {
  // console.log('savedScore_delete started');
  
  // TODO

  // return FileSystem.getInfoAsync(`${FileSystem.documentDirectory}setting.json`)
  //   .then(res => {
  //     // console.log('setting.read.configExists', res);
  //     if (res.exists) {
  //       /* load the app setting */
  //       FileSystem.readAsStringAsync(
  //         `${FileSystem.documentDirectory}setting.json`
  //       )
  //         .then(res => JSON.parse(res))
  //         .then(res => {
  //           dispatch({
  //             type: 'SETTING_READ_FINISHED',
  //             settings: res,
  //           });
  //         });
  //     } else {
  //       /* create new setting file and push default value to state */
  //       FileSystem.writeAsStringAsync(
  //         `${FileSystem.documentDirectory}setting.json`,
  //         JSON.stringify(getState().app.settings)
  //       ).then(res => {
  //         dispatch({
  //           type: 'SETTING_READ_FINISHED',
  //         });
  //       });

  //       /* create a new sub folder */
  //       FileSystem.makeDirectoryAsync(
  //         `${FileSystem.documentDirectory}savedScore/`
  //       );
  //     }
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: 'SETTING_READ_FAILED',
  //     });
  //   });
};