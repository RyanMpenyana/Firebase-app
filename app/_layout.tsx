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

export const FirebaseFirestore = firestore()

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [initializing, setInitializing] = useState(true)

  const users = FirebaseFirestore.collection("users");

  const getUsers = async () => {
    const docSnap = (await users.get()).docs;
    console.log(docSnap)
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), (user) => {
      setUser(user)
      if (initializing) setInitializing(false)
    })
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
