import React from 'react';
import { Formik, Form } from 'formik';
import { emailValidation, phoneValidation } from '../../helper/util';
import { Link } from 'react-router-dom';

const VerifyPhoneNumber = () => {
  const [isSuccess, setSuccess] = React.useState(false);

  return (
    <div className="h-screen">
      <div className="h-screen flex justify-center items-center">
        <div>
          <Formik
            initialValues={{ phoneNumber: '' }}
            validate={(values) => {
              const errors = phoneValidation({values, msg: 'Phone Number Required'}) || {};

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSuccess(true)
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
                {!isSuccess && (<div className="w-full">
                <p>Enter phone number</p>
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
                  <p className="text-red-700 text-[10px]">{errors.phoneNumber}</p>
                )}

                </div>)}
                {isSuccess && (<div className="w-full">
                  <p>Enter verification code</p>
                  <input
                    type="text"
                    name="verificationCode"
                    placeholder="verification code"
                    className=" border-gray-400 border-2 rounded-md p-2 my-2 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.verificationCode}
                  />
                  {errors.verificationCode && touched.verificationCode && (
                    <p className="text-red-700 text-[10px]">{errors.verificationCode}</p>
                  )}

                </div>)}
                <button
                  className="bg-blue-600 w-full mt-4 py-2 my-2 rounded-md text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Send
                </button>
                <div className="flex justify-center w-full">
                  {isSuccess && (<p className="text-[12px]"> <Link to='/' className="text-[12px] text-blue-700">Resend code</Link></p>)}
                  {!isSuccess &&(<p className="text-[12px]">Already verified? <Link to='/' className="text-[12px] text-blue-700">Login</Link></p>)}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhoneNumber;
