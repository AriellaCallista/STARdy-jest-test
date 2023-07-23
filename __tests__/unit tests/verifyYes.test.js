import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { authentication, db } from "../../config";
import { verifyYes, verifyNo } from "../../src/api/firestore";
import { isRootedExperimentalAsync } from "expo-device";
import { Alert } from 'react-native';

it('should delete evidence upon verification', () => {
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


test('verify yes before deadline works with alert', async () => {
    jest.spyOn(Alert, 'alert');
    const startDate = new Date().getDate();
    await verifyYes(startDate, 'test');
    expect(Alert.alert).toHaveBeenCalledWith("Thanks for verifying!", 
    "This marks the end of your focus session. Check your XP accumulation under dashboard!")
});




