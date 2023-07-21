import { finalize } from "../../src/api/firestore";
import { useState } from "react";
import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { authentication, db } from "../../config";
import { isRootedExperimentalAsync } from "expo-device";
import { Alert } from 'react-native';


test('submit evidence functionality works as intended', () => {
    const submissionDate = new Date().getDate();
    finalize(submissionDate); 
    expect(setDoc).toHaveBeenCalledWith(doc(db, "users", authentication.currentUser.uid), {
        matched: null,
      }, { merge: true})
})

test('submit evidence functionality works as intended', async () => {
  const docSnap = await getDoc(doc(db, "users", authentication.currentUser.uid));
  const prevXP = docSnap.get('xp');
  const newXP = prevXP + 100;
  expect(setDoc).toHaveBeenCalledWith(doc(db, "users", authentication.currentUser.uid), {
      xp: newXP
    }, { merge: true });
})


