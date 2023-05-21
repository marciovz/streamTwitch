import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components/native';
import * as Font from 'expo-font';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';

import { AuthProvider } from './src/hooks/useAuth';
import { Routes } from './src/routes';
import theme from './src/styles/theme';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  useEffect(() => {
    async function initApp() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          DMSans_400Regular,
          DMSans_700Bold
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    initApp();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{flex: 1}}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <StatusBar style="light" backgroundColor="transparent" translucent />
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
