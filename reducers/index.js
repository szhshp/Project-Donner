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
      status: '',
      selectedScoreLink: undefined,
      selectedScore: undefined,
      selectedLevel: undefined,
      message: '',
      modalVisible: false,
    },
  },
  home: {
    news: [],
  },
};

const reducer = (state, actionData) => {
  console.log('Reducer.actionData', actionData);
  let rv = !state ? defaultState : merge({}, state);

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
      rv.search.selectedScore = actionData.scoreObj;
      return rv;
    }
    default: {
      return rv;
    }
  }
};

export default reducer;
