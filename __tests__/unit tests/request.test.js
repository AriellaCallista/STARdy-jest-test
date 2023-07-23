import { acceptRequest, request } from "../../src/api/firestore";
import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { authentication, db } from "../../config";
import { isRootedExperimentalAsync } from "expo-device";

// beforeEach(() => {
//     jest.clearAllMocks();
// });

const otherUser = { name: 'otherUser', gender: 'F', year: '1', major: 'Science', 
photoURL: 'https://firebasestorage.googleapis.com/v0/b/stardy-6.appspot.com/o/profileImage%2F0aMe0i4iRvWwgTmuQmPGCBipbvS2?alt=media&token=c37dfa2c-d366-4ec0-bc9f-5a8713f3510d',
matched: null,
xp: 200,
level: 1,
id: 12345 };

describe('Request functions', () => {
   

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

})
