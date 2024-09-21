import Header from "@/Components/Header";
import Products from "@/Components/Products";
import styles from './styles.module.css';

export default function Home() {
  return (
    <main className={ `${styles.bgColor} min-h-screen` }>
      <Header />
      <Products />
    </main>
  );
}
