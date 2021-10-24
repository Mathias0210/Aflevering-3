import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import firebase from "firebase/compat";

const navController = (navigation, route) => {navigation.navigate(route)}
/*
*ScreenOne er den ene af de tre screens i StackNavigatoren
* ScreenOne præsenterer en tekst, der beskriver, hvor brugeren befinder sig samt
* returnerer to <Button/>, som benyttes til henholdsvis at navigere tilbage til sidste Screen og
* navigere ind til den anden screen i stackComponents
* Slutteligt er der inkluderet styling til komponenterne
 */
function LejerSide({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Tekst</Text>
            <Button title="Find lejemål i dit område" onPress={()=>navController(navigation,"Map")}></Button>
            <Button title="Se en liste af lejemål" onPress={()=>navController(navigation,"UdlejerSide")}></Button>
        </View>
    );

}


//Eksport af Screen således den kan importeres- og bruges i andres komponenter
export default LejerSide


//Lokal styling til brug i ScreenOne
const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
    map: { flex: 1 },
    infoBox: {
        height: 200,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    infoText: {
        fontSize: 15,
    },
});