import axios from 'axios';
import { Category } from '../types/Category';
import { Product } from '../types/Product';

const DATA_ENDPOINT = process.env.BACK_END_URL + 'data/data.json'

export const getCategoriesAsync = async (): Promise<Category[]> => {
  const rs = await fetchDataAsync();

  const featuredProduct = rs.products.filter(p => p.is_featured);
  const featuredCategory = rs.categories.filter(c =>
    featuredProduct.some(p => p.category_id === c.id));

  return featuredCategory;
}

export const getFeaturedProductAsync = async (categoryId?: number): Promise<Product[]> => {
  const rs = await fetchDataAsync();

  if (categoryId == undefined) return rs.products.filter(p => p.is_featured).slice(0, 9);

  return rs.products.filter(p => p.is_featured && p.category_id === categoryId).slice(0, 9);
}


const fetchDataAsync = async (): Promise<Data> => {
  try {
    const response = await axios.get(DATA_ENDPOINT);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  categories: Category[],
  products: Product[],
}