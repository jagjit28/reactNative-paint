import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ToolbarSection({ title, children }) {
  return (
    <View style={styles.toolbarSection}>
      <Text>{title}</Text>
      <View style={styles.buttonWrapper}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbarSection: {
    flexDirection: 'column',
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
