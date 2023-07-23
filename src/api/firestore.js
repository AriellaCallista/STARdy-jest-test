import { authentication, db } from "../../config";
import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const submitUserData = (navigation, name, gender, major, year, appState) => {
    setDoc(doc(db, "users", authentication.currentUser.uid), {
      name: name,
      gender: gender,
      major: major,
      year: year,
      email: authentication.currentUser.email,
      userID: authentication.currentUser.uid,
      matched: null,
      xp: 200,
      appState: appState, 
    }, {merge: true}).then(() => {
      // data saved successfully
      console.log('data submitted');
    }).catch((error) => {
      //the write failed
      console.log(error)
      console.log(appState)
    });
    navigation.navigate('OnboardingScreen')
}

export const saveChanges = (navigation, name, gender, major, year) => {
    if (name && gender && major && year) {
      setDoc(doc(db, 'users', authentication.currentUser.uid), {
        name: name,
        gender: gender,
        major: major,
        year: year,
      }, {merge: true}).then(() => {
        // data saved successfully
        console.log('data submitted');
      }).catch((error) => {
        //the write failed
        console.log(error)
      });
      navigation.navigate('Main Tab')
    } else {
      Alert.alert('Fields cannot be empty!');
      return "Fail";
    } 
}


export const queryUsersByMajorAndYear = (major, year) => new Promise(async (resolve) => {
  const q = query(collection(db, "users"), where("major", "==", major), where("year", "==", year),  where("appState", "==", "active"));
  const documentSnapshot = await getDocs(q);
  const users = [];
  documentSnapshot.forEach((doc) => {
    users.push(doc.data())
  })
  resolve(users);
})

export const queryUsersByName = async (name) =>  new Promise(async (resolve) => {
  const q = query(collection(db, "users"), where("name", ">=", name), where('name', '<=', name + '\uf8ff'))
    const documentSnapshot = await getDocs(q);
    const users = [];
    documentSnapshot.forEach((doc) => {
      users.push(doc.data())
    })
    resolve(users);
})
    

  
export const addFriend = (item) => {
    const docRef = doc(db, "friends", authentication.currentUser.uid, "userFriends", item.userID);
    setDoc(docRef, {
      friends: true,
      name: item.name,
      gender: item.gender,
      year: item.year,
      major: item.major,
      photoURL: item.photoURL,
      matched: item.matched,
      xp: item.xp,
      level: item.level     
    })
    Alert.alert("Friend added!")
}

export const fetchUserFriends = () => new Promise(async (resolve) => {
  const q = query(collection(db, "friends", authentication.currentUser.uid, "userFriends"));
  const documentSnapshot = await getDocs(q);
  const users = [];
  documentSnapshot.forEach((doc) => {
    users.push(doc.data())
  })
  resolve(users);
})

export const request = (item, currUserName, currUserGender, currUserYear, currUserMajor, currUserPhotoURL, currUserUserID) => {
  const docRef = doc(db, "requests", item.id, "userRequests", authentication.currentUser.uid);
  setDoc(docRef, {
    name: currUserName,
    gender: currUserGender,
    year: currUserYear,
    major: currUserMajor,
    photoURL: currUserPhotoURL,
    userID: currUserUserID
    // email: item.email
  });

  const docRef2 = doc(db, "requesting", authentication.currentUser.uid, "requestingUsers", item.id);
  setDoc(docRef2, {
    name: item.name,
    gender: item.gender,
    year: item.year,
    major: item.major,
    photoURL: item.photoURL,
    userID: item.id,
    // email: item.email
  })
  // Alert.alert("Request sent!", `Please wait for ${item.name} to accept your request.`)
}

export const fetchUserRequests = () => new Promise(async (resolve) => {
  const q = query(collection(db, "requests", authentication.currentUser.uid, "userRequests"));
  const documentSnapshot = await getDocs(q);
  const users = [];
  documentSnapshot.forEach((doc) => {
    users.push(doc.data())
  })
  resolve(users);
})

export const fetchUserRequesting = () => new Promise(async (resolve) => {
  const q = query(collection(db, "requesting"));
  const documentSnapshot = await getDocs(q);
  const users = [];
  documentSnapshot.forEach((doc) => {
    users.push(doc.data())
  })
  resolve(users);
})



export const acceptRequest = async (item, currUserName, currUserID, currUserPhotoURL) => {

  const startDay = new Date().getDate();
  
  // // delete request once accepted
  // await deleteDoc(doc(db, "requests", authentication.currentUser.uid, "userRequests", item.id));
  // await deleteDoc(doc(db, "requesting", item.id, "requestingUsers", authentication.currentUser.uid));
 
  // const matchedRef = doc(db, "users", item.id)
  // await setDoc(matchedRef, {
  //     matched: authentication.currentUser.uid,
  // }, { merge: true })
  
  // const matchedRef2 = doc(db, "users", authentication.currentUser.uid)
  // console.log("matched ref2" + matchedRef2)
  // console.log("id " + item.userID)
  // await setDoc(matchedRef2, {
  //     matched: item.id,
  // }, { merge: true })

  // if current user is in a focus session, should not be able to accept the request

  const docRef = doc(db, "focusSession", authentication.currentUser.uid, "partners", item.id)
  await setDoc(docRef, {
      name: item.name,
      active: true,
      userID: item.id,
      photoURL: item.photoURL,
      start: startDay,
      matched: authentication.currentUser.uid

  }, { merge: true }).then(() => {
      console.log('submitted!')
  }).then((error) => {
      console.log(error)
  })

  // need current user data!
  const docRef2 = doc(db, "focusSession", item.id, "partners", authentication.currentUser.uid)
  await setDoc(doc(db, "focusSession", item.id, "partners", authentication.currentUser.uid), {
      name: currUserName,
      active: true,
      userID: currUserID,
      photoURL: currUserPhotoURL,
      start: startDay,
      matched: item.id
  }, { merge: true }).then(() => {
      console.log('submitted!')
  }).then((error) => {
      console.log(error)
  })

}

