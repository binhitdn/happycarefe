import Cookies from 'js-cookie'
import { useContext, useState } from 'react';
import  { Link, Navigate ,useNavigate} from 'react-router-dom'
import { handleLoginApi } from '../../services/userService';
import { AuthToken } from '../../utils/AuthToken';
import {handleAuth } from "./../../Auth/index"
import "./scss/Login.scss"
import axios from 'axios';
import { isBuffer } from 'lodash';
import ModalLoading from '../../components/ModalLoading';
function Login() {
    const navigate = useNavigate();
    const { author, setAuthor ,setAccount} = useContext(AuthToken);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    let handleOnChangeInput = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }
    let handleClickLogin = async() => {
      setLoading(true);
      
      let api;
      (
        async () => {
          api = await axios.post('http://localhost:8080/api/login', {
            email: email,
            password: password
          })
          console.log("api: ", api.data);
        }
      )().then(() => {
        console.log("api: ", api.data);
        setLoading(false);
        if(api.data.errCode==0){
        
        
          if(api.data.message == "Login success") {
            setAccount(api.data.user)
            window.location.href="/"
            Cookies.set('tokenAuth', api.data.token, { expires: 7 })
          }
    
          
          if (handleAuth().roleId == "1") {
            
            
            
            setAuthor("1");
               
          } else if (handleAuth().roleId == "2") {
            
            
            
             
            setAuthor("2");     
          } else if (handleAuth().roleId == "3") {
            
            
            // navigate('/');
            
           
            setAuthor("3");  
          }
        } else if(api.data.errCode==1){
          alert("Email ch??a ????ng k?? t??i kho???n");
        } else if(api.data.errCode==2){
          alert("Email ho???c m???t kh???u kh??ng ????ng");
        } else if(api.data.errCode==3){
          alert("M???t kh???u kh??ng ????ng");
        } else {
          alert("User not active");
        }
        

      }

      )
      
      


  }
    
    return (
        <div className="background-login">

            <div className="login-title">
                <h1>HappyCare</h1>
                <h2>H??? TH???NG CH??M S??C S???C KH???E TO??N DI???N</h2>
            </div>

            
            <div className="form-login">
                <form>
                    <div className="title-login">
                        ????NG NH???P
                    </div>
  
  <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" name="email" onChange={
                            handleOnChangeInput
    }/>
    <label className="form-label" htmlFor="form2Example1" >?????a ch??? email</label>
  </div>

  
  <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" name="password" onChange={
                            handleOnChangeInput
    } />
    <label className="form-label" htmlFor="form2Example2">M???t kh???u</label>
  </div>

  
  <div className="row mb-4">
    <div className="col d-flex justify-content-center">
      
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="form2Example31" defaultChecked />
        <label className="form-check-label" htmlFor="form2Example31">L??u ????ng nh???p</label>
      </div>
    </div>

    <div className="col">
      
      <a href="#!">Qu??n m???t kh???u?</a>
    </div>
  </div>

  
                    <button type="button" className="btn btn-warning btn-login btn-block mb-4"
                        onClick={
                            handleClickLogin
                    }
                    >Sign in</button>

  
  <div className="text-center">
    <p>Ch??a ????ng k?? t??i kho???n? <Link to="/register">????ng k??</Link></p>
    <p>ho???c ????ng k?? v???i :</p>
    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-facebook-f"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-google"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-twitter"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-github"></i>
    </button>
  </div>
                    </form>
            </div>
            {
                loading && <ModalLoading />
            }
        </div>
    );
}
export default Login;