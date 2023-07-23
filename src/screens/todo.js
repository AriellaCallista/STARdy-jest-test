import React from 'react';
import { View, Text, StyleSheet, title, button, Button, TouchableOpacity} from 'react-native';
import AddTodo from '../components/dashboard/addTodo';

export default function Todo( navigation ) {

  return (
    <View style={{flex: 1}}>
        <AddTodo />
    </View>
)

}