import PropTypes from 'prop-types';
import React from 'react';

import { View, Text } from 'react-native';

function Stage({ title, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.stage}>{children}</View>
    </View>
  );
}

Stage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

const styles = {
  container: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    color: '#444f6c',
    margin: 3,
  },
  stage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Stage;