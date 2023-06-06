import "./App.css";
import ImageContainer from "./components/ImageContainer";
import Header from "./components/Header";
import SignUpForm from "./pages/SignUpForm";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<SignUpForm />} />
      <Route path="login" element={<LogIn />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
