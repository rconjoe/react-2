import Header from '../components/Header';
import Footer from '../components/Footer';
import EditProfile from '../components/EditProfile';
import { useNavigate } from 'react-router-dom';

function Home({ user }) {

  let navigate = useNavigate();

  if (!user) return navigate('/login');

  return (<>
    <Header user={user} />
    <div className="bg-gray-700 mx-12 my-2 p-6 rounded-lg shadow-lg">
      <div className='p-6 grid grid-cols-1 grid-rows-3 gap-4 lg:grid-cols-3 lg:grid-rows-1 text-center'>
        <div className='border border-white rounded-lg bg-gray-700'>
          <EditProfile user={user} />
        </div>
        <div className='border border-white'>
          two
        </div>
        <div className='border border-white'>
          longboi
        </div>

      </div>
    </div>
    <Footer />
  </>)
};

export default Home;
