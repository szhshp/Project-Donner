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

import ImageViewer from 'react-native-image-zoom-viewer';
const Cheerio = require('cheerio');

import Styles from '../constants/Styles';
import data_scores from '../data/Scores';
import data_levels from '../data/Levels';
import data_categories from '../data/Categories';
import * as actions from '../actions';

const mapStateToProps = state => state.app;
const mapDispatchToProps = dispatch => ({
  view_load_score: (scoreObj, levelObj) =>
    dispatch(actions.view_load_score(scoreObj, levelObj)),
});

class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null /* hide navigation from react-navigation */,
  };

  render() {
    console.log('ScoreScreen.props', this.props);

    return (
      <ScrollView>
        <ImageBackground
          style={{
            height: 70,
            backgroundColor: Styles.Colors.backgroundColor,
          }}>
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Title style={Styles.CSS.HeaderTextPaddingTop}>查看谱面</Title>
            }
          />
        </ImageBackground>
        {this.props.view.scoreView.message !== undefined &&
          this.props.view.scoreView.message.length > 0 && (
            <Row>
              <Text>{this.props.view.scoreView.message}</Text>
            </Row>
          )}
        {this.props.view.scoreView.selectedScore !== undefined && (
          <Row>
            <View styleName="vertical">
              <View styleName="horizontal space-between">
                <Heading>
                  {this.props.view.scoreView.selectedScore.title}
                </Heading>
                <Caption>
                  BPM: {this.props.view.scoreView.selectedScore.BPM}
                </Caption>
              </View>
              {this.props.view.scoreView.selectedScore.levels.map((e, i) => (
                <View styleName="horizontal">
                  <Button
                    onPress={() =>
                      this.props.view_load_score(
                        this.props.view.scoreView.selectedScore,
                        data_levels[i]
                      )
                    }
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
