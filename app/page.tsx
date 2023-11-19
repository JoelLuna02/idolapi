import Footer from "./components/Footer";
import HeaderNav from "./components/HeaderNav";
import VTubers from "./components/getVtubers";

export const metadata = {
    title: "Comming soon!",
    description: "IdolAPI - A Fanmade RESTful API based in IdolCorp",
    author: "Hector Joel Luna",
    charset: "utf-8",
};

export default async function Home() {
    return (
        <>
            <HeaderNav></HeaderNav>
            <main className="">
                <VTubers></VTubers>
            </main>
            <Footer></Footer>
        </>
    );
}
