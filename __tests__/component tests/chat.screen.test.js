import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import HomeChat from '../../src/screens/homeChat';
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Main Tab page', () => {
    test('testing navigation to chat list', async () => {
      const component = (
        <NavigationContainer>
          <HomeChat />
        </NavigationContainer>
      );

      const {getAllByTestId} = render(component);

      const chatList = getAllByTestId('chatList');
  
      expect(chatList).toBeTruthy();
    });
}); 

// describe('HomeChat page', () => {

//   it('testing navigation to chat page with partner', () => {
//       const navigation = {navigate: () => {}}
//       // spyOn(navigation, 'navigate'); 
//       jest.spyOn(navigation, 'navigate'); 

//       const page = render(<HomeChat navigation={navigation}/>); 

//       const chatUser = page.getByTestId('chatUser'); 

//       fireEvent.press(chatUser); 

//       expect(navigation.navigate).toHaveBeenCalledWith("Chatroom"); 

//   })
// }