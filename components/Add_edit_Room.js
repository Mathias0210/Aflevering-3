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

const Add_edit_Listing = ({navigation,route}) => {

    const initialState = {
        by: '',
        postnr: '',
        kvm2: '',
        pris: ''
    }

    const [newList,setNewList] = useState(initialState);

    /*Returnere true, hvis vi er på edit list*/
    const isEditList = route.name === "Edit List";

    useEffect(() => {
        if(isEditList){
            const list = route.params.list[1];
            setNewList(list)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewList(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewList({...newList, [name]: event});
    }

    const handleSave = () => {

        const { by, postnr, kvm2, pris } = newList;

        if(by.length === 0 || postnr.length === 0 || kvm2.length === 0 || pris.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditList){
            const id = route.params.list[0];
            try {
                firebase
                    .database()
                    .ref(`/Lists/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ by, post: postnr, kvm2, pris });
                // Når bilen er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const list = [id,newList]
                navigation.navigate("Listing Details",{list});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            try {
                firebase
                    .database()
                    .ref('/Lists/')
                    .push({ by, post: postnr, kvm2, pris });
                Alert.alert(`Saved`);
                setNewList(initialState)
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
                                    value={newList[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit list, vis save changes i stedet for add list*/}
                <Button title={ isEditList ? "Save changes" : "Add list"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Listing;

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
