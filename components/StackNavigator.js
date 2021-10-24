import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import UdlejerSide from "./StackComponent/UdlejerSide";
import LejerSide from "./StackComponent/LejerSide";
import MapPage from "./MapPage";
import ListingDetails from "./ListingDetails";

//Her instantieres en StackNavigator.
const Stack = createStackNavigator()

/*
* I return() placeres en Stack.Navigator komponent, som i 'initialRoutName' henviser til DetailsScreen.
* Dernæst fastsættes tre Screens i Stacken. Disse er DetailsScreen, ScreenOne og ScreenTwo
* Hver Screen har individuel Styling qf den fremviste header.
 */
function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="LejerSide">
            <Stack.Screen name="LejerSide" component={LejerSide}></Stack.Screen>
            <Stack.Screen name="Map" component={MapPage}></Stack.Screen>
            <Stack.Screen name="UdlejerSide" component={UdlejerSide}></Stack.Screen>
            <Stack.Screen name="Listing Details" component={ListingDetails}></Stack.Screen>
        </Stack.Navigator>
    )
}

//Eksport af den funktionelle komponent, således den kan importeres i andre komponenter
export default StackNavigator