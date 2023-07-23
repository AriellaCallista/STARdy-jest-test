import React from 'react'
import Buttons from '../../src/components/dashboard/buttons'
import Dashboard from '../../src/screens/dashboard'; 
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 

describe('dashoard screen on clicking notes', () => {

    it('should go to notes page', () => {
        const navigation = {navigate: () => {}}
        // spyOn(navigation, 'navigate'); 
        jest.spyOn(navigation, 'navigate'); 

        const page = render(<Buttons navigation={navigation}/>); 

        const notesButton = page.getByTestId('notesButton'); 

        fireEvent.press(notesButton); 

        expect(navigation.navigate).toHaveBeenCalledWith("Notes"); 

    })
})