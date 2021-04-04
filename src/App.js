import { ToastContainer } from 'react-toastify';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import PastBook from "./client";

function App() {
  return (
    <div className="past-book">
      <ToastContainer />
      <PastBook />
    </div>
  );
}

export default App;
