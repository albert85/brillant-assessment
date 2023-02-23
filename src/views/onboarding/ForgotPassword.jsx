import React from 'react';
import { Formik, Form } from 'formik';
import { phoneValidation } from '../../helper/util';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { putRequest } from '../../helper/apiCall';
import { FORGOTPASSWORD } from '../../helper/queryUrl';

const ForgotPassword = () => {
  const params = useLocation()?.search?.split('=')[1];
  const [isSuccess, setSuccess] = React.useState(false);
  const navigate = useNavigate()

  const forgotPasswordMutate = useMutation(putRequest, {
    onSuccess(res){
      toast.success(res.message)
      navigate('/')
    }
  })

  const handleForgotPassword = async (values) => {
    await forgotPasswordMutate.mutateAsync({ url: `${FORGOTPASSWORD}/${params}`, data: { newPassword: values.password }})
  }

  return (
    <div className="h-screen">
      <div className="h-screen flex justify-center items-center">
        <div>
          <Formik
            initialValues={{ password: '', confirmedPassword: '' }}
            validate={(values) => {
              const errors = {}

              if(!values.password){
                errors['password'] = 'Required'
              }

              if(!values.confirmedPassword){
                errors['password'] = 'Required'
              }

              if(values.confirmedPassword !== values.password){
                errors['password'] = 'Required'
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleForgotPassword(values)
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form
                className="flex flex-col p-5 justify-start items-start w-fit mx-auto my-auto h-full shadow-lg md:w-[500px]"
                onSubmit={handleSubmit}
              >
                <p className="text-lg mb-4 font-bold">Change new Password</p>
                <p className="text-base">Enter new password</p>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className=" border-gray-400 border-2 rounded-md p-2 my-2 w-full"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <p className="text-red-700 text-[10px]">{errors.password}</p>
                )}
                <p className="text-base">Enter Confirmed password</p>
                <input
                  type="password"
                  name="confirmedPassword"
                  placeholder="confirmed Password"
                  className=" border-gray-400 border-2 rounded-md p-2 my-2 w-full"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmedPassword}
                />
                {errors.confirmedPassword && touched.confirmedPassword && (
                  <p className="text-red-700 text-[10px]">{errors.confirmedPassword}</p>
                )}
                <button
                  className="bg-blue-600 w-full mt-4 py-2 my-2 rounded-md text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {forgotPasswordMutate.isLoading ? "Submitting...." : "Send"}
                </button>
                <div className="flex justify-center w-full">
                  {isSuccess && (<p className="text-[12px]"> <Link to='/' className="text-[12px] text-blue-700">Resend code</Link></p>)}
                  {!isSuccess &&(<p className="text-[12px]"><Link to='/' className="text-[12px] text-blue-700">Login</Link></p>)}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
