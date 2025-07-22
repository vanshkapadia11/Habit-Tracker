// utils/firestoreFunctions.js
import { db } from "../firebase";
import {
  collection,
  setDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";

// ✅ Update progress of a specific habit inside habits array
export const updateHabitProgress = async (
  uid,
  habitId,
  updatedProgress,
  title = null,
  description = null
) => {
  const userRef = doc(db, "todoUsers", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    const updatedHabits = data.habits.map((habit) => {
      if (habit.id === habitId) {
        return {
          ...habit,
          progress: updatedProgress,
          ...(title && { title }),
          ...(description && { description }),
        };
      }
      return habit;
    });

    await updateDoc(userRef, { habits: updatedHabits });
  }
};

export const deleteHabit = async (uid, habitId) => {
  const userRef = doc(db, "todoUsers", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    const updatedHabits = data.habits.filter((habit) => habit.id !== habitId);

    await updateDoc(userRef, {
      habits: updatedHabits,
    });
  }
};

// Create
export const addUserData = async (uid, habit) => {
  const userRef = doc(db, "todoUsers", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    updateDoc(userRef, {
      habits: arrayUnion(habit), // Dont Forget The Array Union Stuff Man!!
    });
  } else {
    updateDoc(userRef, {
      habits: [habit],
    });
  }
};

// Read --> Get All The User Data In An Array!! --> Bhai Yaha Pe Jo Update Ka Code Hai Wo Tune Idhar Likh Diya Hai!!
export const getUserData = async () => {
  const usersRef = collection(db, "todoUsers");
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update
export const updateUserData = async (id, newData) => {
  const docRef = doc(db, "todoUsers", id);
  await updateDoc(docRef, newData);
};

// Delete
export const deleteUserData = async (id) => {
  const docRef = doc(db, "todoUsers", id);
  await deleteDoc(docRef);
};

// ✅ Get a single user's data by UID
export const getUserDataByUid = async (uid) => {
  try {
    const userRef = doc(db, "todoUsers", uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      return snapshot.data(); // ✅ returns the document data
    } else {
      console.warn("User not found with UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching user data:", error.message);
    return null;
  }
};
