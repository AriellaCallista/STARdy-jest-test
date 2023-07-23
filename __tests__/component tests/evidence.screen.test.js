import React from 'react'
import Evidence from '../../src/components/tasks/evidence';
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 
import { Alert } from 'react-native';
 

const mockedParams = {
    route: { params: { otherUserID: 12345 } },
}

describe('Evidence screen', () => {
 
    it('should be able to finalize evidence', () => {
        const navigation = {navigate: () => {}}
        // spyOn(navigation, 'navigate'); 
        jest.spyOn(navigation, 'navigate'); 

        const page = render(<Evidence navigation={navigation} {...mockedParams} />); 

        const finalizeButton = page.getByTestId('finalizeButton'); 

        fireEvent.press(finalizeButton); 

        expect(navigation.navigate).toHaveBeenCalledWith("Main Tab"); 
 
    }) 
})

describe('Evidence screen', () => {

    // it('should be able to show alert upon submission', () => {
    //     const navigation = {navigate: () => {}}
        
    //     jest.spyOn(Alert, 'alert');
        
    //     const page = render(<Evidence navigation={navigation} {...mockedParams} />); 

    //     const finalizeButton = page.getByTestId('finalizeButton'); 

    //     fireEvent.press(finalizeButton); 

    //     expect(Alert.alert).toHaveBeenCalledWith("Sorry, you've missed the deadline for submission", "Don't give up! You can start fresh today by doing another focus session :)")
 
    // }) 
    
    it("be able to upload evidence", () => {
        const { getByTestId } = render(
          <Evidence {...mockedParams} />
        );
        expect(getByTestId("uploadButton")).toBeTruthy(); //passes
      });
})

