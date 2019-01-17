import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Text,
  Screen,
  Heading,
  ListView,
  Title,
  Subtitle,
  Tile,
  Divider,
  Icon,
  Row,
  Caption,
  ImageBackground,
  NavigationBar,
} from '@shoutem/ui';
import { connect } from 'react-redux'

import Colors from '../constants/Colors';
import data_scores from '../data/Scores';
import data_levels from '../data/Levels';
import data_categories from '../data/Categories';
import * as actions from '../actions'

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  showActionItemEditRow: (action, data) => dispatch(actions.actionItem_ShowEditPanel()),
})

class SearchScreen extends React.Component {
  // hide header from react-navigation
  static navigationOptions = {
    title: null,
    header: null,
  };

  render() {
    return (
      <Screen>
        <ImageBackground
          source={{
            uri:
              'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png',
          }}
          style={{ width: 375, height: 70 }}>
          <NavigationBar
            styleName="clear"
            centerComponent={<Title>搜索谱面</Title>}
          />
        </ImageBackground>
        <ListView
          data={data_categories}
          renderRow={c => (
            <TouchableOpacity onPress={this.props.showActionItemEditRow}>
              <Row styleName="small" style={{ backgroundColor: c.color }}>
                <Text style={{color: 'black'}}>{c.title}</Text>
                <Ionicons name="md-arrow-round-forward" size={16} />
              </Row>
            </TouchableOpacity>
          )}
        />
      </Screen>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
