import Image from "next/image"

export default function Footer() {
    return (
        <footer className="bg-light text-center">
            <div className="container p-4">
                <div className="row gx-1 justify-content-md-center">
                    <div className="col-lg-3 align-self-center">
                        <p className="fw-bold">Frontend</p>
                        <Image src="/next.svg" alt={"Next.JS"} width={200} height={150}></Image>
                    </div>
                    <div className="col-lg-3 align-self-center">
                        <p className="fw-bold">Server</p>
                        <Image src="/expressjs.svg" alt={"Express.JS"} width={200} height={105}></Image>
                    </div>
                    <div className="col-lg-3 align-self-center">
                        <p className="fw-bold">Deploys</p>
                        <Image src="/vercel.svg" alt={"Vercel"} width={200} height={130}></Image>
                    </div>
                    <div className="col-lg-3 align-self-center">
                        <p className="fw-bold">Database operations</p>
                        <Image src="/prisma.svg" alt={"Prisma"} width={200} height={130}></Image>
                    </div>
                </div>
                
            </div>
            <div className="text-center p-3 " style={{ backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                © 2020 Copyright: IdolAPI, created by Hector Joel Luna
            </div>
        </footer>
    )
}