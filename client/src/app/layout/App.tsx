import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import Catalog from "../../features/catalog/Catalog";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const addProduct = () => {
    setProducts(prevState => [...prevState,
      {
        id: prevState.length + 101,
        name: 'product ' + (prevState.length + 1),
        brand: 'brand',
        description: 'description',
        pictureUrl: 'http://picsum.photos/200',
        price: 100.00 + (prevState.length + 1)
      }])
  }

  return (
    <div>
      <h1>Hello</h1>
      <Catalog products={products} addProduct={addProduct}/>
    </div>
  );
}

export default App;
