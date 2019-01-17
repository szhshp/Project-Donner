import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  Text,
  ImageBackground,
  NavigationBar,
  Title,
  Button,
  Heading,
  Divider,
  Row,
  Image,
  Subtitle,
  View,
  Caption,
} from '@shoutem/ui';

import Styles from '../constants/Styles';
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
    console.log('ScoreScreen', this.props);
    console.log('ScoreScreen', this.props.search.selectedScore.levels);

    return (
      <ScrollView>
        <ImageBackground
          style={{
            height: 60,
            backgroundColor: Styles.Colors.backgroundColor,
          }}>
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Title style={Styles.CSS.HeaderTextPaddingTop}>查看谱面</Title>
            }
          />
        </ImageBackground>
        {this.props.search.selectedScore !== undefined && (
          <Row>
            <View styleName="vertical">
              <View styleName="horizontal space-between">
                <Heading>{this.props.search.selectedScore.title}</Heading>
                <Caption>BPM: {this.props.search.selectedScore.BPM}</Caption>
              </View>
              {this.props.search.selectedScore.levels.map((e, i) => (
                <View styleName="horizontal">
                  <Button
                    styleName={
                      'confirmation secondary' + (e != null ? '' : ' muted')
                    }
                    style={Styles.CSS.buttonPrimary}>
                    <Text>
                      {data_levels[i].transTitle}: {e != null ? e + '★' : '-'}
                    </Text>
                  </Button>
                  <Button
                    styleName={
                      'confirmation secondary' + (e != null ? '' : ' muted')
                    }
                    style={Styles.CSS.buttonSecondary}>
                    <Text>下载</Text>
                  </Button>
                </View>
              ))}
            </View>
          </Row>
        )}
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinksScreen);
