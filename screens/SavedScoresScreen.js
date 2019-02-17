import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import {
  Text,
  View,
  Screen,
  ListView,
  TextInput,
  Title,
  Divider,
  Button,
  Row,
  ImageBackground,
  NavigationBar,
} from '@shoutem/ui';
import { FileSystem, WebBrowser, Icon } from 'expo';

import * as actions from '../actions';
import Styles from '../constants/Styles';

import data_version from '../data/Version';

const mapStateToProps = state => state.app;
const mapDispatchToProps = dispatch => ({
  load_savedScore: index => dispatch(actions.load_savedScore(index)),
});

class SavedScoresScreen extends React.Component {
  static navigationOptions = {
    title: null,
    header: null,
  };

  render() {
    // console.log('Setting.this.props', this.props);
    return [
      <ImageBackground
        style={{
          height: Styles.DATA.navigationBarHeight,
          backgroundColor: Styles.Colors.backgroundColor,
        }}>
        <NavigationBar
          styleName="clear"
          centerComponent={
            <Title style={Styles.CSS.headerTextPaddingTop}>已下载谱面</Title>
          }
        />
      </ImageBackground>,
      <ScrollView style={{ flex: 1 }}>
        <Row>
          <Text>
            已保存的谱面计数: {this.props.settings.savedScore.arrScore.length}
          </Text>
        </Row>
        <Divider styleName="line" />
        <Divider styleName="line" />
        <Divider styleName="line" />

        {this.props.settings.savedScore.arrScore.length == 0 && (
          <Button
            onPress={() => this.props.navigation.navigate('Search')}
            styleName={'confirmation secondary'}
            style={Styles.CSS.buttonPrimary}>
            <Text style={Styles.CSS.buttonText}>点击这儿开始搜索谱面咚!</Text>
          </Button>
        )}
        {this.props.settings.savedScore.arrScore.length > 0 && (
          <ListView
            data={this.props.settings.savedScore.arrScore}
            renderRow={(s, secID, rowIndex) => {
              return (
                <TouchableOpacity
                  key={rowIndex}
                  onPress={() => {
                    this.props.load_savedScore(rowIndex);
                    this.props.navigation.navigate('Score');
                  }}>
                  <Row styleName="small" key={rowIndex}>
                    <Text style={{ color: Styles.Colors.defaultText }}>
                      {s.scoreObj.title}
                      {'\n'}
                      {s.scoreObj.levels[s.levelObj.levelID] + '★'}
                      {' / '}
                      {s.levelObj.transTitle}
                    </Text>
                    <Icon.Ionicons name="md-arrow-round-forward" size={16} />
                  </Row>
                  <Divider styleName="line" />
                  <Divider styleName="line" />
                  <Divider styleName="line" />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </ScrollView>,
    ];
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedScoresScreen);
