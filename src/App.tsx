import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ScrollToTop } from "./main";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Container maxW="100%" px={["0rem"]} as="main" mt={"4.3rem"}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}
export default App;
