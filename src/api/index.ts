import { addDoc, collection, DocumentData, DocumentReference, serverTimestamp } from 'firebase/firestore'
import { database } from './firebase'

export const createList = (
    uid: string,
    title: string,
    color: string,
    callback: (ref: DocumentReference<DocumentData>) => any
) => {
    const currentTime = serverTimestamp()
    addDoc(collection(database, 'lists'), {
        uid,
        title,
        color,
        items: [],
        createdAt: currentTime,
        editedAt: currentTime,
    })
        .then(ref => {
            callback(ref)
        })
        .catch(error => {
            console.log(error)
        })
}
