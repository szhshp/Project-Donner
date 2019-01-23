const mainColor = '#3e83c4';
const textColorWithinBackground = 'white';
const textColorDefault = 'black';

const Colors = {
  backgroundColor: mainColor,
  tintColor: mainColor,
  textColorWithinBackground,
  tabIconDefault: textColorWithinBackground,
  tabIconSelected: mainColor,
  tabBar: '#fefefe',
  defaultText: textColorDefault,
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: mainColor,
  noticeText: '#fff',
};

const CSS = {
  headerTextPaddingTop: {
    paddingTop: 15,
  },
  textColorWithinBackground: {
    color: Colors.textColorWithinBackground,
  },
  buttonPrimary: {
    backgroundColor: mainColor,
  },
  buttonSecondary: {
    backgroundColor: 'red',
  },
  buttonText:{
    fontSize: 16,
  }
};

export default { Colors, CSS };
