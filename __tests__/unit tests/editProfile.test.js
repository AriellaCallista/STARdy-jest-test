import { saveChanges } from '../../src/api/firestore';
import { authentication, db } from '../../config';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { Alert } from 'react-native'

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Client firestore operations', () => {
    const navigation = {navigate: () => {}};
    jest.spyOn(navigation, 'navigate');

    it('successfuly save profile changes iff none of the fields are empty', async () => {
        saveChanges(navigation, 'test', 'F', 'Biomedical Sciences', '4');
        expect(setDoc).toHaveBeenCalledWith(doc(db, 'users', authentication.currentUser.uid), {
            name: 'test',
            gender: 'F',
            major: 'Biomedical Sciences',
            year: '4',
          }, {merge: true})
    })

    it('fail to save profile changes if at least one of the fields is empty', () => {
        const res = saveChanges(navigation, 'test', 'F', null, false);
        expect(res).toEqual('Fail');
        //expect(Alert.alert).toHaveBeenCalledWith('Fields cannot be empty!') // bc of no fireEvent press?
    })
})


// // mocks
// jest.mock("firebase/app", () => {
//     return {
//       initializeApp: jest.fn(() => Promise.resolve(true)),
//     }
//   });
  
//   jest.mock("firebase/auth", () => {
//     return {
//       getAuth: jest.fn(() => Promise.resolve(true)).mockReturnValue({ currentUser: { uid: 'uid', email: 'test@gmail.com'}}),
//       createUserWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
//       signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true))
//     }
//   })
  
//   jest.mock("firebase/firestore", () => {
//     return {
//       doc: jest.fn().mockReturnValue,
//       getFirestore: jest.fn(),
//       getDoc: jest.fn(() => {
//         return {
//           get: jest.fn(),
//           set: jest.fn()
//         }
//       }),
//       // query: jest.fn(),
//       // collection: jest.fn(),
//       setDoc: jest.fn(() => Promise.resolve(true)),
//       // orderBy: jest.fn(),
//       // limit: jest.fn()
//     }
//   })
  
//   jest.mock("firebase/storage", () => {
//     return {
//       getStorage: jest.fn(() => Promise.resolve(true)),
//       ref: jest.fn(() => {
//         return {
//           child: jest.fn(() => {
//             return {
//               put: jest.fn(() => Promise.resolve(true))
//             }
//           })
//         }
//       })
//     }
//   })

