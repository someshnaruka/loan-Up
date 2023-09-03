import './App.css';
import {Toaster, toast } from "react-hot-toast";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import { useEffect } from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {loginRedux} from "./features/userSlice"
import Navbar from './components/Navbar';
import Loan from './pages/Loan';
import Applications from './pages/Applications';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from './config/firebase';
import { GiToken } from 'react-icons/gi';
function App() {
  const firebaseAuth=getAuth(app);
const dispatch=useDispatch();
axios.defaults.withCredentials = true;
  useEffect(()=>{
    const getUser=async()=>{
      const token=localStorage.getItem("token");
      if(token)
      {
        axios.get(process.env.REACT_APP_SERVER_DOMAIN+"/auth/user",{
      
          headers: {
            Authorization: "Bearer " + token,
          }}).then((response)=>{
            if(response.data.alert)
            {
              dispatch(loginRedux(response.data.result));
            }
          }).catch((err)=>{
            console.log(err);
          })
    }
  
}

getUser();
  },[])
  return (
    <div className="App ">
    <Toaster></Toaster>
    <Router>
    <Navbar></Navbar>
      <Routes>
        <Route exact path='/' element={<Home></Home>}></Route>
        <Route exact path='/loan' element={<Loan></Loan>}></Route>
        <Route exact path='/applications' element={<Applications></Applications>}></Route>
      </Routes>
    </Router>
    
    </div>
  );
}

export default App;
