import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function saveConversion(
  userId,
  toolName,
  fileName,
  fileSize
) {
  await addDoc(collection(db, "history"), {
    userId,
    toolName,
    fileName,
    fileSize,
    createdAt: serverTimestamp(),
  });
}