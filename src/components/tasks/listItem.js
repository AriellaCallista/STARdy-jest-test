import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppText } from './appText';
import {MaterialCommunityIcons} from "@expo/vector-icons"

export function ListItem({title, subTitle, image, ImageComponent, onPress}) {
  return (
        <TouchableOpacity
        testID='tasksButton'
        underlayColor='#333' 
        onPress={onPress}
        >
            <View style={styles.container}>
                {ImageComponent}
               {image && <Image source={{uri:image}} style={styles.image}/>} 
                <View style={styles.ownerHolder}>
                    <AppText inputText={title} stylesLing={styles.name} numberOfLines={1} />
                   {subTitle && <AppText inputText={subTitle} stylesLing={styles.listing} noOfLines={2}/>}
                    
                </View>
                <MaterialCommunityIcons name='chevron-right' size={20} color='#000'/>
            </View>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        marginVertical:0,
        backgroundColor:'#fff',
        alignItems:"center",
        marginHorizontal:30,
        marginVertical:5,
        borderRadius:10, 
        backgroundColor:"#f6f6f6"
    },
    image:{
        width:80,
        height:80,
        borderRadius:50,
        marginLeft:10,
        marginVertical:10
    },
    ownerHolder:{
        flex:1,
        marginTop:10,
        marginHorizontal:15,
        justifyContent:"center"
    },
    name:{
        fontWeight:"bold",
        color: 'black'
    },
    listing:{
        color:"#6e6969",
        marginTop:5
    }
})