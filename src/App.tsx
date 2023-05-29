import "./App.css";
import ImageContainer from "./components/ImageContainer";
import Header from "./components/Header";
import SignUpForm from "./components/SignUpForm";
import SignUpButton from "./components/SignUpButton";
import LogIn from "./components/LogIn";

function App() {
  return (
    <div className="app">
      <ImageContainer />
      <div className="rightContainer">
        <Header />
        <SignUpForm />
      </div>
    </div>
  );
}

export default App;
