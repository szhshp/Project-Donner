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
  setting_toggleAutoSave: v => {
    dispatch(actions.setting_toggleAutoSave(v));
  },
});

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: null,
    header: null,
  };

  render() {
    return [
      <ImageBackground
        style={{
          height: Styles.DATA.navigationBarHeight,
          backgroundColor: Styles.Colors.backgroundColor,
        }}>
        <NavigationBar
          styleName="clear"
          centerComponent={
            <Title style={Styles.CSS.headerTextPaddingTop}>系统设定</Title>
          }
        />
      </ImageBackground>,
      <ScrollView style={{ flex: 1 }}>
        <View style={Styles.CSS.sectionViewContainer}>
          <Text style={Styles.CSS.scetionText}>
            功能 <Icon.Ionicons name="md-settings" size={18} />
          </Text>
        </View>
        <TouchableOpacity
          style={Styles.CSS.rowViewContainer}
          onPress={this.props.setting_toggleAutoSave}>
          <Text>自动保存谱面 (省流量)</Text>
          <Switch
            onValueChange={this.props.setting_toggleAutoSave}
            value={this.props.settings.autoSave}
          />
        </TouchableOpacity>
        <View style={Styles.CSS.sectionViewContainer}>
          <Text style={Styles.CSS.scetionText}>
            关于 <Icon.Ionicons name="md-person" size={18} />
          </Text>
        </View>
        <TouchableOpacity style={Styles.CSS.rowViewContainer}>
          <Text>当前版本</Text>
          <Text>{data_version.updateHistory.slice(-1)[0].version}</Text>
        </TouchableOpacity>
        {this.props.home.releases.length > 0 &&
          this.props.home.releases[0].tag_name !== undefined &&
          this.props.home.releases[0].tag_name >
            data_version.updateHistory.slice(-1)[0].version && [
            <TouchableOpacity style={Styles.CSS.rowViewContainer}>
              <Text>最新版本</Text>
              <Text>{this.props.home.releases[0].tag_name}</Text>
            </TouchableOpacity>,
            <TouchableOpacity
              onPress={() => {
                WebBrowser.openBrowserAsync(this.props.home.releases[0].url);
              }}>
              <Text style={{ color: 'red' }}> 点击更新</Text>
            </TouchableOpacity>,
          ]}

        <TouchableOpacity style={Styles.CSS.rowViewContainer}>
          <Text>
            作者: szhshp
            {'\n'}
            博客: http://szhshp.org{' '}
          </Text>
          <Image
            source={require('../assets/images/szhshp.png')}
            style={Styles.CSS.logoImageSmall}
          />
        </TouchableOpacity>
        {[
          '夸奖作者',
          '感谢作者',
          '给作者留言',
          '给作者买咖啡',
          '给作者买鼓棒',
          <Text>
            送作者
            <Text style={{ textDecorationLine: 'line-through' }}>一万</Text>
            一百万人民币
          </Text>,
          '给作者介绍对象',
          '送作者一架大力鼓',
        ].map((e,i) => (
          <TouchableOpacity
            key={i}
            style={Styles.CSS.rowViewContainer}
            onPress={() => {
              WebBrowser.openBrowserAsync('http://szhshp.org');
            }}>
            <Text>{e}</Text>
            <Icon.Ionicons name="md-open" size={18} />
          </TouchableOpacity>
        ))}
      </ScrollView>,
    ];
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
