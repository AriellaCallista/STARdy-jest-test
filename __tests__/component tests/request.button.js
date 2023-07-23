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

const mockUserData = [{ name: 'test',
                    email: 'test@gmail.com',
                    gender: 'F',
                    level: 1,
                    major: 'Science',
                    matched: null,
                    photoURL: 'url',
                    rank: 1,
                    userID: 12345,
                    xp: 200,
                    year: '1',
                    appState: 'active',
                    id: 12345 }]



describe('Testing request button in random page', () => {

    it("expects an alert when user clicks on 'requesting'", () => {
        const mockUserRequesting = [12345]
        jest.spyOn(Alert, 'alert');
        const page = render(
            <NavigationContainer>
                <Random users={mockUserData} userRequesting={mockUserRequesting}/>
            </NavigationContainer>   
        );
   
        const requestingButton = page.getByTestId('requestingButton');
        fireEvent.press(requestingButton);
        expect(Alert.alert).toHaveBeenCalledWith("Already requested");
        expect(requestingButton.props.style.backgroundColor).toEqual('#d3d3d3');

    })

    it("sends a request when user clicks on 'request'", () => {
        const mockUserRequesting = []
        jest.spyOn(Alert, 'alert');
        const page = render(
            <NavigationContainer>
                <Friends users={mockUserData} userRequesting={mockUserRequesting}/>
            </NavigationContainer>   
        );

        const requestButton = page.getByTestId('requestButton');
        fireEvent.press(requestButton);
        expect(Alert.alert).toHaveBeenCalledWith("Request sent");
    })

    test("requesting button should be #D3D3D3", () => {
        const mockUserRequesting = [12345]
        const page = render(
            <NavigationContainer>
                <Random users={mockUserData} userRequesting={mockUserRequesting}/>
            </NavigationContainer>   
        );

        const requestingButton = page.getByTestId('requestingButton');
        fireEvent.press(requestingButton);
        expect(requestingButton.props.style.backgroundColor).toEqual('#d3d3d3');

    })

    test("request button should be #007788", () => {
        const mockUserRequesting = []
        const page = render(
            <NavigationContainer>
                <Random users={mockUserData} userRequesting={mockUserRequesting}/>
            </NavigationContainer>   
        );

        const requestButton = page.getByTestId('requestButton');
        fireEvent.press(requestButton);
        expect(requestButton.props.style.backgroundColor).toEqual('#007788');

    })

})

describe('Testing request button in friends page', () => {

    it("expects an alert when user clicks on 'requesting'", () => {
        const mockUserRequesting = [12345]
        jest.spyOn(Alert, 'alert');
        const page = render(
            <NavigationContainer>
                <Friends users={mockUserData} userRequesting={mockUserRequesting}/>
            </NavigationContainer>   
        );

        const requestingButton = page.getByTestId('requestingButton');
        fireEvent.press(requestingButton);
        expect(Alert.alert).toHaveBeenCalledWith("Already requested");
        expect(requestingButton.props.style.backgroundColor).toEqual('#d3d3d3');

    })

    it("sends a request when user clicks on 'request'", () => {
        const mockUserRequesting = []
        jest.spyOn(Alert, 'alert');
        const page = render(
            <NavigationContainer>
                <Friends users={mockUserData} userRequesting={mockUserRequesting}/>
            </NavigationContainer>   
        );

        const requestButton = page.getByTestId('requestButton');
        fireEvent.press(requestButton);
        expect(Alert.alert).toHaveBeenCalledWith("Request sent");
        expect(requestButton.props.style.backgroundColor).toEqual('#007788');

    })

    test("requesting button should be #D3D3D3", () => {
        const mockUserRequesting = [12345]
        const page = render(
            <NavigationContainer>
                <Friends users={mockUserData} userRequesting={mockUserRequesting}/>
            </NavigationContainer>   
        );

        const requestingButton = page.getByTestId('requestingButton');
        fireEvent.press(requestingButton);
        expect(requestingButton.props.style.backgroundColor).toEqual('#d3d3d3');

    })

    test("request button should be #007788", () => {
        const mockUserRequesting = []
        const page = render(
            <NavigationContainer>
                <Friends users={mockUserData} userRequesting={mockUserRequesting}/>
            </NavigationContainer>   
        );

        const requestButton = page.getByTestId('requestButton');
        fireEvent.press(requestButton);
        expect(requestButton.props.style.backgroundColor).toEqual('#007788');

    })

})

