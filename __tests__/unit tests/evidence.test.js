import { finalize } from "../../src/api/firestore";
import { useState } from "react";
import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { authentication, db } from "../../config";
import { isRootedExperimentalAsync } from "expo-device";
import { Alert } from 'react-native';


test('should increase user XP by 100 upon submitting evidence before deadline', async () => {
  await finalize(new Date().getDate())
  const docSnap = await getDoc(doc(db, "users", authentication.currentUser.uid));
  const prevXP = docSnap.get('xp');
  const newXP = prevXP + 100;
  expect(setDoc).toHaveBeenCalledWith(doc(db, "users", authentication.currentUser.uid), {
      xp: newXP
    }, { merge: true });
})


it('should display an alert when user before deadline', async () => {
    jest.spyOn(Alert, 'alert');
    await finalize(new Date().getDate());
     expect(Alert.alert).toHaveBeenCalledWith("Another successful day!", 
     "Wait patiently for your XP as your partner verifies your evidence, in the meantime, feel free to start another focus session!");
    
})

it('should display an alert when user after deadline', async () => {
    jest.spyOn(Alert, 'alert');
    await finalize(new Date().getDate() - 2);
    expect(Alert.alert).toHaveBeenCalledWith("Sorry, you've missed the deadline for submission", "You will not be getting XPs this time");

})



