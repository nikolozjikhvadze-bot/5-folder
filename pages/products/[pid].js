import fs from "fs/promises";
import path from "node:path";
import { Fragment } from "react"; // Fragment პირდაპირ react-იდან წამოვიღოთ

// არგუმენტში აუცილებლად უნდა ჩავწეროთ props
function ProductDetailPage(props) {
    const { loadedProduct } = props;

    // თუ პროდუქტი ჯერ არ ჩატვირთულა (უსაფრთხოებისთვის)
    if (!loadedProduct) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
}

 async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData); 
    
    return data;
}



// 1. მონაცემების წამოღება თითოეული ID-სთვის
export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;
    const data = await getData();
    const product = data.products.find(product => product.id === productId);

    if(!product) {
        return { notFound: true };
    }

    

    // თუ პროდუქტი საერთოდ ვერ მოიძებნა ბაზაში
    if (!product) {
        return { notFound: true };
    }

    return { 
        props: {
            loadedProduct: product
        },
        revalidate: 10
    };
}

// 2. ფუნქციის სახელი შევცვალეთ getStaticPaths-ით და fallback დავწერეთ პატარა ასოებით
export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map(product => product.id);
    const pathsWithParams = ids.map((id) => ({params: {pid: id}}))
    return {
        paths: pathsWithParams,
        fallback: true // "B" შევცვალეთ "b"-თი
    };
}

export default ProductDetailPage;