import React from "react";

const initialState = {
  currentPassword: "",
  newPassword: "",
  retypePassword: "",
  isSubmitted: false,
  isValid: false
};

const validatePasswords = (currentPassword, newPassword, retypePassword) => {
  return (
    currentPassword.length > 0 &&
    newPassword.length > 0 &&
    retypePassword.length > 0 &&
    newPassword === retypePassword
  );
};

const ResetPassword = () => {
  const [formState, setFormState] = React.useState(initialState);
  const {
    currentPassword,
    newPassword,
    retypePassword,
    isSubmitted,
    isValid
  } = formState;

  // Validate the password fields anytime the input fields are updated.
  React.useEffect(() => {
    setFormState(prevFormState => ({
      ...prevFormState,
      isValid: validatePasswords(currentPassword, newPassword, retypePassword)
    }));
  }, [currentPassword, newPassword, retypePassword]);

  const handleChange = ({ target: { name, value } }) => {
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = () => {
    setFormState({
      ...formState,
      isSubmitted: true
    });
  };

  return (
    <>
      <div>
        <label id="currentPasswordLabel" htmlFor="currentPassword">
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          value={currentPassword}
          onChange={handleChange}
          aria-labelledby="currentPasswordLabel"
        />
      </div>
      <div>
        <label id="newPasswordLabel" htmlFor="newPassword">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
          aria-labelledby="newPasswordLabel"
        />
      </div>
      <div>
        <label id="retypePasswordLabel" htmlFor="retypePassword">
          Retype Password
        </label>
        <input
          type="password"
          name="retypePassword"
          value={retypePassword}
          onChange={handleChange}
          aria-labelledby="retypePasswordLabel"
        />
      </div>
      <button type="submit" disabled={!isValid} onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

export default ResetPassword;
