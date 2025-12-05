import Board from "@/components/Board/Board";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Board />
    </main>
  );
}
