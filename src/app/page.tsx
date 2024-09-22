import Header from "@/Components/Header";
import styles from "./styles.module.css";
import Products from "@/Components/Products";

export default function Home() {
  return (
    <main className={`${styles.bgColor} min-h-screen`}>
      <Header />
      <Products />
    </main>
  );
}
