import * as React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import firebase from "firebase/compat";
import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Add_edit_Room from "../components/Add_edit_Room";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const navController = (navigation, route) => {
  navigation.navigate(route);
};

const UdlejerSide = ({ navigation }) => {
  const [rooms, setRooms] = useState();

  useEffect(() => {
    if (!rooms) {
      firebase
        .database()
        //Kan kun få det til at fungere med Lists som ref
        .ref("/Rooms")
        .on("value", (snapshot) => {
          setRooms(snapshot.val());
        });
    }
  }, []);

  // Vi viser ingenting hvis der ikke er data
  if (!rooms) {
    return <Text>Ingen rum ledige nær dig</Text>;
  }

  const handleSelectList = (id) => {
    /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
    const room = Object.entries(rooms).find((room) => room[0] === id /*id*/);
    navigation.navigate("Room Details", { room });
  };

  // Flatlist forventer et array. Derfor tager vi alle values fra vores rooms objekt, og bruger som array til listen
  const listArray = Object.values(rooms);
  const roomKeys = Object.keys(rooms);

  return (
    <FlatList
      data={listArray}
      // Vi bruger roomKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til ListListItem
      keyExtractor={(item, index) => roomKeys[index]}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => handleSelectList(roomKeys[index])}
          >
            <Text>
              {item.by} {item.rumtype} {item.pris} DKK/md
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
//Eksport af Screen således den kan importeres- og bruges i andres komponenter
export default UdlejerSide;

//Lokal styling til brug i ScreenTwo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    height: 50,
    justifyContent: "center",
    backgroundColor: "#fffafa",
  },
  label: { fontWeight: "bold" },
});
