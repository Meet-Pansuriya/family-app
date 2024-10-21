import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore/lite";
import { firebaseDb } from "../firebase/firebaseConfigs";
import { Family } from "../types";

export const addFamily = async (family: Family) => {
  try {
    // Add family to the "families" collection in Firestore
    const familyRef = await addDoc(collection(firebaseDb, "families"), family);
    return familyRef.id; // You can use this ID for further operations
  } catch (error) {
    console.error("Error adding family: ", error);
    throw new Error("Failed to add family.");
  }
};

export const getFamilyById = async (familyId: string) => {
  try {
    const familyDocRef = doc(firebaseDb, "families", familyId);
    const familyDoc = await getDoc(familyDocRef);
    if (familyDoc.exists()) {
      return familyDoc.data() as Family;
    } else {
      console.log("No such family document exists!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching family:", error);
    throw new Error("Failed to fetch family data.");
  }
};

export const fetchAllFamilies = async () => {
  try {
    const familiesCollectionRef = collection(firebaseDb, "families");
    const querySnapshot = await getDocs(familiesCollectionRef);

    const families = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Firebase document ID
      ...doc.data(), // The rest of the family data
    }));

    return families as Family[];
  } catch (error) {
    console.error("Error fetching families: ", error);
    throw new Error("Failed to fetch family data.");
  }
};

export const getFamiliesWithPagination = async (
  lastDoc = null,
  pageSize = 15
) => {
  let familiesQuery;

  if (lastDoc) {
    // If last document exists, start after it
    familiesQuery = query(
      collection(firebaseDb, "families"),
      orderBy("headOfFamily.name"),
      startAfter(lastDoc),
      limit(pageSize)
    );
  } else {
    // First query
    familiesQuery = query(
      collection(firebaseDb, "families"),
      orderBy("headOfFamily.name"),
      limit(pageSize)
    );
  }

  const familySnapshot = await getDocs(familiesQuery);

  // Extract families and last document (for pagination)
  const families = familySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const lastDocument = familySnapshot.docs[familySnapshot.docs.length - 1];

  return { families, lastDocument };
};
