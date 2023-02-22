import { useNavigate } from 'react-router-dom';
import AppLayout from '../../hooks/App';
import ChangePasswordSetting from './components/ChangePassword';
import ChangeEmailSetting from './components/UpdateEmail';

const Setttings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="h-screen">
      <div className="h-screen flex justify-center items-center">
        <div className="w-full flex p-2 flex-col justify-center items-center">
          <p className="text-lg font-bold mb-8">Settings</p>
          <div className="w-full">
            <ChangePasswordSetting />
            <ChangeEmailSetting />
          </div>
          <button
            className=" border-2 border-blue-700 mt-7 h-12 rounded-md text-blue-700 text-base w-full md:w-[500px]"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppLayout(Setttings);
