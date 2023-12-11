import Navbar from './components/Navbar';
import Home from './pages/Home';
import Starships from './pages/Starships';
import Login from './pages/Login';
import Register from './pages/Register';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className="container max-w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/starships" element={<Starships />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
