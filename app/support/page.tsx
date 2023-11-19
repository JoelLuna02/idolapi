import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import Support from "./support.mdx";

export const metadata = {
  title: "Support this project - Comming soon!",
  description: "IdolAPI - A Fanmade RESTful API based in IdolCorp",
  author: "Hector Joel Luna",
  charset: "utf-8",
};

export default function Home() {
  return (
    <>
      <HeaderNav></HeaderNav>
      <main className="container">
        <Support></Support>
      </main>
      <Footer></Footer>
    </>
  );
}
