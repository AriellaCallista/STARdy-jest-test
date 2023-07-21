import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { authentication, db } from "../../config";
import { verifyYes, verifyNo } from "../../src/api/firestore";
import { isRootedExperimentalAsync } from "expo-device";
import { Alert } from 'react-native';

// const currUserRef = doc(db, "users", authentication.currentUser.uid);
// const partnerRef = doc(db, "users", otherUserID);

test('verify no before deadline works with alert', async () => {
  jest.spyOn(Alert, 'alert');
  const startDate = new Date().getDate();
  await verifyNo(startDate, 'test');
  expect(Alert.alert).toHaveBeenCalledWith("Thanks for verifying!", 
  "This marks the end of your focus session. Check your XP accumulation under dashboard!")
});

test('verify no works as intended', () => {
  const startDate = new Date().getDate();
  verifyNo(startDate, 'test');
  expect(deleteDoc).toHaveBeenCalledWith(doc(db, "evidence", "test", "images", authentication.currentUser.uid))
});

test('verify no before deadline works as intended', async () => {
  const startDate = new Date().getDate();
  verifyNo(startDate, 'test');
  const docSnap = await getDoc(doc(db, "users", authentication.currentUser.uid));
  const prevXP = docSnap.get('xp');
  const newXP = prevXP + 150;
  expect(setDoc).toHaveBeenCalledWith(doc(db, "users", authentication.currentUser.uid), {
    xp: newXP
  }, { merge : true })
  const docSnap2 = await getDoc(doc(db, "users", 'test'));
  const prevXP2 = docSnap2.get('xp');
  const newXP2 = prevXP2 - 200;
  expect(setDoc).toHaveBeenCalledWith(doc(db, "users", 'test'), {
    xp: newXP2
  }, { merge: true });
});

test('verify no after deadline works with alert', async () => {
  jest.spyOn(Alert, 'alert');
  const start = new Date().getDate() - 3;
  await verifyNo(start, 'test');
  expect(Alert.alert).toHaveBeenCalledWith("You've missed the deadline for verification XP :(", 
  "Unfortunately you will not be getting any XP for verification. Don't miss the deadline next time!")
})

test('verify no after deadline works as intended', async () => {
  const startDate = new Date().getDate() - 3;
  verifyNo(startDate, 'test');
  const docSnap = await getDoc(doc(db, "users", 'test'));
  const prevXP = docSnap.get('xp');
  const newXP = prevXP - 200;
  expect(setDoc).toHaveBeenCalledWith(doc(db, "users", authentication.currentUser.uid), {
    xp: newXP
  }, { merge : true })

  expect(setDoc).toHaveBeenCalledWith(doc(db, "focusSession", authentication.currentUser.uid, "partners", 'test'), {
    active: false
  }, { merge: true }); 

});




