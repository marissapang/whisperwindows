// can be simplified in the future
import {type WindowObject } from '../libs/constructors';

interface OrderData {
  Order_Id?: string;
  Client_Name?: string;
  Windows?: [];
  last_updated?: string;
  [key: string]: any;
}


// Function to prepare order data for database save
export function prepareOrderForDatabase(order: OrderData): OrderData {
  return {
    ...order,
    last_updated: new Date().toISOString()
  };
}

export default {
  prepareOrderForDatabase
};
