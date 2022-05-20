import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Storefront from './pages/Storefront';
import Login from './pages/Login';

function App({ user }) {

  return (
    <div className='bg-slate-200 h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/storefront/:id' element={<Storefront />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

