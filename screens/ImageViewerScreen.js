import React, { useRef, useEffect } from 'react';
import { View, Dimensions, FlatList } from 'react-native';
import { Image } from 'expo-image';
import globalStyles from '../styles/globalStyles';

export default function ImageViewerScreen({ route }) {
  const { allPhotos, startIndex = 0 } = route.params || {};
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && startIndex > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({ index: startIndex, animated: false });
      }, 10);
    }
  }, [startIndex]);

  const renderImage = ({ item }) => (
    <View style={globalStyles.ImageViewContainer}>
      <Image
        source={{ uri: item.uri || item }}
        style={globalStyles.ImageView}
        contentFit="contain"
      />
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={allPhotos}
      keyExtractor={item => item.id || item}
      renderItem={renderImage}
      horizontal
      pagingEnabled
      initialNumToRender={1}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        length: Dimensions.get('window').width,
        offset: Dimensions.get('window').width * index,
        index,
      })}
    />
  );
}
