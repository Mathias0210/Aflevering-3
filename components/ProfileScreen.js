import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import StackNavigator from "./StackNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import LejerSide from "./StackComponent/LejerSide";
import UdlejerSide from "./StackComponent/UdlejerSide";
import MinSide from "./StackComponent/MinSide";
import Add_edit_Listing from "./Add_Edit_Listing";

const Tab =createBottomTabNavigator()

const lejerTekst = "Find plads i dit område"
const udlejerTekst = "Lej din opbevaringsplads ud"
const MinSideTekst = "Dette er informationer om din bruger"

function ProfileScreen () {

    //handleLogout håndterer log ud af en aktiv bruger.
    //Metoden er en prædefineret metode, som firebase stiller tilrådighed
    //Metoden er et asynkrontkald.
    const handleLogOut = async () => {
        await firebase.auth().signOut();
    };

    //Hvis der af en eller anden grund ikke skulle være muligt at fremfinde den aktive bruger,
    //skal der udprintes en besked om dette igennem en tekstkomponent
    if (!firebase.auth().currentUser) {
        return <View><Text>Not found</Text></View>;
    }

    //I return() udnyttes en prædefineret metode, som firebase stiller til rådighed.
    // Metoden returnerer mailadressen af den aktive bruger.
    // Mailadressen udskrives ved brug af en tekstkomponent.
    //Her kan man returnere en velkomst skærm til en bruger der er logget ind
    //Indsæt komponenter til lejer og udlejer
    /*
    return (

        <View style={styles.container} >
            <Text>Current user: {firebase.auth().currentUser.email}</Text>
            <Button onPress={() => handleLogOut()} title="Log out" />
        </View>

         */
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Min Side') {
                        return (
                            <Ionicons
                                name={'md-settings-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Bliv Udlejer') {
                        return (
                            <Ionicons
                                name='home-outline'
                                size={size}
                                color={color}
                            />
                        );
                    }
                    else{
                        return (
                            <Ionicons
                                name='md-list-outline'
                                size={size}
                                color={color}
                            />
                        );
                    }
                },
            })}
                           tabBarOptions={{
                               activeTintColor: 'blue',
                               inactiveTintColor: 'gray',
                           }}
            >
                <Tab.Screen name="Lejer" component={StackNavigator}/>
                <Tab.Screen name={'Bliv Udlejer'} component={Add_edit_Listing}/>
                <Tab.Screen name="Min Side" children={()=><MinSide prop={MinSideTekst}/>}/>
            </Tab.Navigator>
        </NavigationContainer>
    );

}

//Lokal styling til brug i ProfileScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});

//Eksport af Loginform, således denne kan importeres og benyttes i andre komponenter
export default ProfileScreen
