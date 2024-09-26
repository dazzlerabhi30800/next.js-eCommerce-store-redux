"use client";
import { useProductStore } from "@/store/store";
import { auth, provider } from "@/utils/FirebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styles from '@/app/styles.module.css';

interface loginAuth {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const state = useProductStore((state) => state);
  const { setUser, emptyCart } = state;
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
      if (!user) {
        emptyCart();
      }
    });
    return () => unSub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = credentials;
    if (email.length < 5 || password.length < 5) return;
    try {
      signInWithEmailAndPassword(auth, email, password).then(() => {
        router.push("/");
      });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <section className="flex-1 h-full flex items-center justify-center">
      <div className="p-4 sm:p-7 rounded-lg bg-pink-300/70 min-w-[300px] w-full max-w-[450px] text-black flex flex-col shadow-lg gap-5">
        <form onClick={handleSubmit} className="flex flex-col gap-5">
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
          className={ `${styles.flexCenter} gap-2 bg-gradient-to-l to-pink-500 from-blue-500  text-lg p-3 rounded-lg font-bold text-white hover:brightness-125` }
        >
          <FcGoogle className="text-2xl" />
          Google Auth
        </button>
        <p className="md:text-lg text-center font-medium">
          Doesn't have an account?{" "}
          <Link className="hover:underline" href="/signUp">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
