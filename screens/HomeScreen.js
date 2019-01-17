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
            style={styles.logoImage}
          />
        </Row>

        <Row>
          <Heading>Donner Helper</Heading>
        </Row>

        <Row>
          <Caption style={styles.highLightText}>
            当前版本: {data_version.version}
          </Caption>
          <Caption style={styles.highLightText}>
            谱面数据: {data_version.updateDate}
          </Caption>
        </Row>
        <Row>
          <Text styles={{ textAlign: 'center' }}>
            一个过不了 <Text style={styles.strokeText}>鬼7</Text> 鬼9 的太鼓玩家
          </Text>
          <Text styles={{ textAlign: 'center' }}>无聊时制作的谱面查看 App</Text>
        </Row>
      </Screen>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      return (
        <Text style={styles.developmentModeText}>
          --- Development Mode ---
          {/* {learnMoreButton} */}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          --- Non-Development Mode ---
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  highLightText: {
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingLeft: 3,
    paddingRight: 3,
    marginVertical: 5,
  },
  logoImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  strokeText: {
    textDecorationLine: 'line-through',
  },
});