export const finalize = async (startDate) => {
   

  //get current date when user is uploading
  const currentDate = new Date().getDate();
  // get deadline
  const expectedSubmissionDate = startDate + 1;

  // release from matched status so user can start a new focus session
  const usersRef = doc(db, "users", authentication.currentUser.uid);
  await setDoc(usersRef, {
    matched: null,
  }, { merge: true})

  // check if submitted within deadline
  if (currentDate <= expectedSubmissionDate) {
    const currUserRef = doc(db, "users", authentication.currentUser.uid);
    const docSnap = await getDoc(currUserRef);
    const prevXP = docSnap.get('xp');
    const newXP = prevXP + 100;
    setDoc(currUserRef, {
      xp: newXP
    }, { merge: true });

    Alert.alert("Another successful day!", 
    "Wait patiently for your XP as your partner verifies your evidence, in the meantime, feel free to start another focus session!")

  } else if (currentDate > expectedSubmissionDate) {
      console.log(currentDate);
      Alert.alert("Sorry, you've missed the deadline for submission", "You will not be getting XPs this time")
      
  } 

}

export const fetchUserEvidence = (otherUserID) => new Promise(async(resolve) => {
  const q = query(collection(db, "evidence", otherUserID, "images"), where("partner", "==", authentication.currentUser.uid));
  const documentSnapshot = await getDocs(q);
  const evidence = [];
  documentSnapshot.forEach((doc) => {
    evidence.push(doc.data())
  })
  resolve(evidence);
})


export const verifyNo = async (startDate, otherUserID) => {

  const currentDate = new Date().getDate();
  const expectedSubmissionDate = startDate + 1;

  //await deleteDoc(doc(db, "focusSession", authentication.currentUser.email, "partners", otherUserEmail));

  // delete evidence once verified
  await deleteDoc(doc(db, "evidence", otherUserID, "images", authentication.currentUser.uid))

  const currUserRef = doc(db, "users", authentication.currentUser.uid);
  const partnerRef = doc(db, "users", otherUserID);
  if (currentDate <= expectedSubmissionDate) {
    // current user gets 150 xp
    const docSnap = await getDoc(currUserRef);
    const prevXP = docSnap.get('xp');
    const newXP = prevXP + 150;
    setDoc(currUserRef, {
      xp: newXP
    }, { merge: true });
  
    // partner loses 200 xp
    const docSnap2 = await getDoc(partnerRef);
    const prevXP2 = docSnap2.get('xp');
    const newXP2 = prevXP2 - 200;
    setDoc(partnerRef, {
      xp: newXP2
    }, { merge: true });

    Alert.alert("Thanks for verifying!", 
    "This marks the end of your focus session. Check your XP accumulation under dashboard!")

  } else {
    // partner loses 200 XP
    const docSnap = await getDoc(partnerRef);
    const prevXP = docSnap.get('xp');
    const newXP = prevXP - 200;
    setDoc(partnerRef, {
      xp: newXP
    }, { merge: true });


    Alert.alert("You've missed the deadline for verification XP :(", 
    "Unfortunately you will not be getting any XP for verification. Don't miss the deadline next time!")

  }

  // set active to false
  const docRef = doc(db, "focusSession", authentication.currentUser.uid, "partners", otherUserID);
  await setDoc(docRef, {
    active: false
  }, { merge: true });  

}

export const verifyYes = async (startDate, otherUserID) => {

  const currentDate = new Date().getDate();
  const expectedSubmissionDate = startDate + 2;

  // use 'active' field instead of delete cus need data for chat
  // await deleteDoc(doc(db, "focusSession", authentication.currentUser.uid, "partners", otherUserID));

  // delete evidence once verified
  await deleteDoc(doc(db, "evidence", otherUserID, "images", authentication.currentUser.uid));

  const currUserRef = doc(db, "users", authentication.currentUser.uid);
  const partnerRef = doc(db, "users", otherUserID);
  if (currentDate <= expectedSubmissionDate) {
    // current user gets 150 xp 
    const docSnap = await getDoc(currUserRef);
    const prevXP = docSnap.get('xp');
    const newXP = prevXP + 150;
    setDoc(currUserRef, {
      xp: newXP
    }, { merge: true });

    // partner gets 200 xp
    const docSnap2 = await getDoc(partnerRef);
    const prevXP2 = docSnap2.get('xp');
    const newXP2 = prevXP2 + 200;
    setDoc(partnerRef, {
      xp: newXP2
    }, { merge: true });


    // end focus session and return to main page
    Alert.alert("Thanks for verifying!", 
    "This marks the end of your focus session. Check your XP accumulation under dashboard!")
    
  } else { // missed deadline
    // partner gets 200 XP
    const docSnap = await getDoc(partnerRef);
    const prevXP = docSnap.get('xp');
    const newXP = prevXP + 200;
    setDoc(partnerRef, {
      xp: newXP
    }, { merge: true });

    Alert.alert("You've missed the deadline for verification :(", 
    "Unfortunately you will not be getting any XP for verification. Don't miss the deadline next time!")
  }

  // set active to false
  const docRef = doc(db, "focusSession", authentication.currentUser.uid, "partners", otherUserID);
  await setDoc(docRef, {
    active: false
  }, { merge: true });
  
}