import ProductDetail from "./components/product-detail/ProductDetail.component";
import {BrowserRouter} from "react-router-dom"
export default function Root() {
  return (
      <BrowserRouter>
        <ProductDetail />
      </BrowserRouter>
  );
}
