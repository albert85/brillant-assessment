import { Formik, Form } from 'formik';
import React from 'react';


const UpdateEmailSetting = () => {
  return (
    <div className="mt-6">
       <Formik
            enableReinitialize
            initialValues={{ email: '' }}
            validate={(values) => {
              const errors =  {};

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
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
                className="flex flex-col p-5 justify-start w-full mx-auto my-auto h-full shadow-lg md:w-[500px]"
                onSubmit={handleSubmit}
              >
                <p className="text-base">Email address</p>
                <div className="flex items-center w-full">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className=" border-gray-400 border-2 rounded-md p-2 my-2 w-full"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <button
                  className="bg-blue-600 text-xs w-1/4 ml-2 h-12 rounded-md text-white md:text-base"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Update
                </button>
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-700 text-[10px]">{errors.email}</p>
                )}
              </Form>
            )}
          </Formik>
    </div>
  )
}

export default UpdateEmailSetting