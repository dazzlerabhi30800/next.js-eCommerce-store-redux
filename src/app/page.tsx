"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
export default function Home() {
  const dispatch = useAppDispatch();
  const [loading, todos] = useAppSelector((state) => [
    state.todoReducer.loading,
    state.todoReducer.todos,
  ]);
  // console.log({ loading, todos });
  console.log(todos);
  return (
    <div className="flex justify-center items-center min-h-screen">
      Hello World
    </div>
  );
}
