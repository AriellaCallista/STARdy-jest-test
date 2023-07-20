import { addFriend } from "../../src/api/firestore";
import { Alert, ScrollViewComponent } from "react-native";
import { authentication, db } from "../../config";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";


test('add friend functionality works as intended', () => {
    const friend = { name: 'test', gender: 'F', year: '1', major: 'Science', 
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
          matched: null,
          xp: 200,
          level: 1,
          userID: 12345 };
    addFriend(friend);
    expect(setDoc).toHaveBeenCalledWith(doc(db, "friends", authentication.currentUser.uid, "userFriends", "12345"), {
        friends: true,
        name: 'test',
        gender: 'F',
        year: '1',
        major: 'Science',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
        matched: null,
        xp: 200,
        level: 1    
    })

})