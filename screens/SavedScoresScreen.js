import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  ListView,
  Title,
  Divider,
  Button,
  Row,
  ImageBackground,
  NavigationBar,
} from '@shoutem/ui';
import { Icon } from 'expo';

import * as actions from '../actions';
import Styles from '../constants/Styles';


const mapStateToProps = state => state.app;
const mapDispatchToProps = dispatch => ({
  load_savedScore: index => dispatch(actions.load_savedScore(index)),
  toggle_savedScore_deleteView: index => dispatch(actions.savedScore_toggle_deleteView(index)),
  toggle_savedScore_deleteConfirm: index => dispatch(actions.savedScore_toggle_deleteConfirm(index)),
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
            <Title style={Styles.CSS.headerTextPaddingTop}>
              {(this.props.savedScore.toggleDeleteView === false) ? '已下载谱面' : '删除谱面'}
            </Title>
          }
          rightComponent={
            <Button
              styleName="clear"
              onPress={() => this.props.toggle_savedScore_deleteView()}
            >
              <Icon.Ionicons
                name={(this.props.savedScore.toggleDeleteView === false) ? 'md-trash' : 'md-checkmark'}
                size={24}
                style={[
                  Styles.CSS.textColorWithinBackground,
                  Styles.CSS.headerTextPaddingTop,
                ]}
              />
            </Button>
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
                    if (this.props.savedScore.toggleDeleteView == true) {
                      this.props.toggle_savedScore_deleteConfirm(rowIndex);
                    } else {
                      this.props.load_savedScore(rowIndex);
                      this.props.navigation.navigate('Score');
                    }
                  }}
                >
                  <Row styleName="small" key={rowIndex}>
                    <Text style={{ color: Styles.Colors.defaultText }}>
                      {s.scoreObj.title}
                      {'\n'}
                      {s.scoreObj.levels[s.levelObj.levelID] + '★'}
                      {' / '}
                      {s.levelObj.transTitle}
                    </Text>
                    <Icon.Ionicons
                      name={(this.props.savedScore.toggleDeleteView === false) ? "md-arrow-round-forward" : 'md-trash'}
                      size={24}
                    />
                  </Row>
                  {this.props.savedScore.toggleDeleteView == true
                    && this.props.savedScore.savedScoreIndexToDelete != -1
                    && this.props.savedScore.savedScoreIndexToDelete === rowIndex &&
                    <Row key={rowIndex + 10000}>
                      <Text>确认删除此谱面?</Text>
                      <Button
                        style={Styles.CSS.buttonDanger}
                        onPress={() => {
                          this.props.toggle_savedScore_deleteConfirm(rowIndex)
                        }}>
                        <Text>YES</Text>
                      </Button>
                      <Button
                        style={Styles.CSS.buttonSuccess}
                        onPress={() => {
                          this.props.toggle_savedScore_deleteConfirm(-1)
                        }}
                      >
                        <Text>No</Text>
                      </Button>
                    </Row>
                  }
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
