import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';


export default function Welcome({ navigation }) {


//Welcome
    const pressHandler = async () => {
        navigation.navigate('Login');
        // await schedulePushNotification();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>STARdy</Text>
                <TouchableOpacity style={styles.button} onPress={pressHandler} activeOpacity={0.5} testID="welcomeButton">
                    <Text style={styles.buttonText}>Start Today</Text>
                </TouchableOpacity>
            <Image source={require('../../assets/star-icon.png')} style={styles.image} />
        </View>
    );
}
//Welcome
  

const styles=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#eef1e1',
        alignItems: 'center',
    },
    titleText: {
        color: '#007788',
        fontFamily: 'PressStart',
        fontSize: 42,
        position: 'absolute',
        top: '30%'        
    }, 
    button: {
        padding: 10,
        backgroundColor: '#007788',
        //position: 'absolute', // absolute causes touchable opacity to not work in android!!
        marginTop: 520,
        borderRadius: 15
    },
    buttonText: {
        fontSize: 22,
        fontFamily: 'RowdiesRegular',
        color: '#f6f6f6'
    }, 
    image: {
        width: 160,
        height: 160,
        position: 'absolute',
        top: '40%'
    }
})
    