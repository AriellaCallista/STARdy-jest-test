import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import Tasks from '../../src/screens/tasks';
import Home from '../../src/screens/home';
import Evidence from '../../src/components/tasks/evidence'; 
import { Alert } from 'react-native';
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 
import { ListItem } from '../../src/components/chat/listItem';

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const mockedParams = {
    route: { params: { uid: 12345, email: 'test@gmail.com', matched: null }},
}

it("be able to upload evidence", () => {
  const { getByTestId } = render(
    <Evidence {...mockedParams} />
  );
  expect(getByTestId("uploadButton")).toBeTruthy(); 
});

describe('Evidence screen', () => {
 
  it('should navigate to Main Tab upon finalizing evidence', () => {
      const navigation = {navigate: () => {}}
      // spyOn(navigation, 'navigate'); 
      jest.spyOn(navigation, 'navigate'); 

      const page = render(<Evidence navigation={navigation} {...mockedParams}/>); 

      const finalizeButton = page.getByTestId('finalizeButton'); 

      fireEvent.press(finalizeButton); 

      expect(navigation.navigate).toHaveBeenCalledWith("Main Tab"); 

  }) 
})


