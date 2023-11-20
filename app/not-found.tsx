import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";

export const metadata = {
    title: "Aviel, where are you?",
    description: "IdolAPI - A Fanmade RESTful API based in IdolCorp",
    author: "Hector Joel Luna",
    charset: "utf-8",
};

export default function NotFound() {
    return (
        <>
        <HeaderNav></HeaderNav>
        <div className="container text-center">
            <div style={{ paddingTop: '10rem', paddingBottom: '12rem'}}>
                <h1 className="justify-content-center">
                    <span className="fw-bold">404
                    </span><span className="me-3 ms-4">|</span> Page not found!
                </h1>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}