import { calculateAndUpdateWindow, type SingleOrDoubleHungWindow } from '../schemas/createSingleOrDoubleHungWindow';

// Function to normalize form data to expected structure
function normalizeWindowData(window: any): SingleOrDoubleHungWindow {
  // Handle dot notation fields from form
  const normalized = { ...window };
  
  // Always prioritize dot notation fields over nested structure
  if (window['original_measurements.top'] !== undefined || window['original_measurements.bottom'] !== undefined || 
      window['original_measurements.left'] !== undefined || window['original_measurements.right'] !== undefined) {
    normalized.original_measurements = {
      top: parseFloat(window['original_measurements.top']) || 0,
      bottom: parseFloat(window['original_measurements.bottom']) || 0,
      left: parseFloat(window['original_measurements.left']) || 0,
      right: parseFloat(window['original_measurements.right']) || 0
    };
  } else if (normalized.original_measurements) {
    // Convert existing nested object values to numbers
    normalized.original_measurements = {
      top: parseFloat(normalized.original_measurements.top) || 0,
      bottom: parseFloat(normalized.original_measurements.bottom) || 0,
      left: parseFloat(normalized.original_measurements.left) || 0,
      right: parseFloat(normalized.original_measurements.right) || 0
    };
  }
  
  // Convert thickness vector fields if they exist as dot notation
  if (window['thickness_vector.jamb_depth']) {
    normalized.thickness_vector = {
      jamb_depth: parseFloat(window['thickness_vector.jamb_depth']) || 0,
      sill_depth: parseFloat(window['thickness_vector.sill_depth']) || 0,
      head_depth: parseFloat(window['thickness_vector.head_depth']) || 0,
      casing_depth: parseFloat(window['thickness_vector.casing_depth']) || 0
    };
  }
  
  // Clean up dot notation fields
  delete normalized['original_measurements.top'];
  delete normalized['original_measurements.bottom'];
  delete normalized['original_measurements.left'];
  delete normalized['original_measurements.right'];
  delete normalized['thickness_vector.jamb_depth'];
  delete normalized['thickness_vector.sill_depth'];
  delete normalized['thickness_vector.head_depth'];
  delete normalized['thickness_vector.casing_depth'];
  
  return normalized;
}

// Function to process and calculate all windows in an order
export function processOrderWindows(order: any): any {
  if (!order.Windows || !Array.isArray(order.Windows)) {
    return order;
  }

  const processedWindows = order.Windows.map((window: any) => {
    // Normalize form data structure
    const normalizedWindow = normalizeWindowData(window);
    
    // Always run calculations if measurements are provided (even without extensions)
    if (normalizedWindow.original_measurements?.top > 0 && 
        normalizedWindow.original_measurements?.left > 0) {
      try {
        const calculatedWindow = calculateAndUpdateWindow(normalizedWindow);
        return calculatedWindow;
      } catch (error) {
        console.error('Calculation error:', error);
        return normalizedWindow;
      }
    }
    return normalizedWindow;
  });

  return {
    ...order,
    Windows: processedWindows
  };
}

// Function to validate order before saving
export function validateOrderForSave(order: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!order.Order_Id) {
    errors.push('Order ID is required');
  }

  if (!order.Client_Name || order.Client_Name.trim() === '') {
    errors.push('Client Name is required');
  }

  // Validate windows
  if (order.Windows && Array.isArray(order.Windows)) {
    order.Windows.forEach((window: any, index: number) => {
      // Normalize window data first
      const normalizedWindow = normalizeWindowData(window);
      
      if (normalizedWindow.extension?.Extension) {
        // Validate measurements for extension windows
        if (!normalizedWindow.original_measurements?.top || normalizedWindow.original_measurements.top <= 0) {
          errors.push(`Window ${index + 1}: Top measurement is required for extension`);
        }
        if (!normalizedWindow.original_measurements?.left || normalizedWindow.original_measurements.left <= 0) {
          errors.push(`Window ${index + 1}: Left measurement is required for extension`);
        }
        if (!normalizedWindow.original_measurements?.bottom || normalizedWindow.original_measurements.bottom <= 0) {
          errors.push(`Window ${index + 1}: Bottom measurement is required for extension`);
        }
        if (!normalizedWindow.original_measurements?.right || normalizedWindow.original_measurements.right <= 0) {
          errors.push(`Window ${index + 1}: Right measurement is required for extension`);
        }
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Function to prepare order data for database save
export function prepareOrderForDatabase(order: any): any {
  // Process all windows with calculations
  const processedOrder = processOrderWindows(order);
  
  // Add metadata
  const orderWithMetadata = {
    ...processedOrder,
    last_updated: new Date().toISOString(),
    calculation_version: '1.0.0'
  };

  return orderWithMetadata;
}

export default {
  processOrderWindows,
  validateOrderForSave,
  prepareOrderForDatabase
};
