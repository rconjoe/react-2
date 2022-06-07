import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import fetchProfileByUsername from '../util/fetchProfileByUsername';

function Storefront() {

  const { username } = useParams();

  useEffect(() => {
    async function fetchProfile() {
      const profile = await fetchProfileByUsername(username);
      console.log(profile)
    }

    fetchProfile();
  }, [])

  return (<>
    <Header />

    <Footer />
  </>)
};

export default Storefront;
