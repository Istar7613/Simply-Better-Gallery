import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import globalStyles from '../styles/globalStyles';

export default function AlbumScreen({ route, navigation }) {
  const { album } = route.params;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const assets = await MediaLibrary.getAssetsAsync({
      album: album.id,
      mediaType: ['photo'],
      sortBy: 'modificationTime',
      first: 2000,
    });
    const validAssets = assets.assets.filter(
      (item) =>
        typeof item.modificationTime === 'number' &&
        item.modificationTime > 1000000000
    );
    setPhotos(validAssets);
  };

  const renderPhoto = ({ item, index }) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('Image Viewer', {
                image: item.uri,
                allPhotos: photos,
                startIndex: index,
                })
            }
            key={item.id}
            activeOpacity={0.85}
        >
            <Image
                source={item.uri}
                style={globalStyles.mainImage}
                contentFit="cover"
            />
        </TouchableOpacity>
    );
    
    return (
        <View style={globalStyles.simpleBackground}>
            <TouchableOpacity style={globalStyles.buttonContainer} onPress={() => navigation.goBack()}>
                <Text style={globalStyles.buttonText}>{'<'}</Text>
            </TouchableOpacity>
            <View style={globalStyles.titleCon}>
                <Text style={globalStyles.pageTitle}>{album.title}</Text>
            </View>
            <FlatList
                data={photos}
                keyExtractor={(item) => item.id}
                renderItem={renderPhoto}
                numColumns={3}
                initialNumToRender={12}
                maxToRenderPerBatch={12}
                windowSize={5}
                removeClippedSubviews={true}
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
