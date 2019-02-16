import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  Modal,
  Dimensions,
} from 'react-native';
import {
  Text,
  Heading,
  Title,
  Screen,
  Subtitle,
  Description,
  Caption,
} from '@shoutem/ui';
import { connect } from 'react-redux';

import { FileSystem, WebBrowser } from 'expo';
import Styles from '../constants/Styles';

import { MonoText } from '../components/StyledText';
import Row from '../components/Row';

import data_version from '../data/Version';
import * as actions from '../actions';

const mapStateToProps = state => state.app;
const mapDispatchToProps = dispatch => ({
  setting_read: () => {
    dispatch(actions.setting_read());
  },
  load_latest_version: () => {
    dispatch(actions.load_latest_version());
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.setting_read();
    this.props.load_latest_version();
  }

  render() {
    return (
      <Screen>
        {this._maybeRenderDevelopmentModeWarning()}

        <Row>
          <Image
            source={require('../assets/images/logo.png')}
            style={Styles.CSS.logoImage}
          />
        </Row>

        <Row>
          <Heading>Donner Helper</Heading>
        </Row>
        <Row>
          <Caption style={Styles.CSS.highLightText}>
            当前版本: {data_version.updateHistory.slice(-1)[0].version}
          </Caption>

          {this.props.home.releases.length > 0 &&
            this.props.home.releases[0].tag_name !== undefined &&
            this.props.home.releases[0].tag_name >
              data_version.updateHistory.slice(-1)[0].version && [
              <Caption style={Styles.CSS.highLightText}>
                最新版本: {this.props.home.releases[0].tag_name}
              </Caption>,
              <TouchableOpacity
                onPress={() => {
                  WebBrowser.openBrowserAsync(this.props.home.releases[0].url);
                }}>
                <Text style={{ color: 'red' }}> 点击更新</Text>
              </TouchableOpacity>,
            ]}
          {/*<Caption style={Styles.CSS.highLightText}>
            谱面数据: {data_version.scoreData.updateDate}
          </Caption>*/}
        </Row>
        <Row>
          <Text Styles={{ textAlign: 'center' }}>
            一个过不了 <Text style={Styles.CSS.strokeText}>鬼7</Text> 鬼9
            的太鼓玩家
          </Text>
          <Text Styles={{ textAlign: 'center' }}>无聊时制作的谱面查看 App</Text>
        </Row>

        <Row style={Styles.CSS.headerTextPaddingTop}>
          <Heading>更新历史</Heading>
          {data_version.updateHistory
            .slice(-3)
            .map(e => [
              <Caption style={Styles.CSS.highLightText}>{e.version}</Caption>,
              e.detail.map(m => (
                <Text style={{ textAlign: 'center' }}>{m}</Text>
              )),
            ])}
        </Row>
      </Screen>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    return <Row><Text>--- {(!__DEV__)?'Non-':''}Development Mode ---</Text></Row>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
