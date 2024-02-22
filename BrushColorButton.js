import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

export default function BrushColorButton({ brushColor, onPress, isActive }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.brushColorButton, isActive && styles.active]}>
      <View style={{ width: 30, height: 30, backgroundColor: brushColor }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  brushColorButton: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  active: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
