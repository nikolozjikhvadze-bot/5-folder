import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link'; // 1. შემოვიტანეთ გამოტოვებული Link

function HomePage(props) {
  const { products } = props;

  // უსაფრთხოებისთვის: თუ პროდუქტები ჯერ არ ჩატვირთულა
  if (!products || products.length === 0) {
    return <p>პროდუქტები ვერ მოიძებნა.</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {/* 2. გასწორდა: products.id-ის ნაცვლად უნდა იყოს product.id */}
          <Link href={`/products/${product.id}`}>
            {product.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// 3. getStaticProps-ში ახლა მოგვაქვს ყველა პროდუქტი და არა ერთი კონკრეტული
export async function getStaticProps() {
  console.log('(Re-)Generating All Products...');
  
  // ვკითხულობთ ფაილს
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  // თუ ფაილში "products" მასივი არ არსებობს
  if (!data.products) {
    return { notFound: true };
  }

  return { 
    props: {
      products: data.products // 4. გადავცემთ მთლიან მასივს HomePage-ს
    },
    revalidate: 10
  };
}

export default HomePage;