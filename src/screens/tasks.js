import { StyleSheet, Text, View, Button, Image, Modal, TouchableWithoutFeedback, FlatList, TouchableOpacity, Alert} from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, Send, RenderMessageImageProps } from 'react-native-gifted-chat'
import { addDoc, collection, serverTimestamp , doc, onSnapshot, query, orderBy, setDoc, getDoc} from 'firebase/firestore';
import { db, authentication} from '../../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { saveMediaToStorage } from '../services/random';
import { saveUserProfileImage, saveUserChatImage } from '../services/user';
import { useFocusEffect } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Tasks({route, navigation, mockTask}) {
  const currentUser = authentication?.currentUser?.uid;
  const uid = route.params.uid
  const email = route.params.email
  const matched = route.params.matched
  const [startDate, setStartDate] = useState(0);
  const [currentDate, setCurrentDate] = useState(0);
  const [deadline, setDeadline] = useState(0);
  
  useFocusEffect(
    useCallback(async () => {
      const docRef = doc(db, 'focusSession', authentication.currentUser.uid, 'partners', uid);
      // getDoc(docRef)
      //   .then((doc) => {
      //     setStartDate(doc.get('start'))
      //     console.log(doc.get('start'))
      // }
      // )
      const docSnap = await getDoc(docRef);
      setStartDate(docSnap.get('start'));
      setCurrentDate(new Date().getDate());

      console.log('matched: ' + matched)
      console.log(currentDate);
      

    }, [])
  )

  useEffect(() => {
    setDeadline(startDate + 1);
    console.log(deadline);
  }, [startDate])

 



  const items = [
    {
      id: 1,
      name: 'Task 1',
      task: 'Set your goals for the day!',
      details: 'Note down your goals and send it to your accountability partner', 
      Due: 'Deadline: 23:59 today', 

    },
    {
      id: 2,
      name: 'Task 2',
      task: 'Send the evidences!',
      details: 'Send evidences of completion of your goals to your accountability partner via the chat feature. Note: send the evidences in the form of google drive links', 
      Due: 'Deadline: 23:59 today'
    },
    {
      id: 3, 
      name: 'Task 3',
      task: 'Encouragement message!',
      details: '(optional)leave an encouragement message for you accountability partner via the chat feature', 
      Due: 'Deadline: (recommended) 23:59 today'
    },
    {
      id: 4,
      name: 'Task 4',
      task: 'Verification!',
      details: 'verify the evidence sent by your accountability partner', 
      Due: 'Deadline: 23:59 the next day'
    },
    
    
    
  ]
  

  function doTasks(item) {
    if (item.id == 1) {
      return ()=> navigation.navigate('Goals');  
    } else if (item.id == 2) {
      return ()=> navigation.navigate('Evidence', {otherUserID: uid, otherUserEmail: email, currentUser: authentication.currentUser.uid });
    } else if (item.id == 3) {
      return ()=> navigation.navigate('Encouragement'); 
    } else {
      return ()=> navigation.navigate('Verify',{otherUserEmail: email, otherUserID: uid,});  
    }
  }

  const sendAlert = () => {
    Alert.alert('Deadline Passed')
  }

  return (
    <View style={styles.container} testID='tasks'>

      <Text style={styles.title}>FocusSession Guidelines</Text>
      
      <FlatList
        data={mockTask}
        renderItem={({ item }) => (
         
          <View style={styles.card}>
            <View style={styles.item}>
              
              <View style={styles.itemContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemTask}>{item.task}</Text>
                <Text style={styles.itemDue}>{item.details}</Text>
                <Text style={styles.itemDue}>{item.Due}</Text>
              </View>
            </View>

            <View style={styles.buttons}>
            
              {/* { (item.name != "Task 2" || matched == authentication.currentUser.uid)
                ? <TouchableOpacity style={{backgroundColor: '#007788', ...styles.button}} onPress={doTasks(item)}>
                    <Text style={styles.buttonText}> View </Text>
                  </TouchableOpacity>
                :<TouchableOpacity style={{backgroundColor: 'grey', ...styles.button}} onPress={sendAlert}>
                    <Text style={styles.buttonText}> View </Text>
                  </TouchableOpacity>
              } */}
              <TouchableOpacity style={{backgroundColor: '#007788', ...styles.button}} onPress={doTasks(item)} testID="taskButton">
                    <Text style={styles.buttonText}> View </Text>
              </TouchableOpacity>
              
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1e1', 
  },
  card: {
    marginHorizontal:20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007788',  
    // backgroundColor: '#007788', 
    // color: '#fff', 
    // alignItems: 'center'
  },
  itemTask: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  title: {
    fontSize: 20,
    color: '#007788',
    fontWeight: 'bold',
    alignSelf: 'center', 
    marginBottom: 10, 
    marginTop: 15, 
  },
  itemDue: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10, 
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})



