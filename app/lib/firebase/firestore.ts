import firebase_app from "./config";
import {getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc} from "firebase/firestore";
import {PantryItem} from "@/app/lib/models";

const db = getFirestore(firebase_app)
const collectionId = "pantry-items";

export async function AddRecord(data: PantryItem) {
    let result = null;
    let error = null;

    try {
        await setDoc(doc(db, collectionId, data.id), data);
        return true;
    } catch (e) {
        return false;
    }
}

export async function EditRecord(data: PantryItem) {
    let result = null;
    let error = null;

    try {
        await setDoc(doc(db, collectionId, data.id), data);
        return true;
    } catch (e) {
        return false;
    }
}

export async function DeleteRecord(id: string) {
    try {
        await deleteDoc(doc(db, collectionId, id));
        return true;
    } catch (e) {
        return false;
    }
}

export async function GetAllRecords(): Promise<PantryItem[]> {
    const querySnapshot = await getDocs(collection(db, collectionId));

    return querySnapshot.docs.map(doc => {
        return doc.data() as PantryItem;
    });
}