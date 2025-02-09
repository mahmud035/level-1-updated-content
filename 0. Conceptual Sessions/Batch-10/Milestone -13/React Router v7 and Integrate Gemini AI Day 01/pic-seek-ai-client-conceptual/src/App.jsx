import { Route, Routes } from 'react-router';
import RootLayout from './layouts/RootLayout';
import GenerateImage from './pages/GenerateImage';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="generate" element={<GenerateImage />}></Route>
      </Route>
    </Routes>
  );
}
