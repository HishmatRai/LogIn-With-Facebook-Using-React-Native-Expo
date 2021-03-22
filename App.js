import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
export default function App() {
  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '3896414270435436',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles._facebook_btn}
        onPress={logIn}>
        <FontAwesome5 name="facebook-f" size={24} color="white" />
        <Text style={styles._facebook_btn_text}>Login with Facebook</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  _facebook_btn: {
    flexDirection: "row",
    backgroundColor: "#367FC0",
    width: "90%",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  _facebook_btn_text: {
    color: "white",
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    letterSpacing: 1
  }
});
