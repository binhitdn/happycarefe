import { useEffect } from "react";
import { useState } from "react";
import { handleGetCountBooking, handleGetCountDoctor, handleGetCountPatient, handleGetCountUser } from "../../../services/systemService";
import "./scss/Statistical.scss"
import CountUp from 'react-countup';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { handleGetIncomeAllDoctorApi } from "../../../services/doctorService";


function Statistical(){
    const [countDoctor, setCountDoctor] = useState(0);
    const [countPatient, setCountPatient] = useState(0);
    const [countUser, setCountUser] = useState(0);
    const [countBooking, setCountBooking] = useState(0);
    const [DoctorIncome, setDoctorIncome] = useState([]);
    let getData = async() => {
        let dataDoctor = await handleGetCountDoctor(); 
        setCountDoctor(dataDoctor.data);
        let dataPatient = await handleGetCountPatient();
        setCountPatient(dataPatient.data);
        let dataUser = await handleGetCountUser();
        setCountUser(dataUser.data);
        let dataDoctorIncome = await handleGetIncomeAllDoctorApi('ALL');
        console.log("dataDoctorIncome: ", dataDoctorIncome);
        setDoctorIncome(dataDoctorIncome.data);
    }
    useEffect(() => {
        getData();
    },[])
    let parseCurrency = (number) => {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return (
        <div className="statistical">
            <div className="statistical__header">
                
            </div>
            <div className="statistical__body">
                <div className="div_statistical_item">
                    <div className="statistical_data t-orange">
                    <CountUp end={countDoctor} 
                    delay={2}
                    duration={3}
                    
                    />
                    </div>
                    <div className="statistical_title t-orange">
                    <i class="fa-solid fa-user-doctor"></i>
                        B??c s??
                    </div>

                </div>
                <div className="div_statistical_item">
                    <div className="statistical_data t-blue">
                    <CountUp end={countPatient} 
                    delay={2}
                    duration={3}
                    
                    />
                    </div>
                    <div className="statistical_title t-blue">
                    <i class="fa-solid fa-hospital-user"></i>
                        T???ng s??? B???nh Nh??n
                    </div>

                </div>
                <div className="div_statistical_item">
                    <div className="statistical_data t-green">
                    <CountUp end={countUser} 
                    delay={2}
                    duration={3}
                    
                    />
                    </div>
                    <div className="statistical_title t-green">
                    <i class="fa-solid fa-user"></i>
                        T???ng s??? Ng?????i D??ng
                    </div>

                </div>
                <div className="div_statistical_item">
                    <div className="statistical_data t-red">
                    <CountUp end={23} 
                    delay={2}
                    duration={3}
                    
                    />
                    </div>
                    <div className="statistical_title t-red">
                    <i class="fa-solid fa-calendar-days"></i>
                        T???ng s??? L???ch ?????t Kh??m
                    </div>

                </div>
            </div>
            <div className="statistical__footer row">
                <div className="col-11">
                    <h4 className="t-orange">B??c s?? c?? thu nh???p cao nh???t</h4>
                <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>H??? T??n</th>
          <th scope='col'>S??? L???ch ?????t/Thu nh???p</th>
          
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {
            DoctorIncome.map((item, index) => {
                return (
                    <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src={item.image}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>
                    {item.lastName} {item.firstName}
                </p>
                <p className='text-muted mb-0'>
                    {item.email}
                </p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>
                {item.total}
            </p>
            <p className='text-muted mb-0'>
                {parseCurrency(item.total*item.priceId)} VN??
            </p>
          </td>
          
          
          
        </tr>
                )

            }
            )
        }
        
      </MDBTableBody>
    </MDBTable>
               
                </div>
                
            

            </div>
            <div
                className="background-schedule"
                        style={{
                            backgroundImage: `url("https://images.squarespace-cdn.com/content/v1/5c702dbd4d8711d477f494d9/1569871998046-CJH4FH2GKDTTZ95M3IK1/AdobeStock_198920008+%5BConverted%5D.png?format=2500w")`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            width: "100%",
                            height: "100%",
                            position: "fixed",
                            top: "0",
                            right: "0",
                            zIndex: "-1",
                            opacity: "0.1"
                        }}

            >
            </div> 
        </div>
    )
}
export default Statistical;