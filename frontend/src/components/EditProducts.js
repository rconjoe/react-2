import React, { useState } from 'react';

import Product from './Product';
import AddProduct from './AddProduct';

export default function EditProducts({ user, products }) {

  return (<>

    <div className="flex flex-col max-h-[40rem] overflow-y-scroll gap-6 m-6 place-items-center bg-gray-700 rounded-lg">
      <p className='text-2xl text-center'>
        Products
      </p>
      <div className='flex flex-col gap-4'>
        {products.map((product) => {
          return <Product user={user} product={product} key={product.title} />
        })}
        <AddProduct user={user} />
      </div>
    </div>
  </>)

}
