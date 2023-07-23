import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Tasks from "../../src/screens/tasks";
import { NavigationContainer } from "@react-navigation/native";
import Verify from "../../src/components/tasks/verify";


const mockedParams = {
    route: { params: { uid: 12345, email: 'test@gmail.com', matched: null } },
}

const mockTask = [
    {
        id: 4,
        name: 'Task 4',
        task: 'Verification!',
        details: 'verify the evidence sent by your accountability partner', 
        Due: 'Deadline: 23:59 the next day'
    }
]

test('testing navigation to verification task page', () => {
    const navigation = {navigate: () => {}};
    jest.spyOn(navigation, "navigate")
    const page = render(
        <NavigationContainer>
            <Tasks {...mockedParams} mockTask={mockTask} navigation={navigation}/>
        </NavigationContainer>
    );
    const taskButton = page.getByTestId("taskButton");
    fireEvent.press(taskButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Verify',{otherUserEmail: "test@gmail.com" , otherUserID: 12345})

})

test("verify yes button renders", () => {
    const navigation = {navigate: () => {}};
    jest.spyOn(navigation, "navigate")
    const { getByTestId } = render(
      <Verify{...mockedParams} navigation={navigation}/>
    );
    expect(getByTestId("verifyYes")).toBeTruthy(); 
});

test("verify no button renders", () => {
    const navigation = {navigate: () => {}};
    jest.spyOn(navigation, "navigate")
    const { getByTestId } = render(
      <Verify {...mockedParams} navigation={navigation} />
    );
    expect(getByTestId("verifyNo")).toBeTruthy(); 
});

describe("testing navigation of verify buttons", () => {
    it("should navigate to main tab upon clicking yes", () => {
        const navigation = {navigate: () => {}};
        jest.spyOn(navigation, "navigate")
        const { getByTestId } = render(
        <Verify {...mockedParams} navigation={navigation} />
        );
        const yes = getByTestId("verifyYes");
        fireEvent.press(yes);
        expect(navigation.navigate).toHaveBeenCalledWith("Main Tab"); 

    })
    it("should navigate to main tab upon clicking no", () => {
        const navigation = {navigate: () => {}};
        jest.spyOn(navigation, "navigate")
        const { getByTestId } = render(
        <Verify {...mockedParams} navigation={navigation} />
        );
        const no = getByTestId("verifyNo");
        fireEvent.press(no);
        expect(navigation.navigate).toHaveBeenCalledWith("Main Tab"); 

    })
})


