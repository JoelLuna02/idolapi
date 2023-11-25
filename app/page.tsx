import Footer from "./components/Footer";
import HeaderNav from "./components/HeaderNav";
import VTubers from "./components/getVtubers";

export const metadata = {
    title: "Comming soon!",
    description: "IdolAPI - A Fanmade RESTful API based in IdolCorp",
    themeColor: "#111213",
    author: "Hector Joel Luna",
    charset: "utf-8",
};

export default async function Home() {
    return (
        <>
            <HeaderNav></HeaderNav>
            <main className="">
                <div className="container-xxl p-2 text-center">
                    <h1 className="fw-bold display-4 pt-5">
                        IdolAPI - A RESTful API based in Idol Corp.
                    </h1>
                    <p>The new site of your Favorite vtubers</p>
                </div>
            </main>
            <Footer></Footer>
        </>
    );
}
