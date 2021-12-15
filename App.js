import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import SignUpForm from "./components/SignUpForm";
import firebase from "firebase/compat";
import LoginForm from "./components/LoginForm";
import ProfileScreen from "./Screens/ProfileScreen";
import { Card } from "react-native-paper";

import LejerSide from "./Screens/LejerSide";
import UdlejerSide from "./Screens/UdlejerSide";

// Herunder foregår konfiguration til firebase. .
const firebaseConfig = {
  apiKey: "AIzaSyBDEX-IxvQmrb11z8B5SsynOZx823Ns1QA",
  authDomain: "aflevering-29aff.firebaseapp.com",
  databaseURL:
    "https://aflevering-29aff-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "aflevering-29aff",
  storageBucket: "aflevering-29aff.appspot.com",
  messagingSenderId: "992291674826",
  appId: "1:992291674826:web:25bb7137233cb2eba9b233",
};

export default function App() {
  //Her oprettes bruger state variblen
  const [user, setUser] = useState({ loggedIn: false });

  //Koden sikrer at kun én Firebase initieres under brug af appen.
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //onAuthstatechanged er en prædefineret metode, forsynet af firebase, som konstant observerer brugerens status (logget ind vs logget ud)
  //Pba. brugerens status foretages et callback i form af setUSer metoden, som håndterer user-state variablens status.
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback({ loggedIn: true, user: user });
      } else {
        callback({ loggedIn: false });
      }
    });
  }

  //Heri aktiverer vi vores listener i form af onAuthStateChanged, så vi dynamisk observerer om brugeren er aktiv eller ej.
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  //Her oprettes gæstekomponentsindhold, der udgøres af sign-up og login siderne
  const GuestPage = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Opret eller Login med din firebase Email
        </Text>

        <Card style={{ padding: 20 }}>
          <SignUpForm />
        </Card>

        <Card style={{ padding: 20 }}>
          <LoginForm />
        </Card>
      </View>
    );
  };

  //Ternary operation, hvis user er logget ind ser vi profile screen og ellers så guestpage
  return user.loggedIn ? <ProfileScreen /> : <GuestPage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: "5%",
    backgroundColor: "transparent",
    padding: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
