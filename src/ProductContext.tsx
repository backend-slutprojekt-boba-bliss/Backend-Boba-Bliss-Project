import { createContext, PropsWithChildren, useContext } from "react";
import { Product, products } from "../data";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

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
  const [productList, setProductList] = useLocalStorageState<Product[]>(
    products,
    "products"
  );

  const addProduct = (product: Product) => {
    setProductList((prevProductList) => {
      const updatedProductList = [...prevProductList, product];
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
