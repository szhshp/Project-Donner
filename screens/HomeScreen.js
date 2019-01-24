import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
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
import { FileSystem } from 'expo';
import Styles from '../constants/Styles';

import { MonoText } from '../components/StyledText';
import Row from '../components/Row';

import data_version from '../data/Version';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Screen>
        {this._maybeRenderDevelopmentModeWarning()}

        <Row>
          <Image
            source={require('../assets/images/logo.png')}
            style={Styles.logoImage}
          />
        </Row>

        <Row>
          <Heading>Donner Helper</Heading>
        </Row>

        <Row>
          <Caption style={Styles.highLightText}>
            当前版本: {data_version.updateHistory.slice(-1)[0].version}
          </Caption>
          <Caption style={Styles.highLightText}>
            谱面数据: {data_version.scoreData.updateDate}
          </Caption>
        </Row>
        <Row>
          <Text Styles={{ textAlign: 'center' }}>
            一个过不了 <Text style={Styles.strokeText}>鬼7</Text> 鬼9 的太鼓玩家
          </Text>
          <Text Styles={{ textAlign: 'center' }}>无聊时制作的谱面查看 App</Text>
        </Row>

        <Row style={Styles.headerTextPaddingTop}>
          <Heading>更新历史</Heading>
          {data_version.updateHistory
            .slice(-2)
            .map(e => [
              <Caption style={Styles.highLightText}>{e.version}</Caption>,
              e.detail.map(m => <Text>{m}</Text>),
            ])}
        </Row>
      </Screen>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      return (
        <Text style={Styles.developmentModeText}>
          --- Development Mode ---
          {/* {learnMoreButton} */}
        </Text>
      );
    } else {
      return (
        <Text style={Styles.developmentModeText}>
          --- Non-Development Mode ---
        </Text>
      );
    }
  }
}
