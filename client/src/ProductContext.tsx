import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { addProduct } from "./components/AddProductForm";
import { Product } from "./data";

type ProductContextType = {
  productList: Product[];
  addProduct: (product: addProduct) => void;
  removeProduct: (id: string) => void;
  editProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType>({
  productList: [],
  addProduct: (product: addProduct) => {},
  removeProduct: (id: string) => {},
  editProduct: (product: Product) => {},
});

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: PropsWithChildren) {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        const products = response.data;
        setProductList(products);
      })
      .catch((error) => {
        console.log("An error occurred while fetching the products:", error);
      });
  }, []);

  const addProduct = (product: addProduct) => {
    axios
      .post("http://127.0.0.1:3000/api/products", product, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        setProductList((prevProductList) => {
          const updatedProductList = [...prevProductList, response.data];
          return updatedProductList;
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const removeProduct = (id: string) => {
    setProductList((prevProductList) => {
      const itemIndex = prevProductList.findIndex(
        (product) => product._id === id
      );

      if (itemIndex === -1) {
        // Product not found
        return prevProductList;
      }

      // Create a new array without the product to be removed
      const updatedProductList = [
        ...prevProductList.slice(0, itemIndex),
        ...prevProductList.slice(itemIndex + 1),
      ];

      return updatedProductList;
    });
  };

  const editProduct = (editedProduct: Product) => {
    const updatedProduct = editedProduct;
    console.log(editedProduct);
    axios
      .put(`http://127.0.0.1:3000/api/products/${updatedProduct._id}`, updatedProduct, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });


    setProductList((prevProductList) => {
      const updatedProductList = prevProductList.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      );
      return updatedProductList;
    });
  };

  return (
    <ProductContext.Provider
      value={{ productList, addProduct, removeProduct, editProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}
