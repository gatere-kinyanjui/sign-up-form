import React, { useState } from "react";

interface PasswordForm {
  password: string;
  confirm_password: string;
}

const PasswordValidationForm: React.FC = () => {
  const [input, setInput] = useState<PasswordForm>({
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<PasswordForm>({
    password: "",
    confirm_password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      console.log(input);
      setInput({ password: "", confirm_password: "" });
      alert("Form is submitted");
    }
  };

  const validate = (): boolean => {
    let errors: PasswordForm = { password: "", confirm_password: "" };
    let isValid = true;
    if (!input.password) {
      isValid = false;
      errors.password = "Please enter your password.";
    }
    if (!input.confirm_password) {
      isValid = false;
      errors.confirm_password = "Please enter your confirm password.";
    }
    if (typeof input.password !== "undefined") {
      if (input.password.length < 6) {
        isValid = false;
        errors.password = "Please add at least 6 characters.";
      }
    }
    if (
      typeof input.password !== "undefined" &&
      typeof input.confirm_password !== "undefined"
    ) {
      if (input.password !== input.confirm_password) {
        isValid = false;
        errors.confirm_password = "Passwords don't match.";
      }
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <div className="main-div">
      <h5>
        How To Validate Password And Confirm Password In React JS -
        Websolutionstuff
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter password"
            id="password"
          />
          <div className="text-danger">{errors.password}</div>
        </div>
        <div className="form-group">
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            name="confirm_password"
            value={input.confirm_password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter confirm password"
            id="confirm_password"
          />
          <div className="text-danger">{errors.confirm_password}</div>
        </div>
        <input
          type="submit"
          value="Submit"
          className="btn btn-success submit_btn"
        />
      </form>
    </div>
  );
};

export default PasswordValidationForm;
