import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { addProduct } from "../components/AddProductForm";
import { Product } from "../data";

type ProductContextType = {
  productList: Product[];
  addProduct: (product: addProduct) => void;
  deleteProduct: (id: string) => void;
  editProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType>({
  productList: [],
  addProduct: (product: addProduct) => {},
  deleteProduct: (id: string) => {},
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

  const deleteProduct = (id: string) => {
    axios
      .delete(`http://127.0.0.1:3000/api/products/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      .then(function (response) {
        console.log(response);
        setProductList((prevProductList) => {
          // Create a new array without the deleted product
          const updatedProductList = prevProductList.filter((product) => product._id !== id);
          return updatedProductList;
        });
      })
      .catch(function (error) {
        console.error(error);
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
      value={{ productList, addProduct, deleteProduct, editProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}
