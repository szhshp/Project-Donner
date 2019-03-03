import React from 'react';
import { ScrollView, StyleShee, Modal, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'expo';

import {
  Text,
  ImageBackground,
  NavigationBar,
  Title,
  Button,
  ImagePreview,
  Heading,
  Divider,
  Row,
  Spinner,
  Image,
  Subtitle,
  View,
  Caption,
} from '@shoutem/ui';

import ImageViewer from 'react-native-image-zoom-viewer';
const Cheerio = require('cheerio');
const DeepEqual = require('deep-equal');

import Styles from '../constants/Styles';
import data_scores from '../data/Scores';
import data_levels from '../data/Levels';
import data_categories from '../data/Categories';
import * as actions from '../actions';

const mapStateToProps = state => state.app;
const mapDispatchToProps = dispatch => ({
  load_savedScore: index => dispatch(actions.load_savedScore(index)),
  viewScreen_load_score: (scoreObj, levelObj) =>
    dispatch(actions.viewScreen_load_score(scoreObj, levelObj, false)),
  viewScreen_reset_scoreModal: () => {
    dispatch(actions.viewScreen_reset_scoreModal());
  },
  viewScreen_download_score: (scoreObj, levelObj) =>
    dispatch(actions.viewScreen_load_score(scoreObj, levelObj, true)),
});

class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null /* hide navigation from react-navigation */,
  };

  render() {
    // console.log('ScoreScreen.props', this.props);

    return (
      <ScrollView>
        <ImageBackground
          style={{
            height: Styles.DATA.navigationBarHeight,
            backgroundColor: Styles.Colors.backgroundColor,
          }}>
          <NavigationBar
            styleName="clear"
            leftComponent={
              /* only show back button when selected category */
              this.props.search.selectedCategory !== undefined && (
                <Button styleName="clear">
                  <Icon.Ionicons
                    name="md-arrow-back"
                    size={24}
                    onPress={() => this.props.navigation.navigate('Search')}
                    style={[
                      Styles.CSS.textColorWithinBackground,
                      Styles.CSS.headerTextPaddingTop,
                    ]}
                  />
                </Button>
              )
            }
            centerComponent={
              <Title style={Styles.CSS.headerTextPaddingTop}>查看谱面</Title>
            }
          />
        </ImageBackground>

        {this.props.view.scoreView.selectedScore !== undefined && (
          <Row>
            <View styleName="vertical">
              <View styleName="horizontal space-between">
                <Heading>
                  {this.props.view.scoreView.selectedScore.title}
                </Heading>
              </View>
              <View>
                <Caption>
                  BPM: {this.props.view.scoreView.selectedScore.BPM}
                </Caption>
              </View>
              {this.props.view.scoreView.selectedScore.levels.map((e, i) => {
                let indexInSavedScore = this.props.settings.savedScore.arrScore.findIndex(
                  savedScore => {
                    return (
                      DeepEqual(
                        savedScore.scoreObj,
                        this.props.view.scoreView.selectedScore
                      ) && DeepEqual(savedScore.levelObj, data_levels[i])
                    );
                  }
                );
                let isSavedScore = indexInSavedScore > -1 ? true : false;

                return (
                  <View styleName="horizontal">
                    <Button
                      onPress={() => {
                        if (isSavedScore) {
                          this.props.load_savedScore(indexInSavedScore);
                        } else {
                          this.props.viewScreen_load_score(
                            this.props.view.scoreView.selectedScore,
                            data_levels[i]
                          )
                        }
                      }}
                      styleName={
                        'confirmation secondary' + (e != null ? '' : ' muted')
                      }
                      style={Styles.CSS.buttonPrimary}>
                      <Text style={Styles.CSS.buttonText}>
                        {data_levels[i].transTitle}: {e != null ? e + '★' : '-'}
                      </Text>
                    </Button>

                    <Button
                      styleName={
                        'confirmation secondary' + (e != null ? '' : ' muted')
                      }
                      onPress={() =>
                        this.props.viewScreen_download_score(
                          this.props.view.scoreView.selectedScore,
                          data_levels[i]
                        )
                      }
                      style={
                        isSavedScore
                          ? Styles.CSS.buttonSuccess
                          : Styles.CSS.buttonSecondary
                      }>
                      <Text style={Styles.CSS.buttonText}>
                        {isSavedScore
                          ? '已下载'
                          : ['下载', <Icon.Ionicons name="md-download" size={16} />]}
                      </Text>
                    </Button>
                  </View>
                );
              })}
            </View>
          </Row>
        )}
        {this.props.view.scoreView.message !== undefined &&
          this.props.view.scoreView.message.length > 0 && (
            <Row>
              <Text>{this.props.view.scoreView.message}</Text>
            </Row>
          )}

        {this.props.view.scoreView.status == 'started' && <Spinner />}

        <Modal
          visible={this.props.view.scoreView.selectedScoreLink !== undefined}
          transparent={true}
          onRequestClose={() => this.props.viewScreen_reset_scoreModal()}>
          <ImageViewer
            imageUrls={[
              {
                url: this.props.view.scoreView.selectedScoreLink,
              },
            ]}
          />
        </Modal>
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinksScreen);
