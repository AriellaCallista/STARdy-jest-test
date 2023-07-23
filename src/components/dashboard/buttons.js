import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Alert, TouchableOpacity } from 'react-native'

import { Entypo } from '@expo/vector-icons'

export default function Buttons({ navigation }) {

    const toDo = () => {
        navigation.navigate('To Do List');
    }
    
    const notes = () => {
        navigation.navigate('Notes');
    }
    
    const encouragement = () => {
        navigation.navigate('Encouragement Notes!');
    }
    

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toDo} testID='toDoButton'>
                <View style={styles.button}>
                    <Text style={styles.text}>To Do</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={notes} testID='notesButton'>
                <View style={styles.button}>
                    <Text style={styles.text}>Notes</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={encouragement} testID='encouragementButton'>
                <View style={styles.button}>
                    <Entypo name='heart' size={24} color='#f6cefc' />
                </View>
            </TouchableOpacity>
        
        </View>
    )

}

const styles=StyleSheet.create({
    container: {
        marginHorizontal: 15,
        paddingHorizontal: 6,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: 'pink',
        marginTop: -30
    },
    button: {
        backgroundColor: '#007788',
        width: 100,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    text: {
        color: '#f6f6f6',
        //fontFamily: 'RowdiesRegular',
        fontWeight: 'bold',
        fontSize: 18
    }
})
