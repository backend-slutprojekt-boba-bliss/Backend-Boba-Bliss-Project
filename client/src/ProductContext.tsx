import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "./data";

type ProductContextType = {
  productList: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  editProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType>({
  productList: [],
  addProduct: (product: Product) => {},
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

  const addProduct = (product: Product) => {
    setProductList((prevProductList) => {
      const updatedProductList = [...prevProductList, product];
      const newProduct = product;
      axios
        .post("http://127.0.0.1:3000/api/products", newProduct, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
      return updatedProductList;
    });
  };

  const removeProduct = (id: string) => {
    setProductList((prevProductList) => {
      const itemIndex = prevProductList.findIndex(
        (product) => product.id === id
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
    setProductList((prevProductList) => {
      const updatedProductList = prevProductList.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
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
