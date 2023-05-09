import HeroBanner from "./components/hero-banner/hero-banner.component";
import {BrowserRouter} from "react-router-dom"
export default function Root() {
  return (
      <BrowserRouter>
        <HeroBanner />
      </BrowserRouter>
  );
}
