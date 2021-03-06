import Header from '../components/Header';
import Footer from '../components/Footer';
import EditProfile from '../components/EditProfile';
import EditProducts from '../components/EditProducts';
import Stats from '../components/Stats';

import './Home.style.css';

function Home({ user, products }) {

  return (<>
    <Header user={user} />
    <div className="bg-gray-700 mx-6 my-2 p-6 rounded-lg shadow-lg">
      <div className='p-6 flex flex-col md:flex-row gap-8 text-center text-xl overflow-auto scrollbar'>
        <div className='bg-gray-700'>
          <EditProfile user={user} />
        </div>
        <div className='bg-gray-700'>
          <Stats user={user} />
        </div>
        <div className='bg-gray-700'>
          <EditProducts user={user} products={products} />
        </div>
      </div>
    </div>
    <Footer />
  </>)
};

export default Home;
