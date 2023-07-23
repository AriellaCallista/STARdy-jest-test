import React from 'react'
import Welcome from '../../src/screens/welcome'; 
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 

describe('Welcome screen', () => {

    it('should go to login page', () => {
        const navigation = {navigate: () => {}}

        jest.spyOn(navigation, 'navigate'); 

        const page = render(<Welcome navigation={navigation}/>); 

        const welcomeButton = page.getByTestId('welcomeButton'); 

        fireEvent.press(welcomeButton); 

        expect(navigation.navigate).toHaveBeenCalledWith("Login"); 

    })
})