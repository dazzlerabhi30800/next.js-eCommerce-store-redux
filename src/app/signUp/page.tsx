"use client";
import React, { useEffect, useState } from "react";
import { useProductStore } from "@/store/store";
import { auth } from "@/utils/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";

interface loginAuth {
  name: string;
  email: string;
  password: string;
}

const page = () => {
  const router = useRouter();
  const state = useProductStore((state) => state);
  const { setUser, emptyCart, user } = state;
  const [credentials, setCredentials] = useState<loginAuth>({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        emptyCart();
      }
    });
    return () => unSub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    if (email.length < 5 || password.length < 5 || name.length < 5) return;
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          updateProfile(userCredentials.user, {
            displayName: name,
          });
          router.push("/");
        },
      );
    } catch (err) {
      alert(err);
    }
  };

  return (
    <section className="flex-1 h-full flex items-center justify-center">
      <div className="p-4 sm:p-7 rounded-lg bg-pink-300/70 min-w-[300px] w-full max-w-[450px] text-black flex flex-col shadow-lg gap-7">
        <form onClick={handleSubmit} className="flex flex-col gap-7">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              }
              value={credentials.name}
              className="rounded-lg w-full border border-gray-600 p-3 bg-transparent placeholder:text-gray-500 text-black"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your Email"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              value={credentials.email}
              className="rounded-lg w-full border border-gray-600 p-3 bg-transparent placeholder:text-gray-500 text-black"
            />
          </div>
          <div>
            <input
              type="password"
              value={credentials.password}
              placeholder="Enter your Password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="rounded-lg border w-full border-gray-600 p-3 bg-transparent placeholder:text-gray-500 text-black"
            />
          </div>
          <button className="bg-black/80 text-white text-lg font-bold hover:bg-white hover:text-black p-3 rounded-lg">
            Create Account
          </button>
        </form>

        <button
          onClick={() => signOut(auth)}
          className="bg-gradient-to-l from-blue-500 to-pink-500 text-lg p-3 rounded-lg font-bold text-white hover:brightness-125"
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default page;
