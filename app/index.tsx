import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const logo = require('@/assets/images/linkedin.png')
function index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#19191bff", paddingHorizontal: 16 }}>
      <View style={{ flex: 1.5, justifyContent: "flex-end", alignItems: "center" }}>
        <View style={{ height: 200, width: 200 }}>
          <Image source={logo} style={{ height: "100%", width: "100%" }} />
        </View>
      </View>
      <View style={{ justifyContent: "flex-end", flex: 1, paddingVertical: 16, gap: 16 }}>
        <Pressable onPress={() => {
          router.navigate({
            pathname: "/signOn",
            params: {
              login: 1
            }
          });
        }}
          style={{ backgroundColor: "#2E038C", justifyContent: "center", paddingVertical: 12, borderRadius: 8 }}
        >
          <Text style={{ textAlign: "center", color: "#ffff", fontSize: 20 }}>Login</Text>
        </Pressable>
        <Pressable onPress={() => {
          router.navigate("/signOn");
        }} style={{ justifyContent: "center", paddingVertical: 12, borderRadius: 8 }}><Text style={{ textAlign: "center", color: "#ffff", fontSize: 20 }}>SignUp</Text></Pressable>
      </View>
    </SafeAreaView>
  )
}

export default index