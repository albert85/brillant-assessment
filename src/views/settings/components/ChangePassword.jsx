import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { CHANGEPASSWORD } from '../../../helper/queryUrl';
import { putRequest } from '../../../helper/apiCall';

const ChangePasswordSetting = () => {

  const changePasswordMutate = useMutation(putRequest, {
    onSuccess(res){
      toast.success(res.message)
    },
    onError(err){
      toast.error(err?.response?.data?.message)
    }
  })

  const handleChangePassword = async (values) => {
    await changePasswordMutate.mutateAsync(
      { url: CHANGEPASSWORD,
      data: {
        newPassword: values.password,
        oldPassword: values.oldPassword
      }
    })
  }

  return (
    <div>
      <Formik
        initialValues={{ password: '', confirmedPassword: '', oldPassword: '' }}
        validate={(values) => {
          const errors = {};

          if(!values.password){
            errors['password'] = 'Required!'
          }

          if(!values.oldPassword){
            errors['oldPassword'] = 'Required!'
          }

          if(!values.confirmedPassword){
            errors['confirmedPassword'] = 'Required!'
          }

          if(values.confirmedPassword !== values.password){
            errors['confirmedPassword'] = 'confirmed password not the same as password!'
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleChangePassword(values)
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
            className="flex flex-col p-5 justify-start items-start w-full mx-auto my-auto h-full shadow-lg md:w-[500px]"
            onSubmit={handleSubmit}
          >
            <p className="text-base mt-3">Enter old password</p>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old password"
              className=" border-gray-400 border-2 rounded-md p-2 my-2 w-full"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.oldPassword}
            />
            {errors.oldPassword && touched.oldPassword && (
              <p className="text-red-700 text-[10px]">{errors.oldPassword}</p>
            )}
            <p className="text-base mt-3">Enter new password</p>
            <input
              type="password"
              name="password"
              placeholder="Phone number / Email Address"
              className=" border-gray-400 border-2 rounded-md p-2 my-2 w-full"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <p className="text-red-700 text-[10px]">{errors.password}</p>
            )}
            <p className="text-base mt-3">Enter Confirmed password</p>
            <input
              type="password"
              name="confirmedPassword"
              placeholder="Phone number / Email Address"
              className=" border-gray-400 border-2 rounded-md p-2 my-2 w-full"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmedPassword}
            />
            {errors.confirmedPassword && touched.confirmedPassword && (
              <p className="text-red-700 text-[10px]">
                {errors.confirmedPassword}
              </p>
            )}
            <button
              className="bg-blue-600 w-full mt-4 py-2 my-2 rounded-md text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {changePasswordMutate.isLoading ? "Updating..." : "Update"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordSetting;
