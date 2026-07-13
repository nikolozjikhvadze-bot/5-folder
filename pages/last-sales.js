import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
     const [sales, setSales] = useState(props.sales);
     const fetcher = (url) => fetch(url).then((response) => response.json());

    //const [isLoading, setIsLoading] = useState(); */

    const { data, error } = useSWR('https://nextjs-course-ade31-default-rtdb.firebaseio.com/sales.json', fetcher);

    useEffect(() => {
        if(data) {
            const transformedSales = [];
             
            for(const key in data) {
                transformedSales.push({
                    id: key, 
                    username: data[key].username, 
                    volume: data[key].volume
                });
            }
            
            setSales(transformedSales);
            
    }}, [data])


    /* useEffect(() => {
        setIsLoading(true);
        fetch('https://nextjs-course-ade31-default-rtdb.firebaseio.com/sales.json').then((response) => response.json()).then(data => {
            const transformedSales = [];
             
            for(const key in data) {
                transformedSales.push({id: key, username: data[key].username, volume: data[key].volume})
            }
            
            setSales(transformedSales);
            setIsLoading(false);
        });
    }, []) */

    if(error) {
        return <p>No Data yet.</p>;
    }



    if(!data || !sales) {
        return <p>Loading...</p>
    }

    

    return <ul>
        {sales.map((sale) => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
}

export async function getStaticProps() {
            
        const response = await fetch(
                'https://nextjs-course-ade31-default-rtdb.firebaseio.com/sales.json')
                const data = await response.json
            const transformedSales = [];
             
            for(const key in data) {
                transformedSales.push({id: key, username: data[key].username, volume: data[key].volume})
            }
            
            return{ props: { sales: transformedSales }}
    }




export default LastSalesPage;