import Image from "next/image";
import Link from "next/link";

const getVTubers = async () => {
    const res = await fetch('http://localhost:3000/api/vtuber/random-vtubers', { cache: 'no-cache' })
    if (!res.ok) { throw new Error('Failed to fetch data') }
    const data = await res.json()
    return data
}

export default async function VTubers() {
    const vtubers = await getVTubers()
    return (
        <>
            <section style={{ backgroundColor: '#f1f2f3' }}>
            <div className="container-xxl p-5">
                <div className="text-center">
                    <h1 className="display-5 p-5 fw-bold">{'Try it now!'}</h1>
                </div>
                <div className="row gx-2 row-cols-1 row-cols-md-3 g-4">
                    {vtubers.map((vtuber: any) => {
                        return (
                            <>
                                <div className="col-md-6" key={vtuber.id}>
                                    <div className="card mb-3 mt-3 shadow rounded-fill">
                                        <div className="row g-0">
                                            <div className="col-md-6">
                                                <Image
                                                    src={`http://localhost:8080${vtuber.avatarurl}`}
                                                    alt="" width={730} height={730}
                                                    className="w-100 h-100 img-fluid rounded-start"
                                                    style={{ objectFit: "cover", objectPosition: "center" }}>
                                                </Image>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-header">
                                                    <h4 className="card-title fw-bold">{vtuber.emoji} {vtuber.fullname}</h4>
                                                </div>
                                                <div className="card-body">
                                                    { vtuber.phrase === '' ? (
                                                        <p>No description</p>
                                                    ) : (
                                                        <p style={{ lineHeight: 1, fontSize: '0.9rem' }}>{vtuber.phrase}</p>
                                                    )}
                                                    
                                                    <div style={{ lineHeight: 1, fontSize: '0.9rem' }}><span className="fw-bold">Status</span>:
                                                    { vtuber.graduated ? (
                                                        <span><i className="fa-solid fa-circle text-danger ms-1 me-1"></i>Graduated</span>
                                                    ): (
                                                        <span><i className="fa-solid fa-circle text-success ms-1 me-1"></i>Active</span>
                                                    )
                                                    }
                                                    <br></br>
                                                    </div>
                                                    <p style={{ lineHeight: 1, fontSize: '0.95rem' }}>
                                                        <span className="fw-bold">Branch</span>: {vtuber.branch}<br></br>
                                                        <span className="fw-bold">Unit</span>: {vtuber.unit}<br></br>
                                                        <span className="fw-bold">Fanname</span>: {vtuber.fanname}<br></br>
                                                        <span className="fw-bold">Zodiac sign</span>: {vtuber.zodiac}
                                                    </p>
                                                </div>
                                                <div className="card-footer">
                                                    <Link role="button" className="btn btn-dark" href={`http://localhost:8080/api/vtuber/${vtuber.id}`} target="_blank">View in JSON</Link>
                                                </div>             
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className="text-center pt-3">
                    <Link role="button" className="btn btn-dark" href='http://localhost:8080/api/vtuber' target="_blank">View Full list in JSON</Link>
                </div>
            </div>
            </section>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#f1f2f3" fillOpacity={1} d="M0,64L21.8,90.7C43.6,117,87,171,131,181.3C174.5,192,218,160,262,128C305.5,96,349,64,393,48C436.4,32,480,32,524,58.7C567.3,85,611,139,655,133.3C698.2,128,742,64,785,80C829.1,96,873,192,916,234.7C960,277,1004,267,1047,224C1090.9,181,1135,107,1178,96C1221.8,85,1265,139,1309,165.3C1352.7,192,1396,192,1418,192L1440,192L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"></path>
            </svg>
        </>
    )
}
