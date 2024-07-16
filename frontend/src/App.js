import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-[#f7f9fb] w-screen h-screen">
      <ToastContainer />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
