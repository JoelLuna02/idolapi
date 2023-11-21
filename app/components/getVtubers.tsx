/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import '../divider.css'
import { format } from 'date-fns'
import { Ubuntu_Mono } from "next/font/google";

const ubuntumono = Ubuntu_Mono({ subsets: ['latin'], weight: ['400']})

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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#fff" fillOpacity="1" d="M0,0L20,16C40,32,80,64,120,96C160,128,200,160,240,170.7C280,181,320,171,360,144C400,117,440,75,480,74.7C520,75,560,117,600,112C640,107,680,53,720,48C760,43,800,85,840,117.3C880,149,920,171,960,181.3C1000,192,1040,192,1080,197.3C1120,203,1160,213,1200,186.7C1240,160,1280,96,1320,69.3C1360,43,1400,53,1420,58.7L1440,64L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"></path>
        </svg>
        <div className="container">
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading fw-bold">Website under construction</h4><hr></hr>
            <p style={{ lineHeight: '1.1'}} className={ubuntumono.className}>
              We are excited to have you here as we build a unique experience for you. Our website is in the middle of construction, 
              and we are working hard to provide you with the best possible platform. We want to inform you that some sections of 
              IdolAPI will be under constant development as we refine and expand our features. We are committed to providing you
              with quality service, and your patience and understanding are greatly appreciated. As we continue on this exciting
              journey, we invite you to explore the available functionality and follow us to receive updates on new features we
              are developing. Your participation and feedback are critical to the success of IdolAPI, and we look forward to
              receiving your suggestions. Thank you for joining us on this exciting journey. We're building something amazing
              together at IdolAPI!
            </p>
            <hr></hr>
            <code>A message from the developers :P</code>
          </div>
        </div>
        <div className="container-xxl p-5">
          <div className="divider d-flex align-items-center my-4">
            <h1 className="text-center fw-bold mx-3 mb-0">Idol VTubers</h1>
          </div>
          <div className="row gx-2 g-4">
            {vtubers.map((vtuber: any) => {
              return (
                <>
                  <div className="col-md-6" key={vtuber.id}>
                    <div className="card mb-3 mt-3 shadow rounded-fill">
                      <div className="row g-0">
                        <div className="col-md-6">
                          <Image
                            src={`http://localhost:3000${vtuber.avatarurl}`}
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
                            {vtuber.phrase === '' ? (
                              <p>No description</p>
                            ) : (
                              <p style={{ lineHeight: 1, fontSize: '0.9rem' }}>{vtuber.phrase}</p>
                            )}

                            <div style={{ lineHeight: 1, fontSize: '0.9rem' }}><span className="fw-bold">Status</span>:
                              {vtuber.graduated ? (
                                <span><i className="fa-solid fa-circle text-danger ms-1 me-1"></i>Graduated</span>
                              ) : (
                                <span><i className="fa-solid fa-circle text-success ms-1 me-1"></i>Active</span>
                              )
                              }
                              <br></br>
                            </div>
                            <p style={{ lineHeight: 1.3, fontSize: '0.95rem' }}>
                              <span className="fw-bold">Debut date: </span>
                              { format(new Date(`${vtuber.debut}`), 'EEEE d MMMM HH:mm:ss') }
                              <br></br>
                              <span className="fw-bold">Branch</span>: {vtuber.branch}<br></br>
                              <span className="fw-bold">Unit</span>: {vtuber.unit}<br></br>
                              <span className="fw-bold">Fanname</span>: {vtuber.fanname}<br></br>
                              <span className="fw-bold">Zodiac sign</span>: {vtuber.zodiac}
                            </p>
                          </div>
                          <div className="card-footer">
                            <Link role="button" className="btn btn-dark" href={`http://localhost:3000/api/vtuber/${vtuber.id}`} target="_blank">View in JSON</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
          <div className="p-4 alert alert-primary" role="alert">
            <strong>Tip:</strong>
            You can reload the page to get more results.
          </div>
          <div className="text-center pt-3">
            <Link role="button" className="btn btn-dark" href='http://localhost:3000/api/vtuber' target="_blank">View Full list in JSON</Link>
          </div>
        </div>
      </section>
      <section className="bg-light">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#f1f2f3" fillOpacity={1} d="M0,64L21.8,90.7C43.6,117,87,171,131,181.3C174.5,192,218,160,262,128C305.5,96,349,64,393,48C436.4,32,480,32,524,58.7C567.3,85,611,139,655,133.3C698.2,128,742,64,785,80C829.1,96,873,192,916,234.7C960,277,1004,267,1047,224C1090.9,181,1135,107,1178,96C1221.8,85,1265,139,1309,165.3C1352.7,192,1396,192,1418,192L1440,192L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"></path>
      </svg>
      </section>
    </>
  )
}
