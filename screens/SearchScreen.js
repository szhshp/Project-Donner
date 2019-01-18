import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo';
import {
  Text,
  Screen,
  ListView,
  Title,
  Divider,
  Icon,
  Button,
  Row,
  ImageBackground,
  NavigationBar,
} from '@shoutem/ui';
import { connect } from 'react-redux';

import Styles from '../constants/Styles';
import data_scores from '../data/Scores';
import data_levels from '../data/Levels';
import data_categories from '../data/Categories';
import * as actions from '../actions';

const mapStateToProps = state => {
  console.log('state', state);
  return state.app;
};
const mapDispatchToProps = dispatch => ({
  search_select_category: scoreObj =>
    dispatch(actions.search_select_category(scoreObj)),
  search_reset_category: () => dispatch(actions.search_reset_category()),
  search_select_score: scoreObj =>
    dispatch(actions.search_select_score(scoreObj)),
});

class SearchScreen extends React.Component {
  // hide header from react-navigation
  static navigationOptions = {
    title: null,
    header: null,
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.search_reset_category();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    // console.log('Search.this.props', this.props);
    let scoreInSelectedCategory;
    if (this.props.search.selectedCategory !== undefined){

      scoreInSelectedCategory = data_scores.scores.find(
        e => e.categoryID == this.props.search.selectedCategory.categoryID
      );
    }

    return (
      <Screen>
        <ImageBackground
          style={{
            height: 60,
            backgroundColor: Styles.Colors.backgroundColor,
          }}>
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Title style={Styles.CSS.HeaderTextPaddingTop}>搜索谱面</Title>
            }
            rightComponent={
              <Button styleName="clear">
                <Ionicons
                  name="md-search"
                  size={20}
                  style={[
                    Styles.CSS.textColorWithinBackground,
                    Styles.CSS.HeaderTextPaddingTop,
                  ]}
                />
              </Button>
            }
          />
        </ImageBackground>
        <Divider styleName="line" />
        
        {scoreInSelectedCategory !== undefined && (
          <ListView
            data={
              scoreInSelectedCategory.data
            }
            renderRow={s => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.search_select_score(s);
                    this.props.navigation.navigate('Score');
                  }}>
                  <Row styleName="small">
                    <Text style={{ color: Styles.Colors.defaultText }}>
                      {s.title}
                      {'\n'}
                      难度: {s.levels.map(e => (e == null ? '-' : e)).join('/')}
                      {'  '}
                      BPM:
                      {s.BPM}
                    </Text>
                    <Ionicons name="md-arrow-round-forward" size={16} />
                  </Row>
                  <Divider styleName="line" />
                </TouchableOpacity>
              );
            }}
          />
        )}
        {this.props.search.selectedCategory === undefined && (
          <ListView
            data={data_categories}
            renderRow={c => {
              let scoreCategory = data_scores.scores.find(
                e => e.categoryID == c.categoryID
              );
              let scoreCategoryCount =
                scoreCategory !== undefined ? scoreCategory.data.length : 0;
              return (
                <TouchableOpacity
                  onPress={() => this.props.search_select_category(c)}>
                  <Row styleName="small" style={{ backgroundColor: c.color }}>
                    <Text style={{ color: Styles.Colors.defaultText }}>
                      {c.title}
                      {'\n'}
                      {c.transTitle}
                    </Text>
                    <Text style={{ color: Styles.Colors.defaultText }}>
                      {scoreCategoryCount} 曲目
                    </Text>
                    <Ionicons name="md-arrow-round-forward" size={16} />
                  </Row>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </Screen>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
