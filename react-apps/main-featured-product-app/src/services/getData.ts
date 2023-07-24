import axios from 'axios';
import { Category } from '../types/Category';
import { Product } from '../types/Product';

const DATA_ENDPOINT = process.env.BACK_END_URL + 'data/data.json'
const PRODUCT_DATA_ENDPOINT = process.env.COMMON_API_URL + '/api/Product/all'
const CATEGORY_DATA_ENDPOINT = process.env.COMMON_API_URL + '/api/Category/all'

export const getCategoriesAsync = async (): Promise<Category[]> => {
  const categoryData = await fetchCategoryDataAsync();
  const productData = await fetchProductDataAsync();

  const featuredProduct = productData.filter(p => p.is_Featured);
  const featuredCategory = categoryData.filter(c =>
    featuredProduct.some(p => p.category_Id === c.id));

  return featuredCategory;
}

// export const getCategoriesAsync = async (): Promise<Category[]> => {
//   const rs = await fetchDataAsync();

//   const featuredProduct = rs.products.filter(p => p.is_Featured);
//   const featuredCategory = rs.categories.filter(c =>
//     featuredProduct.some(p => p.category_id === c.id));

//   return featuredCategory;
// }

export const getFeaturedProductAsync = async (categoryId?: number): Promise<Product[]> => {
  const rs = await fetchProductDataAsync();

  if (categoryId == undefined) return rs.filter(p => p.is_Featured).slice(0, 9);

  return rs.filter(p => p.is_Featured && p.category_Id === categoryId).slice(0, 9);
}


const fetchDataAsync = async (): Promise<Data> => {
  try {
    const response = await axios.get(DATA_ENDPOINT);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

const fetchProductDataAsync = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(PRODUCT_DATA_ENDPOINT);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const fetchCategoryDataAsync = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(CATEGORY_DATA_ENDPOINT);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  categories: Category[],
  products: Product[],
}
