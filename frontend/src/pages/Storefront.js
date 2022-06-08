import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import fetchProfileByUsername from '../util/fetchProfileByUsername';
import fetchProductsByOwner from '../util/fetchProductsByOwner';

function Storefront() {

  const { username } = useParams();
  const [profile, setProfile] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProfileAndProducts() {
      // fetch profile and set it to state
      const _profile = await fetchProfileByUsername(username);
      setProfile(_profile);

      // fetch products and set them to state
      const _products = await fetchProductsByOwner(_profile.uid);
      setProducts([]);
      _products.forEach(product => {
        setProducts(pr => [...pr, product])
      });
    }

    // actually run the function
    fetchProfileAndProducts();
  }, [])

  return (<>
    <Header />
    <div className="bg-gray-700 mx-6 my-2 p-6 rounded-lg shadow-lg grid grid-cols-1 grid-rows-auto lg:grid-cols-3">
      <Profile userProfile={profile} />
      {products.map(product => {
        return (
          <Product product={product} key={product.title} canEditProduct={false} />
        );
      })}
    </div>
    <Footer />
  </>)
};

export default Storefront;
