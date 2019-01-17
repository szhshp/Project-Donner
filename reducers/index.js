const defaultState = {
  xxx: 123,
};

const reducer = (state, actionData) => {
  let rv = !state ? defaultState : state;

  console.log(actionData);
  
  switch (actionData.type) {
    /* Action Item Panel */
    case 'PANEL_ACTIONITEM_DISPLAY': {
      return {
        xxx: state.xxx + 1,
      };
    }
    case 'PANEL_ACTIONITEM_FORM_CHANGE': {
      break;
    }
    case 'PANEL_ACTIONNOTE_FORM_CHANGE': {
      break;
    }
    case 'PANEL_ACTIONNOTE_REQUEST': {
      break;
    }
    default: {
      return rv;
    }
  }
};

export default reducer;
