import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import Docs from "./documentation.mdx";

export const metadata = {
  title: "Documentation - Comming soon!",
  description: "IdolAPI - A Fanmade RESTful API based in IdolCorp",
  author: "Hector Joel Luna",
  charset: "utf-8",
};

export default function Home() {
  return (
    <>
      <HeaderNav></HeaderNav>
      <main className="container">
        <Docs></Docs>
      </main>
      <Footer></Footer>
    </>
  );
}
