import React, { useState } from 'react';

import Product from './Product';
import AddProduct from './AddProduct';

export default function EditProducts({ user, products }) {

  return (<>

    <div className="flex flex-col max-h-[40rem] gap-6 mx-6 place-items-center bg-gray-700 rounded-lg">
      <p className='text-2xl text-center'>
        Products
      </p>
      <div className='flex flex-col gap-4'>
        {products.map((product) => {
          return <Product user={user} product={product} key={product.title} canEditProduct />
        })}
        <AddProduct user={user} />
      </div>
    </div>
  </>)

}
