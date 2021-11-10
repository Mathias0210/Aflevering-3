
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const ListingDetails = ({route,navigation}) => {
    const [room,setRooms] = useState({});

    useEffect(() => {
        /*Henter room values og sætter dem*/
        setRooms(route.params.room[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setRooms({})
        }
    });

    const handleEdit = () => {
        // navigerer videre til EditRoom og sender rummet med
        const room = route.params.room
        navigation.navigate('Edit Room', { room });
    };

    // Pop-up for at brugeren kan bekræfte slettelse
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the room?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Sletter rummet man er inde på
    const  handleDelete = () => {
        const id = route.params.room[0];
        try {
            firebase
                .database()
                // Rummets ID benyttes for at finde det i firebase
                .ref(`/Rooms/${id}`)
                // fjerner data fra Rooms-stien
                .remove();
            // Returnerer
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    //Evalueres room til false findes der intet data endnu
    if (!room) {
        return <Text>No data</Text>;
    }

    //Fremviser edit og delete knapper
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                //
                Object.entries(room).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores room keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores room values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default ListingDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});
