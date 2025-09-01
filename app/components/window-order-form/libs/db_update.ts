// Function to prepare order data for database save
export function prepareOrderForDatabase(order: OrderData): OrderData {
  // Process all windows with calculations
  const processedOrder = processOrderWindows(order);
  
  // Add last updated timestamp
  return {
    ...processedOrder,
    last_updated: new Date().toISOString()
  };
}