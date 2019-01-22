import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo';
import {
  Text,
  View,
  Screen,
  ListView,
  TextInput,
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
  return state.app;
};

const mapDispatchToProps = dispatch => ({
  search_select_category: scoreObj =>
    dispatch(actions.search_select_category(scoreObj)),
  search_reset_category: () => dispatch(actions.search_reset_category()),
  search_select_score: scoreObj =>
    dispatch(actions.search_select_score(scoreObj)),
  search_toggle_searchBar: () => dispatch(actions.search_toggle_searchBar()),
  search_searchBar_onChange: keyword =>
    dispatch(actions.search_searchBar_onChange(keyword)),
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

    let scoreInSelectedCategory;
    if (this.props.search.selectedCategory !== undefined) {
      scoreInSelectedCategory = data_scores.scores.find(
        e => e.categoryID == this.props.search.selectedCategory.categoryID
      );
    }

    return (
      <Screen>
        <ImageBackground
          style={{
            height: 70,
            backgroundColor: Styles.Colors.backgroundColor,
          }}>
          <NavigationBar
            styleName="clear"
            leftComponent={
              /* only show back button when selected category */
              this.props.search.selectedCategory !== undefined && (
                <Button styleName="clear">
                  <Ionicons
                    name="md-arrow-back"
                    size={24}
                    onPress={() => this.props.search_reset_category()}
                    style={[
                      Styles.CSS.textColorWithinBackground,
                      Styles.CSS.headerTextPaddingTop,
                    ]}
                  />
                </Button>
              )
            }
            centerComponent={
              <Title style={Styles.CSS.headerTextPaddingTop}>搜索谱面</Title>
            }
            rightComponent={
              <Button styleName="clear">
                <Ionicons
                  name="md-search"
                  size={24}
                  onPress={() => this.props.search_toggle_searchBar()}
                  style={[
                    Styles.CSS.textColorWithinBackground,
                    Styles.CSS.headerTextPaddingTop,
                  ]}
                />
              </Button>
            }
          />
        </ImageBackground>
        {this.props.search.searchBar.toggleSearchBar === true && (
          <View>
            <TextInput
              autoFocus={true}
              clearButtonMode={true}
              placeholder={'请输入关键字...'}
              value={this.props.search.searchBar.keyword}
              onChangeText={text => this.props.search_searchBar_onChange(text)}
            />
          </View>
        )}
        <Divider styleName="line" />

        {scoreInSelectedCategory !== undefined && (
          <ListView
            data={scoreInSelectedCategory.data.map(e => ({
              ...e,
              r: this.props.search.searchBar.keyword,
            }))}
            renderRow={s => {
              return (
                s.title
                  .toLocaleLowerCase()
                  .indexOf(
                    this.props.search.searchBar.keyword.toLocaleLowerCase()
                  ) > -1 && (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.search_select_score(s);
                      this.props.navigation.navigate('Score');
                    }}>
                    <Row styleName="small">
                      <Text style={{ color: Styles.Colors.defaultText }}>
                        {s.title}
                        {'\n'}
                        难度:{' '}
                        {s.levels.map(e => (e == null ? '-' : e)).join('/')}
                        {'  '}
                        BPM:
                        {s.BPM}
                      </Text>
                      <Ionicons name="md-arrow-round-forward" size={16} />
                    </Row>
                    <Divider styleName="line" />
                  </TouchableOpacity>
                )
              );
            }}
          />
        )}
        {this.props.search.selectedCategory === undefined && (
          <ListView
            data={data_categories.map(e => ({
              ...e,
              r: this.props.search.searchBar
                .keyword /* tricky solution, add redundant key 'r' to make sure list view are refreshed */,
            }))}
            renderRow={c => {
              let scoreCategory = data_scores.scores.find(e => {
                return e.categoryID == c.categoryID;
              });

              let scoreCategoryCount = 0;

              if (scoreCategory !== undefined) {
                let keyword = this.props.search.searchBar.keyword;

                scoreCategoryCount = scoreCategory.data.filter(
                  s =>
                    s.title
                      .toLocaleLowerCase()
                      .indexOf(keyword.toLocaleLowerCase()) > -1
                ).length;
              }

              return (
                scoreCategoryCount > 0 && (
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
                )
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
