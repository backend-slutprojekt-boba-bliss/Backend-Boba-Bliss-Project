import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { BigProductCard } from "../components/BigProductCard";
import { useProduct } from "../../src/ProductContext";

export function ProductPage() {
  const { productList } = useProduct();

  const params = useParams();
  const product = productList.find((p) => p.id === params.id);

  if (!product) {
    return <p>Produkten hittades inte...</p>;
  }

  return (
    <Box sx={bigGradient} className="parent">
      <BigProductCard
        product={product}
        backgroundUrl="/images/bubble-background-1.png"
        backgroundAlt="net"
      />
    </Box>
  );
}

const bigGradient = {
  backgroundImage: "linear-gradient(to bottom, transparent 22%, #FED3D4)",
  backgroundColor: "#fffaf4",
};
