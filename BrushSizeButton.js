import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

export default function BrushSizeButton({ brushSize, onPress, isActive }) {
  const size = brushSize === 'Ultra Small' ? 2 : brushSize === 'Small' ? 4 : brushSize === 'Medium' ? 6 : brushSize === 'Large' ? 8 : 10;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.brushSizeButton, isActive && styles.active]}>
      <View style={{ width: size, height: size, backgroundColor: '#000' }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  brushSizeButton: {
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
