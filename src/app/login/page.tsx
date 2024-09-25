"use client";
import { useProductStore } from "@/store/store";
import { auth, provider } from "@/utils/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface loginAuth {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const state = useProductStore((state) => state);
  const { setUser } = state;
  const [credentials, setCredentials] = useState<loginAuth>({
    email: "",
    password: "",
  });
  const googleAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unSub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = credentials;
    if (email.length < 5 || password.length < 5) return;
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          updateProfile(userCredentials.user, {
            displayName: "Abhishek Choudary",
          });
        },
      );
    } catch (err) {
      alert(err);
    }
  };
  return (
    <section className="flex-1 bg-red-200 h-full flex items-center justify-center">
      <div className="p-7  rounded-lg bg-pink-300/70 min-w-[300px] w-full max-w-[450px] text-black flex flex-col shadow-lg gap-7">
        <form onClick={handleSubmit} className="flex flex-col gap-7">
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
            Submit
          </button>
        </form>
        <button
          onClick={googleAuth}
          className="bg-gradient-to-l from-blue-500 to-pink-500 text-lg p-3 rounded-lg font-bold text-white hover:brightness-125"
        >
          Google Auth
        </button>
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

export default Login;
