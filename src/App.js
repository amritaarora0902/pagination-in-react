import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products/");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  const getPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      {products && products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((pro) => {
            return (
              <span key={pro.id} className="products_single">
                <img src={pro.thumbnail} alt={pro.title} />
                <span>{pro.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products && products.length > 0 && (
        <div className="pagination">
          <span onClick={() => getPageHandler(page - 1)}>◀️</span>

          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination_selected" : ""}
                key={i}
                onClick={() => getPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}

          <span onClick={() => getPageHandler(page + 1)}>▶️</span>
        </div>
      )}
    </>
  );
}

export default App;
