import { db } from "../../config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { queryUsersByName } from "../../src/api/firestore";
import { isRootedExperimentalAsync } from "expo-device";


it('should filter users based on same major and year', () => {
    queryUsersByName('test');
    expect(query).toHaveBeenCalledWith(collection(db, "users"), where("name", ">=", "test"), where('name', '<=', "test" + '\uf8ff'))
})