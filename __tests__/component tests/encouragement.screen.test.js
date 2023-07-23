import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import Buttons from '../../src/components/dashboard/buttons';

it("should go to encouragement quotes page", () => {
    const navigation = {navigate: () => {}}
    jest.spyOn(navigation, 'navigate'); 

    const page = render(<Buttons navigation={navigation} />);

    const toDoButton = page.getByTestId('encouragementButton');

    fireEvent.press(toDoButton);
    
    expect(navigation.navigate).toHaveBeenCalledWith('Encouragement Notes!');
})


// need to test rendering of the pickers

// it("renders the gender pciker", () => {
//     const page = render(<Profile />);

//     const genderPicker = page.getByTestId("genderPicker");
//     console.log(genderPicker);


// })



