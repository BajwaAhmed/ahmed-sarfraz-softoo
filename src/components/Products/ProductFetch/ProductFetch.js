import { useContext, useEffect, useMemo } from "react";
import { ENDPOINTS } from "../../../middleware/url";
import ApiDataRenderer from "../../Common/ApiDataRenderer";
import { ProductsContext } from "../context/ProductsContext";
import ProductsListing from "../ProductListing/ProductsListing";

const ProductsStoreListing = ({ initialProducts }) => {
  const { products, setProducts, filter } = useContext(ProductsContext);
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    if (filter.length === 0) {
      return products; // No filters applied, return all products
    }
    return products.filter((product) => filter.includes(product.colour));
  }, [products, filter]);

  return <ProductsListing products={filteredProducts} />;
};

const ProductFetch = () => {
  return (
    <ApiDataRenderer
      config={{
        url: ENDPOINTS.GET_ITEMS,
      }}
      renderData={(initialProducts) => (
        <ProductsStoreListing initialProducts={initialProducts} />
      )}
    />
  );
};
export default ProductFetch;
