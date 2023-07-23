import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import { Alert } from 'react-native';
import Random from '../../src/components/sessionUsers/random';
import Friends from '../../src/components/sessionUsers/friends'

import { acceptRequest, request } from "../../src/api/firestore";
import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { authentication, db } from "../../config";
import { NavigationContainer } from '@react-navigation/native';
import Requests from '../../src/components/dashboard/requests';

const mockUserData = [{ name: 'test',
                        major: 'Science',
                        gender: 'F',
                        year: '1',
                        photoURL: 'url',
                        userID: 12345,
                        id: 12345 }];

it('should be able to accept request when current user is not matched', () => {
    jest.spyOn(Alert, "alert");
    const page = render(<Requests requests={mockUserData} currUserMatched={null}/>);
    const acceptButton = page.getByTestId('acceptButton');
    fireEvent.press(acceptButton);
    // expect(Alert.alert).toHaveBeenCalledWith("Your Focus Session has started", 
    // "Complete all of your tasks before the deadline!");
    expect(acceptButton.props.style.backgroundColor).toEqual('#007788');

})

it('should NOT be able to accept request when current user is not matched', () => {
    jest.spyOn(Alert, "alert");
    const page = render(<Requests requests={mockUserData} currUserMatched= {12345} />);
    const noAcceptButton = page.getByTestId('noAcceptButton');
    fireEvent.press(noAcceptButton);
    expect(Alert.alert).toHaveBeenCalledWith("Cannot join a new focus session", 
    "Submit evidence before joining a new focus session");
    expect(noAcceptButton.props.style.backgroundColor).toEqual('grey');
    
})