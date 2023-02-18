

export const emailValidation = ({values, msg = 'Email/Phone Number Required'}) => {
  const errors = {};
    if (!values.email) {
      errors.email = msg;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
}

export const phoneValidation = ({values, msg = 'Email/Phone Number Required'}) => {
  const errors = {};
    if (!values.phoneNumber) {
      errors.phoneNumber = msg;
    } else if (
      !/^[0-9+]{5,}$/i.test(values.phoneNumber)
    ) {
      errors.phoneNumber = 'Invalid phoneNumber';
    }
    return errors;
}