import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import SessionUsers from '../../src/screens/sessionUsers'; 
import Friends from '../../src/components/sessionUsers/friends';
import Add from '../../src/components/sessionUsers/add';
import { Alert } from 'react-native';
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


describe('Session users page', () => {
    test('testing navigation to Add page ', async () => {
      const component = (
        <NavigationContainer>
          <Add/>
        </NavigationContainer>
      );

      const {getAllByTestId} = render(component);

      const addPage = getAllByTestId('addPage');
  
      expect(addPage).toBeTruthy();
    });
}); 

it("be able to search for friends", () => {
    const { getByTestId } = render(
      <Add />
    );
    expect(getByTestId("searchBar")).toBeTruthy(); //passes
});

// it("be able to add friends", () => {
//     const { getByTestId } = render(
//       <Add />
//     );
//     expect(getByTestId("addButton")).toBeTruthy(); //passes
//   });

//   describe('Add page', () => { 

//     it('should be able to show alert upon adding friends', () => {
        
//         jest.spyOn(Alert, 'alert');
        
//         const page = render(<Add />); 

//         const addButton = page.getByTestId('addButton'); 

//         fireEvent.press(addButton); 

//         expect(Alert.alert).toHaveBeenCalledWith("Friend added!", "Go to the friends page to start a focus session with your friend.")
 
//     }) 
// })