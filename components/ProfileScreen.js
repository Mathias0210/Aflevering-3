import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import StackNavigator from "./StackNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import MinSide from "./StackComponent/MinSide";
import Add_edit_Room from "./Add_edit_Room";

const Tab =createBottomTabNavigator()


const MinSideTekst = "Dette er informationer om din bruger"

function ProfileScreen () {



    //Hvis der ikke kan fremfindes data returneres blot en lille tekst
    //Dette bør dog ikke ske da der er lavet fejlhåndtering i loginForm.js
    if (!firebase.auth().currentUser) {
        return <View><Text>No users found</Text></View>;
    }

    //her returneres "startsiden" som brugeren præsenteres for i form af en navigationcontainer der indeholder
    // en tab navigator der er linket op til forskellige screens på stinavn

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
                <Tab.Screen name={'Bliv Udlejer'} component={Add_edit_Room}/>
                <Tab.Screen name="Min Side" children={()=><MinSide prop={MinSideTekst}/>}/>
            </Tab.Navigator>
        </NavigationContainer>
    );

}

export default ProfileScreen

//ikke benyttet styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});