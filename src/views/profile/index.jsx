import AppLayout from '../../hooks/App';


const Profile = () => {

  const ProfileDetails = ({ title = '', value = ''}) => {
    return (
      <div className="my-3 text-center">
        <p className="font-bold text-base">{title}</p>
          <p className="font-thin">{value}</p>
      </div>
    )
  }

  return (
    <div className="h-screen">
      <div className="h-screen flex justify-center items-center">
        <div className="shadow-lg w-full md:w-1/2 flex flex-col justify-center items-center">
          <div className="bg-blue-600 w-full flex justify-center">
            <div>
            <img className="my-4 rounded-full border-2 border-white" height="100px" width="100px" src="https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png" alt='profile_image' />
            </div>
          </div>
          <div className="p-4">
          <ProfileDetails title="Email" value="user12@domain" />
          <ProfileDetails title="Phone number" value="0804242422" />
          <ProfileDetails title="Interest" value="Football, soccer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout(Profile);