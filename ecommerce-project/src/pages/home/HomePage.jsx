import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header.jsx';
import { ProductsGrid } from './ProductsGrid.jsx';
import './HomePage.css';

export function HomePage({ cart }) {
  useEffect(() => {
    document.title = "Ecommerce Project";

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = "/images/home-favicon.png";
    }
  }, []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products')
      setProducts(response.data);
    };

    getHomeData();
  }, []);
  
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/images/home-favicon.png" />
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
