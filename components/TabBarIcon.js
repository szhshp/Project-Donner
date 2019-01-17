import React from 'react';
import { Icon } from 'expo';

import Styles from '../constants/Styles';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Styles.Colors.tabIconSelected : Styles.Colors.tabIconDefault}
      />
    );
  }
}