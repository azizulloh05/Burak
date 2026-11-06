import { Types } from "mongoose";
import { OrderStatus } from "../enums/order.enum";

export interface OrderItem {
  _id: Types.ObjectId;
  itemQuantity: number;
  itemPrice: number;
  orderId: Types.ObjectId;
  productId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: Types.ObjectId;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  memberId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  /** from aggregate */
  orderItems: OrderItem[];
}

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: Types.ObjectId;
  orderId?: Types.ObjectId;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}