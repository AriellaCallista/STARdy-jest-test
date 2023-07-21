import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { authentication, db } from "../../config";
import { verifyYes, verifyNo } from "../../src/api/firestore";
import { isRootedExperimentalAsync } from "expo-device";
import { Alert } from 'react-native';

// const currUserRef = doc(db, "users", authentication.currentUser.uid);
// const partnerRef = doc(db, "users", otherUserID);

test('verify yes works as intended', () => {
  const startDate = new Date().getDate();
  verifyYes(startDate, 'test');
  expect(deleteDoc).toHaveBeenCalledWith(doc(db, "evidence", "test", "images", authentication.currentUser.uid))
});

test('verify yes before deadline works as intended', async () => {
  const startDate = new Date().getDate();
  verifyYes(startDate, 'test');
  const docSnap = await getDoc(doc(db, "users", authentication.currentUser.uid));
  const prevXP = docSnap.get('xp');
  const newXP = prevXP + 150;
  expect(setDoc).toHaveBeenCalledWith(doc(db, "users", authentication.currentUser.uid), {
    xp: newXP
  }, { merge : true })
  const docSnap2 = await getDoc(doc(db, "users", 'test'));
  const prevXP2 = docSnap2.get('xp');
  const newXP2 = prevXP2 + 200;
  expect(setDoc).toHaveBeenCalledWith(doc(db, "users", 'test'), {
    xp: newXP2
  }, { merge: true });
});

test('verify yes after deadline works as intended', async () => {
  const startDate = new Date().getDate() - 3;
  verifyYes(startDate, 'test');
  const docSnap = await getDoc(doc(db, "users", 'test'));
  const prevXP = docSnap.get('xp');
  const newXP = prevXP + 200;
  expect(setDoc).toHaveBeenCalledWith(doc(db, "users", authentication.currentUser.uid), {
    xp: newXP
  }, { merge : true })

  expect(setDoc).toHaveBeenCalledWith(doc(db, "focusSession", authentication.currentUser.uid, "partners", 'test'), {
    active: false
  }, { merge: true }); 

});




