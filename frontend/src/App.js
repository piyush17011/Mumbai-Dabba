
import './App.css';
import { BrowserRouter as Router,Route,Routes, Navigate } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Admin from './components/Admin';
import Orders from './components/Orders';
import Users from './components/Users';
import LandingPage from './components/LandingPage';
import Success from './components/Success';
import Kitchen from './components/Kitchen';
import Meals from './components/Meals';
import Payment from './components/Payment';

import Korders from './components/Korders';
import NewMeal from './components/NewMeal';

function App() {
  return (
    <>
       <Router>
      <div className="App"></div>
      
      <Routes>
        
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/success" element={<Success/>}></Route>
        <Route path="/kitchen" element={<Kitchen/>}></Route>
        <Route path="/newmeal" element={<NewMeal/>}></Route>
        <Route path="/allmeals" element={<Meals/>}></Route>
        <Route path="/korders" element={<Korders/>}></Route>
        <Route path="/payment" element={<Payment/>}></Route>
        <Route path="/" element={<LandingPage/>}></Route>

      </Routes>
    </Router>
 
    </>
  );
}

export default App;
