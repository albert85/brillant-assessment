import React from 'react';
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Login from './views/onboarding/Login';
import Registration from './views/onboarding/Registration';
import VerifyEmail from './views/onboarding/VerifyEmail';
import VerifyPhoneNumber from './views/onboarding/VerifyPhone';
import ForgotPassword from './views/onboarding/ForgotPassword';
import ChangePassword from './views/onboarding/ChangePassword';
import Settings from './views/settings';
import Discover from './views/discover';
import Buddies from './views/buddies';
import Profile from './views/profile';

function App() {
  return (
      <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/register' element={<Registration />} />
      <Route exact path='/verify-email' element={<VerifyEmail />} />
      <Route exact path='/verify-phone-number' element={<VerifyPhoneNumber />} />
      <Route exact path='/forgot-password' element={<ForgotPassword />} />
      <Route exact path='/change-password' element={<ChangePassword />} />
      <Route exact path='/auth/profile' element={<Profile />} />
      <Route exact path='/auth/buddies' element={<Buddies />} />
      <Route exact path='/auth/discover' element={<Discover />} />
      <Route exact path='/auth/settings' element={<Settings />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
