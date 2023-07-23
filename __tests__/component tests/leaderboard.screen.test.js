import React from 'react'
import ProgressBar from '../../src/components/dashboard/progressBar';
import Global from '../../src/screens/global';
import Friends from '../../src/screens/friends';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 

describe('ProgressBar in dashboard page', () => {

    it('should go to Leaderboard page', () => {
        const navigation = {navigate: () => {}}
        // spyOn(navigation, 'navigate'); 
        jest.spyOn(navigation, 'navigate');  

        const page = render(
        <NavigationContainer>
             <ProgressBar navigation={navigation} />
        </NavigationContainer>
       ); 

        const leaderboardButton = page.getByTestId('leaderboardButton'); 

        fireEvent.press(leaderboardButton); 

        expect(navigation.navigate).toHaveBeenCalledWith("Leaderboard"); 

    })
})

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


describe('leaderboard page', () => {
    test('testing the presence of friends tab ', async () => {
      const component = (
        <NavigationContainer>
          <Friends />
        </NavigationContainer>
      );

      const {getAllByTestId} = render(component);

      const friends = getAllByTestId('friends');
  
      expect(friends).toBeTruthy();
    });
});

// describe('leaderboard page', () => {
//     test('testing the presence of global tab ', async () => {
//       const component = (
//         <NavigationContainer>
//           <Global />
//         </NavigationContainer>
//       );

//       const {getAllByTestId} = render(component);

//       const global = getAllByTestId('global');
  
//       expect(global).toBeTruthy();
//     });
// });