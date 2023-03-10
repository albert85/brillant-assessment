import React from 'react';
import { Formik, Form } from 'formik';
import { emailValidation } from '../../helper/util';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '../../../node_modules/react-query/es/react/useMutation';
import { postRequest } from '../../helper/apiCall';
import { toast } from 'react-toastify';
import { REGISTER } from '../../helper/queryUrl';

const Registration = () => {
  const navigate = useNavigate()

  const registerMutate = useMutation(postRequest, {
    onSuccess(res){
      toast.success(res.message)
      navigate('/email-info')
    }
  })

  const handleRegistration = async (values) => {
    await registerMutate.mutateAsync({ url: REGISTER, data: { ...values}})
  }
  
  return (
    <div className="h-screen">
      <div className="h-screen flex justify-center items-center">
        <div>
          <Formik
            initialValues={{
              email: '',
              password: '',
              phoneNumber: '',
              interests: '',
            }}
            validate={(values) => {
              const errors = emailValidation({values}) || {};

              if (!values.password) {
                errors.password = 'Password is Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleRegistration(values);
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
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className=" border-gray-400 border-2 rounded-md p-2 my-2 w-full"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <p className="text-red-700 text-[10px]">{errors.email}</p>
                )}
                <p>Phone Number</p>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone number"
                  className=" border-gray-400 border-2 rounded-md p-2 my-2 w-full"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-red-700 text-[10px]">
                    {errors.phoneNumber}
                  </p>
                )}

                <p>Special Interest</p>
                <input
                  type="text"
                  name="interests"
                  placeholder="Special Interest e.g. football"
                  className=" border-gray-400 border-2 rounded-md p-2 my-2 w-full"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.interests}
                />
                {errors.interests && touched.interests && (
                  <p className="text-red-700 text-[10px]">
                    {errors.interests}
                  </p>
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
                  <div className="ml-2"></div>
                </div>
                {errors.password && touched.password && (
                  <p className="text-red-700 text-[10px]">{errors.password}</p>
                )}
                <button
                  className="bg-blue-600 w-full mt-4 py-2 my-2 rounded-md text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {registerMutate.isLoading ? "Submitting" : "Register"}
                </button>
                <div className="flex justify-center w-full">
                  <p className="text-[12px]">Already registered? <Link to='/' className="text-[12px] text-blue-700">Login</Link></p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Registration;
