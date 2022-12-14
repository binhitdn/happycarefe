import { useEffect } from "react";
import { handleAuth } from "../../../../Auth";
import "./Booking.scss"
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { handGetAllHandbookFinishedByPatient } from "../../../../services/bookingService";
import { useState } from "react";
import moment from "moment";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import ModalBookingReview from "./ModalBookingReview";
import { handleCreateNewReviewApi, handleEditReviewApi } from "../../../../services/doctorService";
function BookingReview() {
    let idUser = handleAuth().id;
    let navigate = useNavigate();
    const [booking, setBooking] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [bookingSelected, setBookingSelected] = useState(null);
    const [statusEdit, setStatusEdit] = useState(false);
    const [contentEdit, setContentEdit] = useState("");
    const [loading, setLoading] = useState(false);


    let getBooking = async () => {
        // let data = await handleGetBookingForPatientApi(handleAuth().id);
        refreshBooking();
        
    }
    let refreshBooking = async () => {
        let data = await handGetAllHandbookFinishedByPatient(handleAuth().id);
        let data2 =data.filter((item) => {
            return item.statusID === "S3";
        })
        

       
        setBooking(data2);
    }
    let handleToggleModal = async(item) => {
        

        // setBookingSelected(item);
        // setToggleModal(!toggleModal);
        // if(toggleModal) {
        //     let checkExistReview
        //     try {
        //         checkExistReview = item.reviewerBookingData.id;
        //         checkExistReview = true;
        //     } catch (error) {
        //         checkExistReview = false;
        //     }
            
        //     if(checkExistReview){
        //         setStatusEdit(true);
                
        //         setContentEdit({
        //             review: item.reviewerBookingData.review,
        //             rate: item.reviewerBookingData.rate
        //         });

    
                
        //     } else {
                
                
        //         setStatusEdit(false);
        //         setContentEdit({
        //             review: "",
        //             rate: 5
        //         });
        //     }
        //     setBookingSelected(item);

            
            

           
        // } else {
            
            
           
        // }
        setBookingSelected(item);
        setToggleModal(!toggleModal);
        
        // if(toggleModal) {
        //     let checkExistReview
            
        //     try {
        //         checkExistReview = item.reviewerBookingData.id;
        //         checkExistReview = true;
        //     } catch (error) {
        //         checkExistReview = false;
        //     }
            
        //     if(checkExistReview){
        //         setStatusEdit(true);
                
        //         setContentEdit({
        //             review: item.reviewerBookingData.review,
        //             rate: item.reviewerBookingData.rate
        //         });

    
                
        //     } else {
                
                
        //         setStatusEdit(false);
        //         setContentEdit({
        //             review: "",
        //             rate: 5
        //         });
        //     }
        //     setBookingSelected(item);

            
            

           
        // } 
    

        
        



    }
    let handleSaveReview = async(data) => {
            
        let a = await handleCreateNewReviewApi(data);
     
        toast.success("????nh gi?? th??nh c??ng");
        handleToggleModal();
        setLoading(!loading);
    }
    let handleEditReview = async(data) => {
        let a = await handleEditReviewApi(data);
        toast.success("C???p nh???t ????nh gi?? th??nh c??ng");
        handleToggleModal();
        setLoading(!loading);
    }

    useEffect(() => {
        if(idUser){
           
            getBooking();
        } else {
            navigate("/login");
            toast.error("B???n c???n ????ng nh???p ????? xem th??ng tin ?????t l???ch");
        }
    },[])
    useEffect(() => {
        if(idUser){
           
            getBooking();
        } else {
            navigate("/login");
            toast.error("B???n c???n ????ng nh???p ????? xem th??ng tin ?????t l???ch");
        }
    },[loading])
    

    return (

        <div className="my-booking">
                <div className="my-booking-header">
                <i class="fa-solid fa-circle-check"></i>
                    <span>L???ch kh??m ???? ho??n th??nh</span>
                </div>
                <div className="my-booking-body">
          {
            false &&       <table id="customers">
            <tr>
              <th>Id</th>
              <th>Bac Si</th>
              <th>Chuyen Khoa</th>
              <th>Thoi Gian</th>
              <th>Trang Thai</th>
              <th>Thao t??c</th>
            </tr>
            {
              booking && booking.map((item, index) => {
                  return (
                      <tr>
              <td>{item.id + 1}</td>
              <td>{item.doctorData.userData.lastName} {item.doctorData.userData.firstName}</td>
              <td>{item.doctorData.specialtyData.name}</td>
              <td>{item.timeTypeData2.valueEn} & {moment(item.date).format("DD-MM-YYYY")}</td>
              <td><i class="fas fa-check-circle"></i>
                      {/* {item.statusData.valueVi} */}
                      {
                          item.reviewerBookingData.id  ? "???? ????nh gi??" : "Ch??a ????nh gi??" 
                      }
              </td>
              <td>
                  <button className="btn btn-warning"
                  onClick={
                    () =>{
                        setToggleModal(!toggleModal)
                        if(toggleModal) {
                            handleToggleModal(item)
                        } 
                    }
                
                  }
                  >Xem chi ti???t</button>   
                  
              </td>
            </tr>
                  )
              })
            }
                          </table>
          }

{
    booking.length > 0 ? <MDBTable align='middle'

    >
          <MDBTableHead>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>B??c S??</th>
              <th scope='col'>Th???i gian</th>
              <th scope='col'>Tr???ng Th??i</th>
              <th scope='col'>Thao t??c </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            
            {
                     booking && booking.map((item, index) => {
                            return (
                                <tr key={index}>
                <td>{index}</td>
              <td>
                <div className='d-flex align-items-center'>
                  <img
                    src={item.doctorData.userData.image? item.doctorData.userData.image : 'https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png'}
                    alt=''
                    style={{ width: '45px', height: '45px' }}
                    className='rounded-circle'
                  />
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>
                    {item.doctorData.userData.lastName} {item.doctorData.userData.firstName}
                    </p>
                    <p className='text-muted mb-0'>
                    {item.doctorData.specialtyData.name}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>
                    {item.timeTypeData2.valueEn}
                </p>
                <p className='text-muted mb-0'>
                    {moment(item.date).format("DD-MM-YYYY")}
                </p>
              </td>
              <td>
                <MDBBadge color={
                    item.reviewerBookingData.id  ? "success" : "danger"
                } 
                 pill>
                    {
                        item.reviewerBookingData.id  ? "???? ????nh gi??" : "Ch??a ????nh gi??"
                    }
                </MDBBadge>
              </td>
              
              <td>
                {/* <MDBBtn color='warning' rounded size='sm'
                onClick={
                    handleEditUser(user)
                }
                >
                    <i className='fas fa-pencil-alt' />
                </MDBBtn>
                <MDBBtn color='danger' rounded size='sm'
                onClick={
                    handleDeleteUser(user.id)
                }
                >
                    <i className='fas fa-trash' />
                </MDBBtn> */}
                <button className="btn btn-warning"
                style={{
                    display: !item.reviewerBookingData.id  ? "block" : "none"
                }}
                onClick={
                    () => {
                        handleToggleModal(item)
                    }
                }
    
                                       
                                    >
                                        Xem v?? ????nh gi??
                                      <i className='fas fa-pencil-alt' />
                                    </button>
                                    <button className="btn btn-primary"
                                        style={{
                                            display: item.reviewerBookingData.id  ? "block" : "none"
                                        }}
                                        onClick={
                                        () => { 
                                            handleToggleModal(item)
                                            
    
                                        }
                                        }
                                          
                                    >
                                        Xem v?? s???a ????nh gi??
                                        <i className='fas fa-edit' />
                                    </button>
    
              </td>
            </tr>
                            )
                        })
                    }
    
            
          </MDBTableBody>
        </MDBTable> 
        : <div className="my-booking-body-empty">
        <img src="https://www.sussexdoctors.com.au/wp-content/uploads/2020/11/banner_center_img_mobile.png" alt="" />
        <p>B???n kh??ng c?? l???ch s??? l???ch h???n n??o!!</p>
        <span>G???p v???n ?????! H??y ?????t kh??m ngay</span>
      </div>
}


                </div>

                {toggleModal && <ModalBookingReview toggleModal={toggleModal}  info={bookingSelected} price={3000} handleToggleModal={handleToggleModal} 
                statusEdit={statusEdit}
                contentEdit={contentEdit}
                handleSaveReview={handleSaveReview}
                handleEditReview={handleEditReview}
// handleConfirmBooking = {handleConfirmBooking}
/>}
        </div>
                
    );
}
export default BookingReview;