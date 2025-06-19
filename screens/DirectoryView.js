import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import globalStyles from '../styles/globalStyles';
import AlbumScreen from './AlbumScreen';

const IMAGE_SIZE = (Dimensions.get('window').width / 2 - 24) / 2; // 2 kép/sor, padding

export default function DirectoryView({ navigation }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) return;

    // Lekérjük az összes albumot, csak képeket tartalmazókat
    const albumList = await MediaLibrary.getAlbumsAsync();

    // Lekérjük mindegyikhez az első 4 képet
    const albumsWithPhotos = await Promise.all(
      albumList.map(async (album) => {
        const assets = await MediaLibrary.getAssetsAsync({
          album: album.id,
          mediaType: ['photo'],
          first: 4,
          sortBy: 'modificationTime',
        });
        return { ...album, photos: assets.assets };
      })
    );

    // Csak olyan albumokat mutassunk, ahol legalább 1 kép van
    setAlbums(albumsWithPhotos.filter(a => a.photos.length > 0));
  };

  const renderAlbum = ({ item }) => (
    <TouchableOpacity
      style={globalStyles.albumContainer}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Album', { album: item })}
    >
      <View style={globalStyles.photoGrid}>
        {[0, 1, 2, 3].map((idx) =>
          item.photos[idx]?.uri ? (
            <Image
              key={item.photos[idx].id}
              source={item.photos[idx].uri}
              style={globalStyles.imageThumb}
              contentFit="cover"
            />
          ) : (
            <View
              key={idx}
              style={[
                globalStyles.imageThumb,
                { backgroundColor: '#222', opacity: 0.2 }
              ]}
            />
          )
        )}
      </View>
      <Text style={globalStyles.albumTitle} numberOfLines={1}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.simpleBackground}>
      <Text style={globalStyles.pageTitle}>Albums</Text>
      <FlatList
        data={albums}
        keyExtractor={item => item.id}
        renderItem={renderAlbum}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
}
