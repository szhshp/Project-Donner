import merge from 'deepmerge';

const defaultState = {
  settings: {
    autoSave: false,
  },
  favoriteScore: {
    scores: [],
  },
  search: {
    searchBar: {
      toggleSearchBar: false,
      keyword: '',
      previousKeyword: [],
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
    case 'SEARCH_SELECT_CATEGORY': {
      rv.search.selectedCategory = actionData.categoryObj;
      return rv;
    }
    case 'SEARCH_RESET_CATEGORY': {
      rv.search.selectedCategory = undefined;
      return rv;
    }
    case 'SEARCH_SELECT_SCORE': {
      rv.view.scoreView.selectedScore = actionData.scoreObj;
      rv.view.scoreView.message = '';
      return rv;
    }
    case 'VIEW_LOAD_SCORE_STARTED': {
      /*rv.view.scoreView.selectedScore = actionData.scoreObj;
      rv.view.scoreView.selectedLevel = actionData.levelObj;*/
      rv.view.scoreView.message = '请求数据中';
      rv.view.scoreView.status = 'started';
      return rv;
    }
    case 'VIEW_LOAD_SCORE_LOADING': {
      rv.view.scoreView.selectedScore = actionData.scoreObj;
      rv.view.scoreView.selectedLevel = actionData.levelObj;
      rv.view.scoreView.message = '';
      rv.view.scoreView.status = 'loading';
      return rv;
    }
    default: {
      return rv;
    }
  }
};

export default reducer;
