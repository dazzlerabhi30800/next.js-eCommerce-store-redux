"use client";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import storage from "redux-persist/lib/storage";

const createNoopStorage = () => {
  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
};

const storageEngine =
  typeof window !== "undefined"
    ? // ? createWebStorage("local")
      storage
    : createNoopStorage();

export default storageEngine;
