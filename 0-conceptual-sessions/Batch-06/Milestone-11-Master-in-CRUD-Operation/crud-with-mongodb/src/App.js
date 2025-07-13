import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import routes from './routes/routes';

function App() {
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
}

export default App;
