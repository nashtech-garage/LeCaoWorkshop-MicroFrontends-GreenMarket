import { OrderDetail } from "./order-detail.model";

export interface Order {
  userId: string;
  userName: string;
  total: number;
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  orderNotes: string;
  orderDetails: OrderDetail[];
}
