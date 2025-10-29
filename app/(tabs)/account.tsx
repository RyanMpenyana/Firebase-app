import { getAuth, signOut } from '@react-native-firebase/auth';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Account() {
  const handleSignOut = () => {
    signOut(getAuth()).then(() => console.log('user logged Out!'))
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable onPress={() => handleSignOut()}>
        <Text>Log out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
