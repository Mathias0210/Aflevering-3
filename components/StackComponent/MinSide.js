import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import firebase from "firebase/compat";

/*
*ScreenOne er den ene af de tre screens i StackNavigatoren
* ScreenOne præsenterer en tekst, der beskriver, hvor brugeren befinder sig samt
* returnerer to <Button/>, som benyttes til henholdsvis at navigere tilbage til sidste Screen og
* navigere ind til den anden screen i stackComponents
* Slutteligt er der inkluderet styling til komponenterne
 */
function MinSide({prop}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{prop}</Text>
            <Text>Din Mail: {firebase.auth().currentUser.email}</Text>
        </View>
    );
}
//Eksport af Screen således den kan importeres- og bruges i andres komponenter
export default MinSide


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
});