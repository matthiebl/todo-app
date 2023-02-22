import { addDoc, collection, DocumentData, DocumentReference, serverTimestamp } from 'firebase/firestore'
import { database } from './firebase'

export const createList = (
    uid: string,
    title: string,
    tag: string,
    callback: (ref: DocumentReference<DocumentData>) => any
) => {
    const currentTime = serverTimestamp()
    addDoc(collection(database, 'lists'), {
        uid,
        title,
        tags: [tag],
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
