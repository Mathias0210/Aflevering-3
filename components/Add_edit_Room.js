import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const Add_edit_Room = ({navigation,route}) => {

    //Foreløbige attributter, skal udvides
    const initialState = {
        by: '',
        postnr: '',
        kvm2: '',
        pris: '',
        rumtype: "",
    }

    const [newRoom,setNewRoom] = useState(initialState);

    /*Returnere true, hvis vi er på edit list*/
    const isEditRoom = route.name === "Edit Room";

    useEffect(() => {
        if(isEditRoom){
            const room = route.params.room[1];
            setNewRoom(room)
        }
        /*Data sættes til initialState dvs. data fjernes*/
        return () => {
            setNewRoom(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewRoom({...newRoom, [name]: event});
    }

    //funktion der håndterer lagring
    const handleSave = () => {

        const { by, postnr, kvm2, pris, rumtype } = newRoom;

        if(by.length === 0 || postnr.length === 0 || kvm2.length === 0 || pris.length === 0 || rumtype.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditRoom){
            const id = route.params.room[0];
            try {
                firebase
                    .database()
                    .ref(`/Rooms/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ by, postnr, kvm2, pris, rumtype });
                // Når bilen er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const room = [id,newRoom]
                navigation.navigate("Room Details",{room});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            //pusher det nyligt opdaterede data i firebase
            try {
                firebase
                    .database()
                    .ref('/Rooms/')
                    .push({ by, postnr, kvm2, pris, rumtype });
                Alert.alert(`Saved`);
                setNewRoom(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newRoom[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit list, vis save changes i stedet for add room*/}
                <Button title={ isEditRoom ? "Save changes" : "Add room"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Room;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});
