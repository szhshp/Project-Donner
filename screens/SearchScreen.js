import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Text,
  Screen,
  ListView,
  Title,
  Divider,
  Icon,
  Row,
  ImageBackground,
  NavigationBar,
} from '@shoutem/ui';
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
    return dispatch(actions.search_select_score(scoreObj))
  }
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
    console.log('Search.this.props', this.props);
    return (
      <Screen>
        <ImageBackground
          source={{
            uri:
              'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png',
          }}
          style={{ height: 60  }}>
          <NavigationBar
            styleName="clear"
            centerComponent={<Title>搜索谱面</Title>}
          />
        </ImageBackground>
        {this.props.search.selectedCategory !== undefined && (
          <ListView
            data={
              data_scores.scores.find(
                e =>
                  e.categoryID == this.props.search.selectedCategory.categoryID
              ).data
            }
            renderRow={s => {
              return (
                <TouchableOpacity
                  onPress={() => this.props.search_select_score(s)}>
                  <Row styleName="small">
                    <Text style={{ color: 'black' }}>
                      {s.title}
                      {'\n'}
                       BPM:{s.BPM} {'  '}难度: {s.levels.join('/')}
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
                    <Text style={{ color: 'black' }}>
                      {c.title}
                      {'\n'}
                      {c.transTitle}
                    </Text>
                    <Text style={{ color: 'black' }}>
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
