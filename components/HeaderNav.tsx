import Link from "next/link";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = true;

export default function HeaderNav() {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow border border-0">
                    <div className="container-fluid container">
                        <Link className="navbar-brand" href="/">IdolAPI</Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                            aria-label="Toggle navigation"
                        >
                            <i className="fa-solid fa-compass"></i>
                        </button>

                        <div
                            className="offcanvas offcanvas-end"
                            tabIndex={-1}
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                        >
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                                <button type="button" className="btn btn-danger btn-floating" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div className="offcanvas-body p-4 pt-0 p-lg-0">
                                <hr className="d-lg-none text-dark-50"></hr>
                                <ul className="navbar-nav me-3 ms-auto mb-2 mb-lg-0 flex-row flex-wrap bd-navbar-nav">
                                    <li className="nav-item col-6 col-lg-auto">
                                        <Link className="nav-link py-2 px-0 px-lg-2" href="/docs">Documentation</Link>
                                    </li>
                                    <li className="nav-item col-6 col-lg-auto">
                                        <Link className="nav-link py-2 px-0 px-lg-2" href="/about">About</Link>
                                    </li>
                                    <li className="nav-item col-6 col-lg-auto">
                                        <Link className="nav-link py-2 px-0 px-lg-2" href="/support">Support</Link>
                                    </li>
                                </ul>

                                <hr className="d-lg-none text-dark-50"></hr>
                                <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
                                    <li className="nav-item col-6 col-lg-auto">
                                        <Link className="nav-link py-2 px-0 px-lg-2" href="#">
                                            <i className="fa-brands fa-github"></i>
                                            <small className="d-lg-none ms-2">GitHub</small>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div style={{ paddingTop: "3.5rem" }}></div>
        </>
    );
}
