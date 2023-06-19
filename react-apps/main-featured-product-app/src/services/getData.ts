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

export const addProductToShoppingCart = (product: any) => {
  // Todo: Handle get current user_id, user_name
  let currentUserId = 'user_id'; 
  let currentUserName = '';
  
  const localStorageKey = currentUserId;
  const discount = product.discount;
  const price = product.price;
  
  const newCartItem = {
    id: product.id,
    price: (discount <= 0 || discount > 100) ? price : price * (1 - (discount > 1 ? discount / 100 : discount)),
    quantity: 1,
    name: product.name,
    image_link: product.main_image_url
  };
  
  let shoppingCart = JSON.parse(localStorage.getItem(localStorageKey) ?? "{}");
  if (Object.keys(shoppingCart).length === 0) {
    shoppingCart = {
      cart_data: [newCartItem],
      discount_codes: [],
      total: 0,
      user_id: currentUserId,
      user_name: currentUserName 
    };
  } else {
    const cardProduct = shoppingCart.cart_data.find(p => p.id === product.id);
    if (cardProduct) {
      newCartItem.quantity += cardProduct.quantity;
      shoppingCart.cart_data = shoppingCart.cart_data.filter(p => p.id !== product.id);
    }
    shoppingCart.cart_data.push(newCartItem);
  }
  
  shoppingCart.total = shoppingCart.cart_data.reduce((sum, item) => {
    return (item && item.price && item.quantity)
        ? sum + (item.price * item.quantity)
        : sum;
  }, 0);

  localStorage.setItem(localStorageKey, JSON.stringify(shoppingCart));
  
  const channel = new BroadcastChannel('CART_HEADER_CHANNEL');
  channel.postMessage({ type: 'ADD_CART_ITEM' });
  channel.close();
}