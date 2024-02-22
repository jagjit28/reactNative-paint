import React, { useRef, useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BrushColorButton from './BrushColorButton';
import BrushSizeButton from './BrushSizeButton';
import ToolbarSection from './ToolbarSection';

const brushSizes = {
  'Ultra Small': 2,
  Small: 4,
  Medium: 6,
  Large: 8,
  'Extra Large': 10,
};

const brushColors = {
  Red: '#dd2a2a',
  Orange: '#ffa501',
  Yellow: '#ffd400',
  Green: '#129d12',
  'Light blue': '#80d8f5',
  Blue: '#2875d5',
  Purple: '#801ddb',
  Black: '#000',
  'Dark gray': '#333',
  Gray: '#777',
  'Light gray': '#ccc',
  White: '#fff',
};

export default function App() {
  const svgRef = useRef(null);
  const [currentSize, setCurrentSize] = useState(brushSizes['Extra Large']);
  const [currentColor, setCurrentColor] = useState(brushColors.Blue);
  const [path, setPath] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = ({ nativeEvent }) => {
    const { locationX, locationY } = nativeEvent;
    setIsDrawing(true);
    setPath(`M${locationX},${locationY}`);
  };

  const continueDrawing = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { locationX, locationY } = nativeEvent;
    const x = locationX;
    const y = locationY;

    // Append the new point to the existing path
    setPath(prevPath => prevPath + ` L${x},${y}`);
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setPath('');
  };

  const saveCanvas = () => {
    // Implement saving logic for React Native
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbar}>
        <Button title="Save" onPress={saveCanvas} />
        <Button title="Clear" onPress={clearCanvas} />
      </View>
      <View style={styles.toolbar}>
        {Object.entries(brushSizes).map(([sizeName, size]) => (
          <BrushSizeButton
            key={sizeName}
            brushSize={sizeName}
            onPress={() => setCurrentSize(size)}
            isActive={size === currentSize}
          />
        ))}
      </View>
      <View style={styles.toolbar}>
        {Object.entries(brushColors).map(([colorName, color]) => (
          <BrushColorButton
            key={colorName}
            brushColor={colorName}
            color={color} // Pass the color value to the button
            onPress={() => setCurrentColor(color)}
            isActive={color === currentColor}
          />
        ))}
      </View>
      <GestureHandlerRootView style={styles.canvasContainer}>
        <PanGestureHandler
          onGestureEvent={continueDrawing}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.BEGAN) {
              startDrawing({ nativeEvent });
            } else if (nativeEvent.state === State.END) {
              endDrawing();
            }
          }}>
          <Svg ref={svgRef} style={styles.canvas}>
            <Path d={path} fill="none" stroke={currentColor} strokeWidth={currentSize} />
          </Svg>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  canvasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Adjust this value as needed to avoid the notch
  },
  canvas: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
  },
});
