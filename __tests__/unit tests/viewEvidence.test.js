import { collection, getDocs, query, where } from "firebase/firestore";
import { authentication, db } from "../../config";
import { fetchUserEvidence } from "../../src/api/firestore";
import { isRootedExperimentalAsync } from "expo-device";


it('should fetch accountability partner evidence ', () => {
    fetchUserEvidence('test');
    expect(query).toHaveBeenCalledWith(collection(db, "evidence", "test", "images"), where("partner", "==", authentication.currentUser.uid))
})