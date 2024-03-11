import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";
import ImageContainer from "../components/ImageContainer";
import SignUpForm from "../pages/SignUpForm";
import LogIn from "../pages/LogIn";

const RootLayout = () => {
  return (
    <div className="RootLayout app">
      <ImageContainer />
      <div className="rightContainer">
        <Header />
        <SignUpForm />
      </div>

      {/* <main>
            <Outlet />
        </main> */}
    </div>
  );
};

export default RootLayout;
