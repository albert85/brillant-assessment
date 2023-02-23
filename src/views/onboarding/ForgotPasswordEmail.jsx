import React from 'react';
import { Formik, Form } from 'formik';
import { emailValidation } from '../../helper/util';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../helper/apiCall';
import { toast } from 'react-toastify';
import { VERIFYEMAIL } from '../../helper/queryUrl';

const ForgotPasswordEmail = () => {
  const [isSuccess, setSuccess] = React.useState(false);
  const navigate = useNavigate()

  const verifyEmailMutate = useMutation(postRequest, {
    onSuccess(res){
      toast.success(res.message)
      navigate('/email-info')
    }
  })

  const handleSendEmail = async (values) => {
    await verifyEmailMutate.mutateAsync({ url: VERIFYEMAIL, data: {...values }})
  }

  return (
    <div className="h-screen">
      <div className="h-screen flex justify-center items-center">
        <div>
          <Formik
            initialValues={{ email: '' }}
            validate={(values) => {
              const errors = emailValidation({values, msg: 'Email address Required'}) || {};

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleSendEmail(values);
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
                 <p className="text-xl font-semibold mb-4">Password Reset</p>

                <p>Enter Email address</p>
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
                <button
                  className="bg-blue-600 w-full mt-4 py-2 my-2 rounded-md text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Send to email
                </button>
                <div className="flex justify-center w-full">
                  {isSuccess && (<p className="text-[12px]"> <Link to='/' className="text-[12px] text-blue-700">Resend email</Link></p>)}
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

export default ForgotPasswordEmail;
