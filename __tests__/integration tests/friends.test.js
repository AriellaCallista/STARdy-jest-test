import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import FocusTimer from '../../src/screens/focusTimer'
import { act, fireEvent, render, spyOn} from '@testing-library/react-native'; 
import SessionUsers from '../../src/screens/sessionUsers';
import Friends from '../../src/components/sessionUsers/friends'

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Session users page', () => {
    test('testing presence of friends top bar', async () => {
        const component = (
            <NavigationContainer>
              <Friends />
            </NavigationContainer>
          );
      
          const {getAllByTestId} = render(component);
      
          const friends = getAllByTestId('friendList');
      
          expect(friends).toBeTruthy();
    });
}); 