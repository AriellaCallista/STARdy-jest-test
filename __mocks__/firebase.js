import { onAuthStateChanged } from "firebase/auth";

// mocks
jest.mock("firebase/app", () => {
    return {
      initializeApp: jest.fn(() => Promise.resolve(true)),
    }
  });
  
jest.mock("firebase/auth", () => {
    return {
        // getAuth: jest.fn(() => Promise.resolve(true)),
        getAuth: jest.fn(() => Promise.resolve(true)).mockReturnValue({ currentUser: { uid: 'uid', email: 'test@gmail.com'}}),
        createUserWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
        signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
        onAuthStateChanged: jest.fn()
    }
})
  
jest.mock("firebase/firestore", () => {
    return {
      // collection: () => ({
      //   get: () => ({
      //     docs:_tareas.list.map(index => ({
      //       data: () => _tareas.byId[index],
      //       id: index,
      //     }))
      //   }),
      //   add: (tarea) => {
      //     const newIndex = _tareas.list.length
      //     _tareas.list.push(newIndex)
      //     _tareas.byId[newIndex] = tarea
      //   }
      // }),
      // collection: jest.fn(() => {
      //   return {
      //     doc: jest.fn(() => {
      //       return {
      //         get: jest.fn(() => Promise.resolve(true)),
      //         update: jest.fn(() => Promise.resolve(true)),
      //         onSnapshot: jest.fn(() => Promise.resolve(true)), 
      //       }
      //     }),
      //     where: jest.fn(() => {
      //       return {
      //         get: jest.fn(() => Promise.resolve(true)),
      //         onSnapshot: jest.fn(() => Promise.resolve(true)),
      //       }
      //     }),
          
      //   }}),
      doc: jest.fn().mockReturnValue,
      getFirestore: jest.fn(),
      getDoc: jest.fn(() => {
        return {
          get: jest.fn(),
          set: jest.fn()
        }
      }),
      getDocs: jest.fn(() => {
        return {
            forEach: jest.fn()
        }
      }),
      query: jest.fn(),
      setDoc: jest.fn(() => Promise.resolve(true)),
      orderBy: jest.fn(),
      limit: jest.fn(),
      collection: jest.fn(),
    //   collection: jest.fn(() => {
    //     return {
    //         query: jest.fn(() => {
    //             return {
    //                 snapshot: {
    //                     return {
    //                         map: jest.fn(() => {
    //                             return {
    //                                 docs: [{
    //                                     data: () => {},
    //                                     id: 'id-for-this-dataf-item' 
    //                                 }]

    //                             }
    //                         })
    //                     }
                        
    //                 }
    //             }
    //         })   
    //     }
        
    //   }),
      map: jest.fn(),
      where: jest.fn(),
      deleteDoc: jest.fn(),
     
    }
})

// (getDataCollection as any).mockImplementation(() => ({
//     query: {
//       docs:[{
//         data: () => ({
//           id: 'id-for-this-data-item',
//           name: 'name-for-this-data-item',
//         }),
//       }],
//     },
//   }))
// })
  
jest.mock("firebase/storage", () => {
    return {
      getStorage: jest.fn(() => Promise.resolve(true)),
      ref: jest.fn(() => {
        return {
          child: jest.fn(() => {
            return {
              put: jest.fn(() => Promise.resolve(true))
            }
          })
        }
      })
    }
})