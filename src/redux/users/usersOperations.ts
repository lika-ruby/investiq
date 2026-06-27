import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { db } from "../../firebase";

import { onAuthStateChanged } from "firebase/auth";
import { store } from "../store";
import { setUser, setLoading } from "./usersSlice";

const formatUser = (user: any) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || null,
});

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: null,
    operations: [],
    startingBalance: 0,
  });

  return {
    uid: user.uid,
    email: user.email,
    displayName: null,
  };
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return formatUser(userCredential.user);
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const updateUser = async (name: string) => {
  if (!auth.currentUser) return null;

  await updateProfile(auth.currentUser, {
    displayName: name,
  });

  return formatUser(auth.currentUser);
};

export const addOperation = async (operation: any) => {
  if (!auth.currentUser) return;

  const ref = doc(db, "users", auth.currentUser.uid);

  await updateDoc(ref, {
    operations: arrayUnion(operation),
  });

  return operation;
};

export const delOperation = async (operation: any) => {
  if (!auth.currentUser) return;

  const ref = doc(db, "users", auth.currentUser.uid);

  await updateDoc(ref, {
    operations: arrayRemove(operation),
  });
};

export const getUserData = async () => {
  if (!auth.currentUser) return null;

  const ref = doc(db, "users", auth.currentUser.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data();
};

export const initAuthListener = () => {
  store.dispatch(setLoading(true));

  onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      store.dispatch(setUser(null));
      store.dispatch(setLoading(false));
      return;
    }

    const ref = doc(db, "users", firebaseUser.uid);
    const snap = await getDoc(ref);

    const data = snap.exists() ? snap.data() : {};

    store.dispatch(
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        operations: data.operations || [],
        startingBalance: data.startingBalance || 0,
      })
    );

    store.dispatch(setLoading(false));
  });
};

export const updateStartingBalance = async (balance: number) => {
  if (!auth.currentUser) return;

  const ref = doc(db, "users", auth.currentUser.uid);

  await updateDoc(ref, {
    startingBalance: balance,
  });

  return balance;
};
