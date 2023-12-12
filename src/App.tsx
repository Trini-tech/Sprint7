import Navbar from './components/Navbar';
import Home from './pages/Home';
import Starships from './pages/Starships';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthData } from './contexts/authContextProvider';

import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/utils/ProtectedRoute';

function App() {
  const { user } = AuthData();

  return (
    <>
      <Navbar />
      <div className="container max-w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute isAuthenticated={user.isAuthenticated} />}>
            <Route path="/starships" element={<Starships />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
