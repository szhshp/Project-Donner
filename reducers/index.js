import merge from 'deepmerge';
import { FileSystem } from 'expo';

const defaultState = {
  settings: {
    autoSave: false,
    savedScore: {
      arrScore: [],
    },
  },
  search: {
    searchBar: {
      toggleSearchBar: false,
      keyword: '',
      // previousKeyword: [],
    },
    selectedCategory: undefined,
  },
  view: {
    scoreView: {
      selectedScore: undefined,
      status: '',
      selectedWikiLink: undefined,
      selectedScoreLink: undefined,
      selectedLevel: undefined,
      message: '先搜索谱面再到这里来查看咚!',
      modalVisible: false,
    },
  },
  home: {
    news: [],
  },
};

const reducer = (state = defaultState, actionData) => {
  console.log('Reducer.actionData', actionData);
  let rv = merge({}, state);

  switch (actionData.type) {
    /* Action Item Panel */
    case 'SEARCHSCREEN_SELECT_CATEGORY': {
      rv.search.selectedCategory = actionData.categoryObj;
      return rv;
    }
    case 'SEARCHSCREEN_RESET_CATEGORY': {
      rv.search.selectedCategory = undefined;
      return rv;
    }
    case 'SEARCHSCREEN_SELECT_SCORE': {
      rv.view.scoreView.selectedScore = actionData.scoreObj;
      rv.view.scoreView.message = '';
      return rv;
    }
    case 'SEARCHSCREEN_TOGGLE_SEARCHBAR': {
      rv.search.searchBar.toggleSearchBar = !rv.search.searchBar
        .toggleSearchBar;
      return rv;
    }
    case 'SEARCHSCREEN_SEARCHBAR_ONCHANGE': {
      rv.search.searchBar.keyword = actionData.keyword;
      rv.search.searchBar.keyword = actionData.keyword;
      return rv;
    }
    case 'VIEWSCREEN_LOAD_SCORE_STARTED': {
      rv.view.scoreView.message = '请求数据中...';
      rv.view.scoreView.status = 'started';
      rv.view.scoreView.selectedWikiLink = actionData.selectedWikiLink;
      rv.view.scoreView.selectedLevel = actionData.selectedLevel;
      return rv;
    }
    case 'VIEWSCREEN_LOAD_SCORE_FINISHED': {
      rv.view.scoreView.status = 'succeed';
      rv.view.scoreView.message = '请求数据完毕';
      rv.view.scoreView.selectedScoreLink = `https://www.wikihouse.com/taiko/${
        actionData.selectedScoreLink
      }`;
      return rv;
    }
    case 'VIEWSCREEN_DOWNLOAD_SCORE_FINISHED': {
      rv.view.scoreView.status = 'succeed';

      // add to saved score state if not added already
      if (
        rv.settings.savedScore.arrScore.filter(
          e => e.relativePath == actionData.relativePath
        ).length == 0
      ) {
        rv.settings.savedScore.arrScore.push({
          scoreObj: actionData.scoreObj,
          levelObj: actionData.levelObj,
          relativePath: actionData.relativePath,
        });
        rv.view.scoreView.message = '下载完成';
      } else {
        rv.view.scoreView.message = '此谱面已存在';
      }
      return rv;
    }
    case 'VIEWSCREEN_LOAD_SCORE_FAILED': {
      rv.view.scoreView.message = '请求数据失败, 可能 Namco 不在服务区?';
      rv.view.scoreView.status = 'failed';
      return rv;
    }
    case 'VIEWSCREEN_RESET_SCOREMODAL': {
      rv.view.scoreView.message = undefined;
      rv.view.scoreView.status = undefined;
      rv.view.scoreView.selectedScoreLink = undefined;
      return rv;
    }
    case 'VIEWSCREEN_LOAD_SAVEDSCORE': {
      rv.view.scoreView.status = 'succeed';
      rv.view.scoreView.selectedScore = rv.settings.savedScore.arrScore[actionData.index].scoreObj;
      rv.view.scoreView.selectedScoreLink = `${FileSystem.documentDirectory}${
        rv.settings.savedScore.arrScore[actionData.index].relativePath
      }`;
      return rv;
    }
    case 'SETTING_READ_FINISHED': {
      if (actionData.settings) rv.settings = actionData.settings;
      return rv;
    }
    /*case 'SAVEDSCORE_READ_FINISHED': {
      if (actionData.arrScoreFile)
        rv.savedScore.arrScoreFile = actionData.arrScoreFile;
      return rv;
    }*/
    case 'SETTING_CHANGE_AUTOSAVE': {
      rv.settings.autoSave = actionData.autoSave;
      return rv;
    }
    default: {
      return rv;
    }
  }
};

export default reducer;
