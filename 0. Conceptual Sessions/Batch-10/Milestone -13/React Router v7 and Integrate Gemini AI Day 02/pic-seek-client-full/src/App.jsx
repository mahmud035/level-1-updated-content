import { Route, Routes } from 'react-router';
import AppLayout from './Layout/AppLayout';
import Create from './Pages/Create';
import Creations from './Pages/Creations';
import Home from './Pages/Home';
import SingleImage from './Pages/SingleImage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/creations" element={<Creations />}></Route>
        <Route path="/creation/:id" element={<SingleImage />}></Route>
      </Route>
    </Routes>
  );
}
