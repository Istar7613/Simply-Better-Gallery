import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import globalStyles from '../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  const [allPhotos, setAllPhotos] = useState([]);
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    } else {
      loadPhotos();
    }
  }, [permission]);

  const loadPhotos = async () => {
    const assets = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo'],
      first: 1000,
      sortBy: 'modificationTime',
    });

    const validAssets = assets.assets.filter(
      (item) =>
        typeof item.modificationTime === 'number' &&
        item.modificationTime > 1000000000
    );

    // Optional: sort newest first
    const sorted = validAssets.sort(
      (a, b) => b.modificationTime - a.modificationTime
    );

    setAllPhotos(sorted);
  };

  const renderPhoto = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Image Viewer', {
          image: item.uri,
          allPhotos,         // teljes képlista
          startIndex: index, // ez a jelenlegi kép indexe a listában
        })
      }
      key={item.id}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: item.uri }}
        style={globalStyles.mainImage}
        contentFit="cover"
        transition={200}
      />
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.simpleBackground}>
      <Text style={globalStyles.pageTitle}>Gallery</Text>
      <FlatList
        data={allPhotos}
        keyExtractor={(item) => item.id}
        renderItem={renderPhoto}
        numColumns={3}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={5}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>
            No photos found.
          </Text>
        }
      />
    </View>
  );
}