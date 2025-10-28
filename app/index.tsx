import auth from "@react-native-firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "@react-native-firebase/auth";
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")

  const FirebaseAuth = auth;

  const handleSignUp = async () => {
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });

  }

  useEffect(() => {
    FirebaseAuth.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
      }
    })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#090A0D" }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
        <View style={style.container}>
          <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 32, color: "white" }}>Sign Up using your number or email</Text>
            <View style={{ gap: 12 }}>
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 20, color: "white" }}>Email</Text>
                <TextInput placeholderTextColor={"#2d2d2dff"} onChange={(e) => setEmail(e.nativeEvent.text)} style={style.input} keyboardType='email-address' placeholder='Enter your email.'></TextInput>
              </View>
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 20, color: "white" }}>Password</Text>
                <TextInput placeholderTextColor={"#2d2d2dff"} onChange={(e) => setPassword(e.nativeEvent.text)} style={style.input} placeholder='Enter your password.'></TextInput>
              </View>
            </View>
            <Pressable onPress={() => handleSignUp()} style={{ backgroundColor: "#2E038C", justifyContent: "center", paddingVertical: 12, borderRadius: 8 }}>
              <Text style={{ textAlign: "center", color: "white" }}>Sign up</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 12 }}>
            <View style={{ flex: 1, borderTopWidth: 1.5 }} />
            <Text style={{ fontSize: 20, fontWeight: "500", lineHeight: 28 }}>or</Text>
            <View style={{ flex: 1, borderBottomWidth: 1.5 }} />
          </View>
          <View style={style.buttons}>
            <Pressable style={{ backgroundColor: "#FFFFFF", justifyContent: "center", paddingVertical: 12, borderRadius: 8 }}>
              <Text style={{ textAlign: "center", color: "#3f3f3fff", fontSize: 16 }}>Sign up with Google</Text>
            </Pressable>
            <Pressable style={{ backgroundColor: "#FFFFFF", justifyContent: "center", paddingVertical: 12, borderRadius: 8 }}>
              <Text style={{ textAlign: "center", color: "#3f3f3fff" }}>Sign up with Google</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  )
}

export default SignUp;

const style = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#2d2d2dff',
    borderRadius: 8,
    color: "#808080",
    paddingHorizontal: 12
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center"
  },
  buttons: {
    gap: 12
  }
})