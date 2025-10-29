import auth from "@react-native-firebase/app";
import { createUserWithEmailAndPassword, FirebaseAuthTypes, getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FirebaseFirestore } from "./_layout";
const google = require('@/assets/images/google.png')
const apple = require('@/assets/images/apple.png')

export const FirebaseAuth = auth;

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")

  const requestParams = useLocalSearchParams()

  const handleSignUp = async ({ displayName, phoneNumber }: FirebaseAuthTypes.User) => {
    const cred = createUserWithEmailAndPassword(getAuth(), email, password)

    const uid = (await cred).user.uid

    //storing user to database.
    FirebaseFirestore.collection("users").doc(uid).set({
      displayName: "ryan",
      email: email,
      phoneNumber: "0730058434"
    })


    setEmail("")
    setPassword("")
  }
  const handleLogin = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#19191bff" }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
        {
          requestParams.login &&
          <View style={style.container}>
            <View style={{ gap: 16 }}>
              <Text style={{ fontSize: 32, color: "white" }}>Log In using your email and password</Text>
              <View style={{ gap: 12 }}>
                <View style={{ gap: 8 }}>
                  <Text style={{ fontSize: 20, color: "white" }}>Email</Text>
                  <TextInput placeholderTextColor={"#2d2d2dff"} value={email} onChange={(e) => setEmail(e.nativeEvent.text)} style={style.input} keyboardType='email-address' placeholder='Enter your email.'></TextInput>
                </View>
                <View style={{ gap: 8 }}>
                  <Text style={{ fontSize: 20, color: "white" }}>Password</Text>
                  <TextInput placeholderTextColor={"#2d2d2dff"} value={password} onChange={(e) => setPassword(e.nativeEvent.text)} style={style.input} placeholder='Enter your password.'></TextInput>
                </View>
              </View>
              <Pressable onPress={() => handleLogin()} style={{ backgroundColor: "#2E038C", justifyContent: "center", paddingVertical: 12, borderRadius: 8 }}>
                <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>Sign In</Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 12 }}>
              <View style={{ flex: 1, borderTopWidth: 1.5, borderColor: "#e1e1e1ff" }} />
              <Text style={{ fontSize: 24, fontWeight: "500", lineHeight: 28, color: "#808080" }}>or</Text>
              <View style={{ flex: 1, borderBottomWidth: 1.5, borderColor: "#e1e1e1ff" }} />
            </View>
            <View style={style.buttons}>
              <Pressable style={{ backgroundColor: "#FFFFFF", justifyContent: "center", padding: 8, borderRadius: 50, height: 50, width: 50 }}>
                <Image source={google} style={{ height: "100%", width: "100%" }} />
              </Pressable>
              <Pressable style={{ backgroundColor: "#FFFFFF", justifyContent: "center", padding: 8, borderRadius: 50, height: 50, width: 50 }}>
                <Image source={apple} style={{ height: "100%", width: "100%" }} />
              </Pressable>
            </View>
          </View>
        }
      </KeyboardAvoidingView>
    </SafeAreaView >
  )
}

export default SignUp;

const style = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#2d2d2dff",
    borderRadius: 8,
    color: "#808080",
    paddingHorizontal: 12,
    backgroundColor: "#e1e1e1ff",
    fontSize: 16
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    gap: 24
  },
  buttons: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
})

function firestore() {
  throw new Error("Function not implemented.");
}
