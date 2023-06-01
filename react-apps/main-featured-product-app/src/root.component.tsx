import { useState } from "react";
import FeaturedProductNavigation from "./components/FeaturedProductNavigation";
import ProductCard from "./components/ProductCard";
import { BrowserRouter } from "react-router-dom";

export default function Root(props) {
  const [activetingCategoryId, setCategoryId] = useState<number>();

  const filterCategory = (id: number) => {
    setCategoryId(id);
  }

  return (
    <BrowserRouter>
      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Featured Product</h2>
              </div>
              <FeaturedProductNavigation filterCategory={filterCategory}/>
            </div>
          </div>
          <ProductCard categoryId={activetingCategoryId} />
        </div>
      </section>
    </BrowserRouter>
  );
}
