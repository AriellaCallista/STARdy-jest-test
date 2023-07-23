import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import SessionUsers from '../../src/screens/sessionUsers';
import Friends from '../../src/components/sessionUsers/friends';
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Session users page', () => {
    test('testing navigation to friend list ', async () => {
      const component = (
        <NavigationContainer>
          <Friends />
        </NavigationContainer>
      );

      const {getAllByTestId} = render(component);

      const friendList = getAllByTestId('friendList');
  
      expect(friendList).toBeTruthy();
    });
}); 