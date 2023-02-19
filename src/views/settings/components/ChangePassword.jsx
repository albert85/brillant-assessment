
import { Form, Formik } from 'formik';
import { emailValidation } from '../../../helper/util';


const ChangePasswordSetting = () => {
  return (
    <div>
      <Formik
            initialValues={{ password: '', confirmedPassword: '', oldPassword: '' }}
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
                className="flex flex-col p-5 justify-start items-start w-full mx-auto my-auto h-full shadow-lg md:w-[500px]"
                onSubmit={handleSubmit}
              >
                <p className="text-base">Enter old password</p>
                <input
                  type="text"
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
                <p className="text-base">Enter new password</p>
                <input
                  type="text"
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
                <p className="text-base">Enter Confirmed password</p>
                <input
                  type="text"
                  name="confirmedPassword"
                  placeholder="Phone number / Email Address"
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
                  Update
                </button>
              </Form>
            )}
          </Formik>
    </div>
  )
}

export default ChangePasswordSetting