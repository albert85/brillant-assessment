import { Formik, Form } from 'formik';
import React from 'react';
import { emailValidation } from '../../../helper/util';
import { useMutation, useQuery } from 'react-query';
import { putRequest, getRequest } from '../../../helper/apiCall';
import { toast } from 'react-toastify';
import { CHANGE_EMAIL, GETUSER } from '../../../helper/queryUrl';
import { queryKeys } from '../../../helper/queryKeys';

const UpdateEmailSetting = () => {
  const {data} = useQuery([queryKeys.userDetails], () => getRequest({ url: GETUSER}))
  const updateEmailMutate = useMutation(putRequest, {
    onSuccess(res) {
      toast.success(res.message);
    },
  });

  const handleEmailUpdate = async (values) => {
    await updateEmailMutate.mutateAsync({ url: CHANGE_EMAIL, data: { ...values } });
  };

  return (
    <div className="mt-6">
      <Formik
        enableReinitialize
        initialValues={{ email: data?.data?.email || '' }}
        validate={(values) => {
          const errors = emailValidation({values, msg: 'Required'}) || {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleEmailUpdate(values);
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
        }) => console.log(errors, isSubmitting) || (
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
                disabled={updateEmailMutate.isLoading}
              >
                {updateEmailMutate.isLoading ? "Submiting" : "Update"}
              </button>
            </div>
            {errors.email && touched.email && (
              <p className="text-red-700 text-[10px]">{errors.email}</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateEmailSetting;
