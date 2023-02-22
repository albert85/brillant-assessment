import React from 'react';
import { Formik, Form } from 'formik';
import { emailValidation } from '../../helper/util';
import { Link, useNavigate,  } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../helper/apiCall';
import { LOGIN } from '../../helper/queryUrl';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate()

  const loginMutate = useMutation(postRequest, {
    onSuccess(res){
      toast.success(res.message)
      navigate('/auth/profile')
    }
  })

  const handleLogin = async (values) => {
    await loginMutate.mutateAsync({ url: LOGIN, data: {...values }})
  }

  return (
    <div className="h-screen">
      <div className="h-screen flex justify-center items-center">
        <div>
          <Formik
            initialValues={{ username: '', password: '' }}
            validate={(values) => {
              const errors = {};

              if (!values.password) {
                errors.password = 'Password is Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleLogin(values);
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
                <p>Email/Phone Number</p>
                <input
                  type="text"
                  name="username"
                  placeholder="Email / phone number"
                  className=" border-gray-400 border-2 rounded-md p-2 my-2 w-full"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <p className="text-red-700 text-[10px]">{errors.username}</p>
                )}
                <p className="mt-3">Password</p>
                <div className="flex items-center border-gray-400 border-2 rounded-md p-2 my-2 w-full">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="outline-none w-full"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className="ml-2">

                </div>

                </div>
                {errors.password && touched.password && (
                  <p className="text-red-700 text-[10px]">{errors.password}</p>
                )}
                <div className="flex justify-end w-full">
                  <Link to='/send-email' className="text-[12px] text-red-700">Forget password</Link>
                </div>
                <button
                  className="bg-blue-600 w-full mt-4 py-2 my-2 rounded-md text-white"
                  type="submit"
                  disabled={isSubmitting || loginMutate.isLoading}
                >
                  {loginMutate.isLoading ? "Loading..." : "Submit"}
                </button>
                <div className="flex justify-center w-full">
                  <p className="text-[12px]">Don't have an account? <Link to='/register' className="text-[12px] text-blue-700">Register</Link></p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
