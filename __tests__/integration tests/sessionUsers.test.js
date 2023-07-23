import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import FocusTimer from '../../src/screens/focusTimer'
import { act, fireEvent, render, spyOn} from '@testing-library/react-native'; 
import SessionUsers from '../../src/screens/sessionUsers';

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('MainTab page', () => {
    test('testing presence of session users bottom tab bar', async () => {
        const component = (
            <NavigationContainer>
              <SessionUsers />
            </NavigationContainer>
          );
      
          const {getAllByTestId} = render(component);
      
          const sessionUsers = getAllByTestId('sessionUsers');
      
          expect(sessionUsers).toBeTruthy();
    });
}); 