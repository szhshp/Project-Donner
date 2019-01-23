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
    case 'SEARCH_TOGGLE_SEARCHBAR': {
      rv.search.searchBar.toggleSearchBar = !rv.search.searchBar
        .toggleSearchBar;
      return rv;
    }
    case 'SEARCH_SEARCHBAR_ONCHANGE': {
      rv.search.searchBar.keyword = actionData.keyword;
      rv.search.searchBar.keyword = actionData.keyword;
      return rv;
    }
    case 'VIEW_LOAD_SCORE_STARTED': {
      rv.view.scoreView.message = '请求数据中';
      rv.view.scoreView.status = 'started';
      rv.view.scoreView.selectedWikiLink = actionData.selectedWikiLink;
      rv.view.scoreView.selectedLevel = actionData.selectedLevel;
      return rv;
    }
    case 'VIEW_LOAD_SCORE_FINISHED': {
      rv.view.scoreView.message = '请求数据完毕';
      rv.view.scoreView.status = 'succeed';
      rv.view.scoreView.selectedScoreLink = `https://www.wikihouse.com/taiko/${actionData.selectedScoreLink}`;
      return rv;
    }
    case 'VIEW_LOAD_SCORE_FAILED': {
      rv.view.scoreView.message = '请求数据失败, 可能 Namco 不在服务区?';
      rv.view.scoreView.status = 'failed';
      return rv;
    }
    default: {
      return rv;
    }
  }
};

export default reducer;
