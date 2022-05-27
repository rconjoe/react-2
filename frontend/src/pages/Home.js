import Header from '../components/Header';
import Footer from '../components/Footer';
import EditProfile from '../components/EditProfile';
import EditProducts from '../components/EditProducts';
import Stats from '../components/Stats';

function Home({ user, products }) {

  return (<>
    <Header user={user} />
    <div className="bg-gray-700 mx-6 my-2 p-6 rounded-lg shadow-lg">
      <div className='p-6 grid grid-cols-1 grid-rows-3 gap-4 lg:grid-cols-3 lg:grid-rows-1 text-center text-xl'>
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
