import React from 'react'; 
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 
import { finalize } from '../../src/api/firestore';
import { setDoc, doc } from 'firebase/firestore';
import { db, authentication } from '../../config';
import Requests from '../../src/components/dashboard/requests';
import { Alert } from 'react-native';



describe("Evidence page", () => {
    test("finalizing evidence submission sets the matched prop of the current user to null", () => {
        finalize(new Date().getDate());
        expect(setDoc).toHaveBeenCalledWith(doc(db, "users", authentication.currentUser.uid), {
            matched: null
        }, { merge: true })
    })
    

})

describe("Dashboard page", () => {
    test("accept button under current user's requests can accept a request when matched is null", () => {
        const mockUserData = [{ name: 'test',
                        major: 'Science',
                        gender: 'F',
                        year: '1',
                        photoURL: 'url',
                        userID: 12345,
                        id: 12345 }];

        jest.spyOn(Alert, "alert");
        const page = render(<Requests requests={mockUserData} currUserMatched={null}/>);
        const acceptButton = page.getByTestId('acceptButton');
        fireEvent.press(acceptButton);
        // expect(Alert.alert).toHaveBeenCalledWith("Your Focus Session has started", 
        // "Complete all of your tasks before the deadline!");
        expect(acceptButton.props.style.backgroundColor).toEqual('#007788');
    })
})
