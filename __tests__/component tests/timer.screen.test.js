import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import FocusTimer from '../../src/screens/focusTimer'
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('MainTab page', () => {
    test('testing focus timer', async () => {
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