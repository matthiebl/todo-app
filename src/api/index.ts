import {
    addDoc,
    collection,
    doc,
    DocumentData,
    DocumentReference,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore'
import { Item } from '../pages/TodoList'
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

export const getList = (id: string, callback: (list: DocumentData) => any) => {
    getDoc(doc(database, 'lists', id)).then(data => {
        if (data.exists()) callback(data.data())
    })
}

export const updateList = (id: string, items: Item[]) => {
    updateDoc(doc(database, 'lists', id), {
        items,
        editedAt: serverTimestamp(),
    })
}

export const getLists = (uid: string | null | undefined, callback: (lists: DocumentData[]) => any) => {
    if (!uid) return
    getDocs(query(collection(database, 'lists'), where('uid', '==', uid), orderBy('editedAt', 'desc'))).then(data => {
        let lists: DocumentData[] = []
        if (data)
            data.forEach(doc => {
                let list = doc.data()
                list.id = doc.id
                lists.push(list)
            })
        callback(lists)
    })
}
