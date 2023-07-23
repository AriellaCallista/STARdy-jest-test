import { acceptRequest, request } from "../../src/api/firestore";
import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { authentication, db } from "../../config";
import { isRootedExperimentalAsync } from "expo-device";

beforeEach(() => {
    jest.clearAllMocks();
});

const otherUser = { name: 'otherUser', gender: 'F', year: '1', major: 'Science', 
photoURL: 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
matched: null,
xp: 200,
level: 1,
id: 12345 };

    

describe('test accept request function', () => {
    test('accept request function works as intended', () => {
        acceptRequest(otherUser, 'test', authentication.currentUser.uid, 'mockURL');

        expect(setDoc).toHaveBeenCalledWith(doc(db, "focusSession", 'uid', "partners", 12345), {
            name: 'otherUser',
            active: true,
            userID: 12345,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
            start: new Date().getDate(),
            matched: "uid"
        }, { merge: true })

        expect(setDoc).toHaveBeenCalledWith(doc(db, "focusSession", 'uid', "partners", 12345), {
            name: 'otherUser',
            active: true,
            userID: 12345,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
            start: new Date().getDate(),
            matched: "uid"
        }, { merge: true })

    })    
})
