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
    backgroundColor: 'grey',
  },
  buttonText: {
    fontSize: 16,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  highLightText: {
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingLeft: 3,
    paddingRight: 3,
    marginVertical: 5,
  },
  logoImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  strokeText: {
    textDecorationLine: 'line-through',
  },
  logoImageSmall: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  scetionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionViewContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    borderColor: '#c9c9c9',
  },
  rowViewContainer: {
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    borderColor: '#c9c9c9',
    flexDirection: 'row',
  },
};

export default { Colors, CSS };
