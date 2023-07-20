import { db } from "../../config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { queryUsersByMajorAndYear } from "../../src/api/firestore";
import { isRootedExperimentalAsync } from "expo-device";


it('should filter users based on same major and year', () => {
    queryUsersByMajorAndYear('Science', '1');
    expect(query).toHaveBeenCalledWith(collection(db, "users"), where("major", "==", "Science"), where("year", "==", "1"),  where("appState", "==", "active"))
})