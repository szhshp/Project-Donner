import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import data_scores from '../data/Scores';
import data_levels from '../data/Levels';
import data_categories from '../data/Categories';
import * as actions from '../actions';


const mapStateToProps = state => state.app;
const mapDispatchToProps = dispatch => ({
  search_select_category: scoreObj =>
    dispatch(actions.search_select_category(scoreObj)),
  search_reset_category: () => dispatch(actions.search_reset_category()),
  search_select_score: scoreObj => {
    /* dispath and navigate to Score Screen */
    this.props.navigation.navigate('Score');
    return dispatch(actions.search_select_score(scoreObj));
  },
});

class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null /* hide navigation from react-navigation */,
  };

  render() {
    return (
      <ScrollView>
        <Text>123</Text>
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinksScreen);
