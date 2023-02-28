import { Inter } from "@next/font/google";
import Page from "./components/Page";
import Resume from "./components/resume";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // console.log(Window.CLUB_LIST);

  return <Resume />;
}
