import { Button, StyleSheet, Text, View, Image } from "react-native";
import * as React from "react";
import { useEffect, useState } from "react";
import firebase from "firebase/compat";
import FormButton from "../components/FormButton";

const navController = (navigation, route) => {
  navigation.navigate(route);
};
/*
 *ScreenOne er den ene af de tre screens i StackNavigatoren
 * ScreenOne præsenterer en tekst, der beskriver, hvor brugeren befinder sig samt
 * returnerer to <Button/>, som benyttes til henholdsvis at navigere tilbage til sidste Screen og
 * navigere ind til den anden screen i stackComponents
 * Slutteligt er der inkluderet styling til komponenterne
 */
function LejerSide({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/output-onlinepngtools.png")} />
      <Text style={styles.text}>Find opbevaring idag!</Text>

      <Button
        style={styles.ButtonS}
        color="#000000"
        title="Find lejemål i dit område"
        onPress={() => navController(navigation, "Map")}
      ></Button>
      {/* Mellemrum mellem knapperne */}
      <Text></Text>
      <Button
        color="#000000"
        title="Se en liste af lejemål"
        onPress={() => navController(navigation, "UdlejerSide")}
      ></Button>
    </View>
  );
}

//Eksport af Screen således den kan importeres- og bruges i andres komponenter
export default LejerSide;

//Lokal styling til brug i ScreenOne
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffafa",
  },
  text: {
    fontSize: 20,
    height: 100,
    marginBottom: 200,
    color: "#6495ed",
  },
  map: { flex: 1 },
  infoBox: {
    height: 200,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  infoText: {
    fontSize: 15,
  },
  ButtonS: {
    height: 50,
    width: 20,
    marginVertical: 10,
    marginBottom: 20,
  },
});
