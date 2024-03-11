import { useState } from "react";
import styles from "./styles.module.css";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
  });

  type LoginData = z.infer<typeof loginSchema>;

  const [loginCredentials, setLoginCredentials] = useState<LoginData>({
    email: "",
    password: "",
  });

  //Defining form submission handler w/ firebase
  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    // User log-in
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      console.log("User successfully signed in.", user);
      setLoginCredentials({
        email: "",
        password: "",
      });
    } catch (signInError) {
      console.error("Error occurred during sign-up:", signInError);
      console.log(signInError);
    }
  };

  // Defining the form element and its input elements.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

  return (
    <form
      action=""
      className={styles.logInContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={`inputContainer ${styles.emailContainer}`}>
        <label className={styles.Email} htmlFor="">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          className={styles.email}
          placeholder="john@you.com"
          value={loginCredentials.email}
          onChange={(e) =>
            setLoginCredentials({
              ...loginCredentials,
              email: e.target.value,
            })
          }
        />
        {errors.email && (
          <span className={styles.textSmall}> {errors.email.message}</span>
        )}
      </div>
      <div className={`inputContainer ${styles.passwordContainer}`}>
        <label className={styles.Password} htmlFor="">
          Password
        </label>
        <input
          type="password"
          className={styles.password}
          {...register("password")}
          placeholder="********"
          value={loginCredentials.password}
          onChange={(e) =>
            setLoginCredentials({
              ...loginCredentials,
              password: e.target.value,
            })
          }
        />
        {errors.password && (
          <span className={styles.textSmall}> {errors.password.message}</span>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.loginButton}>Login</button>
      </div>
    </form>
  );
};

export default LogIn;
