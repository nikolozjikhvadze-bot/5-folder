import { NOTFOUND } from 'dns';
import fs from 'fs/promises' 
import { redirect } from 'next/dist/server/api-utils';
import path from 'path'

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
      <li key={product.id}>
        <Link href={`/${products.id}`}>
          {product.title}
        </Link></li>))}
    </ul>
  );
}

export default HomePage;
