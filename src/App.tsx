import "./App.css";
import ImageContainer from "./components/ImageContainer";
import Header from "./components/Header";
import SignUpForm from "./components/SignUpForm";
import ButtonContainer from "./components/ButtonContainer";

function App() {
  return (
    <div className="app">
      <ImageContainer />
      <div className="rightContainer">
        <Header />
        <SignUpForm />
        <ButtonContainer />
      </div>
    </div>
  );
}

export default App;
