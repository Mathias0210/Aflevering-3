import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import UdlejerSide from "../Screens/UdlejerSide";
import LejerSide from "../Screens/LejerSide";
import MapPage from "../components/MapPage";
import ListingDetails from "../components/ListingDetails";
import Add_edit_Room from "../components/Add_edit_Room";
import CameraScreen from "../Screens/CameraScreen";
import ImageScreen from "../Screens/ImageScreen";

//Her instantieres en StackNavigator.
const Stack = createStackNavigator();

//Stacknavigatoren sørger for at holde styr på de forskellige views/screens og navigation imellem
// Der startes på lejerside
// stack.screen indeholder alle muligheder for navigation på alle sider inkl. tab. navigation og knapper
function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="LejerSide">
      <Stack.Screen name="LejerSide" component={LejerSide}></Stack.Screen>
      <Stack.Screen name="Map" component={MapPage}></Stack.Screen>
      <Stack.Screen name="UdlejerSide" component={UdlejerSide}></Stack.Screen>
      <Stack.Screen
        name="Room Details"
        component={ListingDetails}
      ></Stack.Screen>
      <Stack.Screen name="Edit Room" component={Add_edit_Room}></Stack.Screen>
      <Stack.Screen
        name="Kamera"
        component={CameraScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen name="image" component={ImageScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default StackNavigator;
