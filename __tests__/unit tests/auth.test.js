import { isRootedExperimentalAsync } from 'expo-device';
import { signup, login } from '../../src/api/auth';
import { authentication } from '../../config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

// const { mockFirebase } = require('firestore-jest-mock');
// const {
//   mockCreateUserWithEmailAndPassword,
//   mockSignInWithEmailAndPassword,
//   mockSignOut,
//   mockSendPasswordResetEmail,
//   mockDeleteUser,
//   mockVerifyIdToken,
//   mockGetUser,
//   mockCreateCustomToken,
//   mockSetCustomUserClaims,
//   mockUseEmulator,
// } = require('firestore-jest-mock/mocks/auth');

// describe('Examples from documentation', () => {
//     test('add a user', async () => {
//       expect.assertions(1);
//       await this.firebase.auth().createUserWithEmailAndPassword('sam', 'hill');
//       expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith('sam', 'hill');
//     });

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Client Auth Operations', () => {
    const navigation = {navigate: () => {}};
    jest.spyOn(navigation, 'navigate');

    test('handleSignup creates user successfully', async () => {
        await signup(navigation, 'test@gmail.com', '123456');
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(authentication, 'test@gmail.com', '123456');
    })

    test('handleLogin signs in user successfully', async () => {
        await login(navigation, 'test@gmail.com', '123456');
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(authentication, 'test@gmail.com', '123456');
    })
})


