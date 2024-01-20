import "./App.css";
import Layout from "./components/Layout/layout";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer"


import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
