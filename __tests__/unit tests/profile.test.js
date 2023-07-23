import { saveChanges } from '../../src/api/firestore';
import { authentication, db } from '../../config';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { Alert } from 'react-native'


describe('Client firestore operations', () => {
    const navigation = {navigate: () => {}};
    jest.spyOn(navigation, 'navigate');

    it('successfuly save profile changes iff none of the fields are empty', async () => {
        saveChanges(navigation, 'test', 'F', 'Biomedical Sciences', '4');
        expect(setDoc).toHaveBeenCalledWith(doc(db, 'users', authentication.currentUser.email), {
            name: 'test',
            gender: 'F',
            major: 'Biomedical Sciences',
            year: '4',
          }, {merge: true})
    })

    it('fails to save profile changes if at least one of the fields is empty', () => {
        const res = saveChanges(navigation, 'test', 'F', null, false);
        expect(res).toEqual('Fail');
        //expect(Alert.alert).toHaveBeenCalledWith('Fields cannot be empty!') // bc of no fireEvent press?
    })
})
