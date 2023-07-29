import { useEffect, useState } from "react";
import { Category } from "../types/Category";
import { getCategoriesAsync } from "../services/getData";

const DEFAULT_ACTIVE_CATEGORY = 0;

export type FeaturedProductNavigationProps = {
  filterCategory: Function;
};

const FeaturedProductNavigation: React.FC<FeaturedProductNavigationProps> = ({
  filterCategory,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activatingCategory, setActiveCategory] = useState(
    DEFAULT_ACTIVE_CATEGORY
  );

  const categoryClassName = (categoryId: number): string => {
    if (categoryId === activatingCategory) return "active";

    return "";
  };

  const activeCategory = (id: number) => {
    setActiveCategory(id);

    if (id === DEFAULT_ACTIVE_CATEGORY) {
      filterCategory();
      return;
    }
    filterCategory(id);
  };

  const fetchCategoriesAsync = async () => {
    const rs = await getCategoriesAsync();
    setCategories(rs);
  };

  useEffect(() => {
    fetchCategoriesAsync();
  }, []);

  return (
    <div className="featured__controls">
      <ul>
        <li
          className={categoryClassName(DEFAULT_ACTIVE_CATEGORY)}
          onClick={() => activeCategory(DEFAULT_ACTIVE_CATEGORY)}
        >
          All
        </li>
        {categories.map((c) => (
          <li
            key={c.id}
            className={categoryClassName(c.id)}
            onClick={() => activeCategory(c.id)}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedProductNavigation;
