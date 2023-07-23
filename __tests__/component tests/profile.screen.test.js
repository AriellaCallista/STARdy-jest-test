import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import Profile from '../../src/screens/profile';

it("renders default elements", () => {
    const { getAllByText, getByPlaceholderText } = render(<Profile />);

    getByPlaceholderText("e.g. John Doe");
    // getByPlaceholderText("Select your gender");
    getByPlaceholderText("e.g. Science (no short form)");
    // getByPlaceholderText("Select your year of study");

})

it("should go to onboarding page on submit", () => {
    const navigation = {navigate: () => {}}
    jest.spyOn(navigation, 'navigate'); 

    const page = render(<Profile navigation={navigation} />);

    const submitButton = page.getByTestId('onboardingButton');

    fireEvent.press(submitButton);
    
    expect(navigation.navigate).toHaveBeenCalledWith('OnboardingScreen');
})

// need to test rendering of the pickers

it("renders the gender picker", () => {
    const page = render(<Profile />);

    const genderPicker = page.getByTestId("genderPicker");
    console.log(genderPicker);

})



