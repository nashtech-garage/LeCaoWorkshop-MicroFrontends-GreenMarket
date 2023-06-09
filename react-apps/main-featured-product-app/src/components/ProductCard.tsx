import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { getFeaturedProductAsync } from "../services/getData";
import { Link } from "react-router-dom";

export type ProductCardProps = {
  categoryId: number,
}

const ProductCard: React.FC<ProductCardProps> = ({ categoryId }) => {
  const rootConfigUrl = process.env.URL_ROOT_CONFIG;
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProductAsync = async (categoryId: number) => {
    const rs = await getFeaturedProductAsync(categoryId);
    setProducts(rs);
  }

  useEffect(() => {
    fetchProductAsync(categoryId);
  }, [categoryId]);

  return (
    <div className="row featured__filter">
      {products.map(p => (
        <div key={p.id} className="col-lg-3 col-md-4 col-sm-6">
          <div className="featured__item">
            <div
              className="featured__item__pic set-bg"
              style={{backgroundImage: `url(${process.env.BACK_END_URL + p.main_image_url})`}}
            >
              <ul className="featured__item__pic__hover">
                <li>
                  <a href="#"><i className="fa fa-heart"></i></a>
                </li>
                <li>
                  <a href="#"><i className="fa fa-retweet"></i></a>
                </li>
                <li>
                  <a href="#"><i className="fa fa-shopping-cart"></i></a>
                </li>
              </ul>
            </div>
            <div className="featured__item__text">
              <h6>
                <Link to={`${rootConfigUrl}shop-detail?id=${p.id}`}>
                  {p.name}
                </Link>
              </h6>
              <h5>${p.price}</h5>
            </div>
          </div>
        </div>))}
    </div>
  );
}

export default ProductCard;