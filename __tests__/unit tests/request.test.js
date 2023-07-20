import { acceptRequest, request } from "../../src/api/firestore";
import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { authentication, db } from "../../config";
import { isRootedExperimentalAsync } from "expo-device";

beforeEach(() => {
    jest.clearAllMocks();
});


describe('Request functions', () => {
    const otherUser = { name: 'otherUser', gender: 'F', year: '1', major: 'Science', 
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
          matched: null,
          xp: 200,
          level: 1,
          id: 12345 };

    describe('should be able to send a focus session request', () => {
        test('write the request made by the current user to the other user requests list', () => {
            request(otherUser, 'test', 'F', '1', 'Science', 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
                authentication.currentUser.uid);
            expect(setDoc).toHaveBeenCalledWith(doc(db, "requests", '12345', "userRequests", 'uid'), {
                name: 'test',
                gender: 'F',
                year: '1',
                major: 'Science',
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
                userID: 'uid'
            })
        })

        // to keep track of all of the requests the current user has made
        test('store all of the requests made by the current user under their "requesting" collection', () => {
            request(otherUser, 'test', 'F', '1', 'Science', 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
                authentication.currentUser.uid);
            expect(setDoc).toHaveBeenCalledWith(doc(db, "requesting", 'uid', "requestingUsers", '12345'), {
                name: 'otherUser',
                gender: 'F',
                year: '1',
                major: 'Science',
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
                userID: 12345,
            })
        })
    })


    // const acceptRequest = async (item, currUserName, currUserEmail, currUserID, currUserPhotoURL, currUserMatched) => {

    //     const startDay = new Date().getDate();
        
    //     // delete request once accepted
    //     // await deleteDoc(doc(db, "requests", authentication.currentUser.uid, "userRequests", item.id));
    //     // await deleteDoc(doc(db, "requesting", item.id, "requestingUsers", authentication.currentUser.uid));
       
    //     // const matchedRef = doc(db, "users", item.id)
    //     // await setDoc(matchedRef, {
    //     //     matched: authentication.currentUser.uid,
    //     // }, { merge: true })
        
    //     // const matchedRef2 = doc(db, "users", authentication.currentUser.uid)
    //     // await setDoc(matchedRef2, {
    //     //     matched: item.id,
    //     // }, { merge: true })
      
    //     // if current user is in a focus session, should not be able to accept the request
      
    //     // const docRef = doc(db, "focusSession", authentication.currentUser.uid, "partners", item.id)
    //     // await setDoc(docRef, {
    //     //     name: item.name,
    //     //     active: true,
    //     //     userID: item.id,
    //     //     photoURL: item.photoURL,
    //     //     start: startDay,
    //     //     matched: authentication.currentUser.uid
      
    //     // }, { merge: true }).then(() => {
    //     //     console.log('submitted!')
    //     // }).then((error) => {
    //     //     console.log(error)
    //     // })
      
    //     // need current user data!
    //     const docRef2 = doc(db, "focusSession", item.id, "partners", authentication.currentUser.uid)
    //     await setDoc(docRef2, {
    //         name: currUserName,
    //         active: true,
    //         userID: currUserID,
    //         photoURL: currUserPhotoURL,
    //         start: startDay,
    //         matched: item.id
    //     }, { merge: true }).then(() => {
    //         console.log('submitted!')
    //     }).then((error) => {
    //         console.log(error)
    //     })
      
    //   }

    describe('test accept request function', () => {
       test('should write other user data to current user entry in "focusSession" collection', () => {
            acceptRequest(otherUser, 'test', authentication.currentUser.uid, 'mockURL');
            expect(setDoc).toHaveBeenCalledWith(doc(db, "focusSession", 'uid', "partners", 12345), {
                name: 'otherUser',
                active: true,
                userID: 12345,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
                start: new Date().getDate(),
                matched: 'uid'
            }, { merge: true })
       })

    //    jest.clearAllMocks();
    // (item, currUserName, currUserID, currUserPhotoURL)
       test('should write current user data to other user entry in "focusSession" collection', () => {
        acceptRequest(otherUser, 'test', authentication.currentUser.uid, 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d');
            expect(setDoc).toHaveBeenCalledWith(doc(db, "focusSession", 12345, "partners", authentication.currentUser.uid), {
                name: 'test',
                active: true,
                userID: 'uid',
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
                start: new Date().getDate(),
                matched: 12345
            }, { merge: true })    
       })


    })
})