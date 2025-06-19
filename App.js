import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import DirectoryView from './screens/DirectoryView';
import AlbumScreen from './screens/AlbumScreen';
import ImageViewerScreen from './screens/ImageViewerScreen';
import Options from './screens/Options';

const MainTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const GalleryTab = createMaterialTopTabNavigator();

function shouldSwipe(route, navigation) {
  const state = navigation.getState();
  if (
    route.name === 'GalleryTab' &&
    state.routes
  ) {
    const galleryTabRoute = state.routes.find(r => r.name === 'GalleryTab');
    if (galleryTabRoute?.state?.routes) {
      const lastScreen = galleryTabRoute.state.routes[galleryTabRoute.state.routes.length - 1];
      if (lastScreen.name === 'Image Viewer') {
        return false;
      }
    }
  }
  return true;
}

function GalleryWithOptionsTab() {
  return (
    <GalleryTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        swipeEnabled: true,
        tabBarShowLabel: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <GalleryTab.Screen name="Options" component={Options} />
      <GalleryTab.Screen name="Home" component={HomeScreen} />
    </GalleryTab.Navigator>
  );
}

function GalleryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GalleryWithOptions"
        component={GalleryWithOptionsTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Image Viewer"
        component={ImageViewerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function DirectoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Directories"
        component={DirectoryView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Album"
        component={AlbumScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Image Viewer"
        component={ImageViewerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
      <NavigationContainer>
        <MainTab.Navigator
          initialRouteName="GalleryTab"
          screenOptions={({ route, navigation }) => ({
            swipeEnabled: shouldSwipe(route, navigation),
            tabBarShowLabel: false,
            tabBarStyle: { display: 'none' },
          })}
        >
          <MainTab.Screen
            name="GalleryTab"
            component={GalleryStack}
            options={{ tabBarLabel: 'Gallery' }}
          />
          <MainTab.Screen
            name="DirectoriesTab"
            component={DirectoryStack}
            options={{ tabBarLabel: 'Directories' }}
          />
        </MainTab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
