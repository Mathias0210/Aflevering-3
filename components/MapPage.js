import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {Accuracy} from "expo-location";
import {useState, useEffect} from "react";

function MapPage() {

    //Her instantieres alle anvendte statevariabler
    const [hasLocationPermission, setlocationPermission] = useState(false)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [userMarkerCoordinates, setUserMarkerCoordinates] = useState([])
    const [selectedCoordinate, setSelectedCoordinate] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)


    //Der er importeret Location fra pakken expo-location
    //Her benyttes en prædefineret metode fra denne pakke som anmoder om tilladelse til at bruge enheds lokation
    //Resultatet benyttes til at sette hasLocationPermission til item.granted
    const getLocationPermission = async () => {
        await Location.requestForegroundPermissionsAsync().then((item)=>{
            setlocationPermission(item.granted)
        } );

    };


    // Når appen startes kaldes getLocationPermission for at sikre at enheden spørger om tilladelse til lokation
    useEffect (() => {
        const response = getLocationPermission()
    });


    //Igen kaldes en prædefineret metode fra expo-location, denne gang for at finde enhedens aktuelle lokation
    //currentPosition sættes til item.coords
    const updateLocation = async () => {
        await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced}).then((item)=>{
            setCurrentLocation(item.coords)
        } );
    };


    // Metoden benyttes i mapView til at sætte en markør ved et længerevarende tryk på skærmen
    // En konstant sættes ud fra en event der indeholder koordinater
    // Denne konstant gemmes derefter i et array af koordinater
    const handleLongPress = event => {
        const coordinate = event.nativeEvent.coordinate
        setUserMarkerCoordinates((oldArray) => [...oldArray, coordinate])
    };


    // Metoden her benytter koorinater som et argument i funktionen
    // SetelectedCoordinate funktionen sættes til coordinate og derefter omsættes coordinate vha.
    // Prædefineret metode til at hente data om koordinatet så det kan vises når man trykker
    const handleSelectMarker = async coordinate =>{
        setSelectedCoordinate(coordinate)
        await Location.reverseGeocodeAsync(coordinate).then((data) => {
                setSelectedAddress(data)
            }
        )
    };


    //closeInfoBox sætter selectedAddress og selectedCoordinate til null
    const closeInfoBox = () =>
        setSelectedCoordinate(null) && setSelectedAddress(null)


    //Metoden her tager props som argument og if statements evaluerer derefter forløbet
    // Såfremt alt er OK, fremvises en knap der kalder updateLocation og fremviser enhednes nuærende lokation
    const RenderCurrentLocation = (props) => {

        if (props.hasLocationPermission === null) {
            return null;
        }
        if (props.hasLocationPermission === false) {
            return <Text>No location access. Go to settings to change</Text>;
        }
        return (
            <View>
                <Button style title="update location" onPress={updateLocation} />
                {currentLocation && (
                    <Text>
                        {`lat: ${currentLocation.latitude},\nLong:${
                            currentLocation.longitude
                        }\nacc: ${currentLocation.accuracy}`}
                    </Text>
                )}
            </View>
        );
    };

//Slutteligt benyttes SafeAreaView der sikrer at indholdet ikke overskrider grænser for enheden(Kun for IOS enheder version 11 eller nyere )
    /*
    * Dernæst kaldes RenderCurrenokation view
    * Mapview er fremviser et kort, der viser brugerens lokation
    * Dernæst aktiverer metoden handleLongPress igennem onLongPress
    * I Mapview vises tre markører ud fra vilkårlige koordinatsæt. Hver markør får en titel og en beskrivelse
    * Derudover vil alle koordinatsæt i userMarkerCoordinates blive vist som markører på kortet.
    * For hver af markørerne vil metoden handleSelectMarker blive aktiveret ved onPress,
    * hvorved selectedCoordinate og selectedAddres får en værdi og der udskrives data om den vaælgte markør
    *
    */

    // Safeareaview: https://reactnative.dev/docs/safeareaview
    // safeareaview bruges til at neste en del komponenter, renderCurrentLocation buges til at vise den blå "prik" med enheds lokation
    // Mapview generer et map vha. attributterne der er udfyldt
    //Derudover der der hardcoded 3 markers som på sigt kan bygges sammen med resten af appens funktioner
    {
        return (
            <SafeAreaView style={styles.container}>
                <RenderCurrentLocation props={{hasLocationPermission: hasLocationPermission, currentLocation: currentLocation}} />
                <MapView
                    provider="google"
                    style={styles.map}
                    showsUserLocation
                    onLongPress={handleLongPress}>
                    <Marker
                        coordinate={{ latitude: 55.67287733975346, longitude: 12.619213349095386 }}
                        title="Sportsklub"
                        description="Kælderrum"
                    />
                    <Marker
                        coordinate={{ latitude: 55.65173596100685, longitude: 12.561854340423828 }}
                        title="Nokken"
                        description="Loft"
                    />
                    <Marker
                        coordinate={{ latitude: 55.65941276824648, longitude: 12.604998158773094 }}
                        title="Garage på Amagerbro"
                        description="Garage"
                    />
                    {userMarkerCoordinates.map((coordinate, index) => (
                        <Marker
                            coordinate={coordinate}
                            key={index.toString()}
                            onPress={() => handleSelectMarker(coordinate)}
                        />
                    ))}
                </MapView>
                {selectedCoordinate && selectedAddress && (
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            {selectedCoordinate.latitude}, {selectedCoordinate.longitude}
                        </Text>
                        <Text style={styles.infoText}>
                            name: {selectedAddress[0].name}  region: {selectedAddress[0].region}
                        </Text>
                        <Button title="close" onPress={closeInfoBox} />
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

export default MapPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
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