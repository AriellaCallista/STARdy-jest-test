import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, where, query, getDocs } from 'firebase/firestore'
import { authentication, db } from '../../config'
import { ListItem } from '../components/tasks/listItem'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { signOut } from 'firebase/auth'

export default function Home({navigation}) {
  const [users, setUsers] = useState([]);

  const logoutUser = async () => {
    signOut(authentication)
      .then(() => {
        navigation.navigate('Login')
      })
  }


  const fetchUsers = () => new Promise(async (resolve) => {

    const docsRef = collection(db, 'focusSession', authentication.currentUser.uid, 'partners');
    const q =  query(docsRef, where('active', '==', true));
    const querySnap = await getDocs(q);
    let users = [];
    querySnap.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      users.push({ id, ...data });
    })
    resolve(users);

  })

  useEffect(() => {
    fetchUsers()
      .then(setUsers);
  })
  

  return (
    <View style={styles.container} testID='home'>
    <>
      <TouchableOpacity onPress={logoutUser} testID='logoutButton'>
          <View style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
          </View>
      </TouchableOpacity>

      {/* <View style={styles.empty}>
        <Text style={styles.emptyText}>Send your evidence here!</Text>
      </View> */}

      <FlatList
      data={users}
      key={user => user.email}
      renderItem={({item}) => 
          {
              return (

                // <TouchableOpacity 
                //   testID='tasksButton'
                //   onPress={() => navigation.navigate('Task', {name:item.name, uid:item.userID, userAvatar:item.photoURL, email: item.email, matched: item.matched})}
                // >
                  <ListItem 
                  onPress={() => navigation.navigate('Task', {name:item.name, uid:item.userID, userAvatar:item.photoURL, email: item.email, matched: item.matched})}
                  title={item.name}
                  image={item.photoURL}
                  />

                // </TouchableOpacity>
                
              )
          }}
      />

      

  </>
  </View>
    
  )
}

const styles = StyleSheet.create({
  container:{
      flex:1, 
      backgroundColor: '#eef1e1',
  },
  button: {
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#007788',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 100,
    marginBottom: 10, 
    marginTop: 45,
    marginLeft: 20
  },
  buttonText: {
    color: '#f6f6f6',
    fontWeight: 'bold',
    fontFamily: 'RowdiesRegular', 
    fontSize: 14,
    textAlign: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center'
  }, 
  emptyText: {
    fontSize: 24,
    opacity: 0.5
  }
})