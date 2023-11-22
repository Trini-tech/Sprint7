import Navbar from './components/Navbar';
import Home from './pages/Home';
import Starships from './pages/Starships';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className="container max-w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/starships" element={<Starships />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
