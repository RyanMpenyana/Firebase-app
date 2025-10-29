import { useColorScheme } from '@/hooks/use-color-scheme';
import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [initializing, setInitializing] = useState(true)
  const docRef = firestore().doc('users/nbuvuuUl1AfYkff2pIQK');

  const displayData = async () => {
    const docSnap = await docRef.get();

    if (docSnap) {
      console.log('User data:', docSnap.data());
    } else {
      console.log('No such user.');
    }

  }

  useEffect(() => {
    displayData()
    const subscriber = onAuthStateChanged(getAuth(), (user) => {
      setUser(user)
      if (initializing) setInitializing(false)
    })
    console.log("user:", user)
    return subscriber
  }, [])

  if (initializing) return null;
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Protected guard={user !== null}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack.Protected>
        <Stack.Protected guard={user === null}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signOn" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider >
  );
}
