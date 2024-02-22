export const getTouchPosition = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    return [locationX, locationY];
  };
  