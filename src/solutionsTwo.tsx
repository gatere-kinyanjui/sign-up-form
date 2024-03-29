// import React, { useState } from "react";

// interface InputValues {
//   password: string;
//   confirmpassword: string;
// }

// interface Errors {
//   password?: string;
//   confirmpassword?: string;
// }

// const PasswordMatch: React.FC = () => {
//   const [input, setInput] = useState<InputValues>({
//     password: "",
//     confirmpassword: "",
//   });
//   const [errors, setErrors] = useState<Errors>({});

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInput({
//       ...input,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (validate()) {
//       setInput({ password: "", confirmpassword: "" });
//       alert("User Form is submitted");
//     }
//   };

//   const validate = (): boolean => {
//     const errors: Errors = {};
//     let isValid = true;

//     if (!input.password) {
//       isValid = false;
//       errors.password = "Please enter your password.";
//     }

//     if (!input.confirmpassword) {
//       isValid = false;
//       errors.confirmpassword = "Please enter your confirm password.";
//     }

//     if (
//       typeof input.password !== "undefined" &&
//       typeof input.confirmpassword !== "undefined"
//     ) {
//       if (input.password !== input.confirmpassword) {
//         isValid = false;
//         errors.password = "Confirm password is not matched";
//       }
//     }

//     setErrors(errors);

//     return isValid;
//   };

//   return (
//     <div>
//       <div className="row header">
//         <div className="col-sm-12 btn btn-info">
//           How to create Password & Confirm Password Matching Validation in
//           ReactJS
//         </div>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="row form-group container txtspace">
//           <div className="col-sm-4">
//             <label htmlFor="password">Password:</label>
//           </div>
//           <div className="col-sm-8">
//             <input
//               type="password"
//               name="password"
//               onKeyUp={handleSubmit}
//               value={input.password}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Enter Password"
//               id="password"
//             />

//             {errors.password && (
//               <div className="text-danger">{errors.password}</div>
//             )}
//           </div>
//         </div>

//         <div className="row form-group container">
//           <div className="col-sm-4">
//             <label htmlFor="confirmpassword">Confirm Password:</label>
//           </div>
//           <div className="col-sm-8">
//             <input
//               type="password"
//               name="confirmpassword"
//               value={input.confirmpassword}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Enter Confirm Password"
//               id="confirmpassword"
//             />

//             {errors.confirmpassword && (
//               <div className="text-danger">{errors.confirmpassword}</div>
//             )}
//           </div>
//         </div>

//         <input type="submit" value="Submit" className="btn btn-info mrgnbtn" />
//       </form>
//     </div>
//   );
// };

// export default PasswordMatch;
