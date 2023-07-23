import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../../src/screens/dashboard'; 
import Requests from '../../src/components/dashboard/requests';
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'android', // or 'ios'
    select: () => null
}));

const mockUserData = [{ name: 'test',
                        major: 'Science',
                        gender: 'F',
                        year: '1',
                        photoURL: 'url',
                        userID: 12345,
                        id: 12345 }];


describe('MainTab page', () => {
    test('testing navigation to Dashboard page ', async () => {
      const component = (
        <NavigationContainer>
          <Dashboard requests={mockUserData} />
        </NavigationContainer>
      );

      const {getAllByTestId} = render(component);

      const dashboard = getAllByTestId('dashboard');
  
      expect(dashboard).toBeTruthy();
    });
}); 

describe('Dashboard page', () => {
  test('testing user request list ', async () => {
    const page = render(<Requests requests={mockUserData} currUserMatched={null}/>);

    const request = page.getAllByTestId('request');

    expect(request).toBeTruthy();
  });
}); 
