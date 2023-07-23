import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import FocusTimer from '../../src/screens/focusTimer'
import { act, fireEvent, render, spyOn} from '@testing-library/react-native'; 
import MainTab from '../../src/navigation/mainTab';

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('MainTab page', () => {
    test('testing presence of timer bottom tab bar', async () => {
        const component = (
            <NavigationContainer>
              <FocusTimer />
            </NavigationContainer>
          );
      
          const {getAllByTestId} = render(component);
      
          const focusTimer = getAllByTestId('focusTimer');
      
          expect(focusTimer).toBeTruthy();
    });
}); 