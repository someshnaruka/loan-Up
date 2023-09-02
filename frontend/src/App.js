import './App.css';
import {Toaster } from "react-hot-toast";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import { useEffect } from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {loginRedux} from "./features/userSlice"
import Navbar from './components/Navbar';
import Loan from './pages/Loan';
import Applications from './pages/Applications';
function App() {
const dispatch=useDispatch();
axios.defaults.withCredentials = true;
  useEffect(()=>{
axios.get(process.env.REACT_APP_SERVER_DOMAIN+"/auth/user", {
  withCredentials: true,
  
}).then((response)=>{
  if(response.data.alert)
  {
    dispatch(loginRedux(response.data.result))
  }
})
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
