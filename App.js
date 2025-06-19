import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screenek importja
import HomeScreen from './screens/HomeScreen';
import DirectoryView from './screens/DirectoryView';
import AlbumScreen from './screens/AlbumScreen';
import ImageViewerScreen from './screens/ImageViewerScreen';

// Navigátorok
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

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
        return false; // TILTSUK a swipe-ot, ha a viewer aktív!
      }
    }
  }
  return true;
}

// Gallery stack (fő galéria, viewer)
function GalleryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Gallery"
        component={HomeScreen}
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

// Directory stack (albumlista, album tartalma)
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
        <Tab.Navigator
          initialRouteName="GalleryTab"
          screenOptions={({ route, navigation }) => ({
            swipeEnabled: shouldSwipe(route, navigation),
            tabBarShowLabel: false,
            tabBarStyle: { display: 'none' },
          })}
        >
          <Tab.Screen
            name="GalleryTab"
            component={GalleryStack}
            options={{ tabBarLabel: 'Gallery' }}
          />
          <Tab.Screen
            name="DirectoriesTab"
            component={DirectoryStack}
            options={{ tabBarLabel: 'Directories' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
