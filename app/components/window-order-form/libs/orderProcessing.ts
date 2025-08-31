import { calculateAndUpdateWindow, type WindowObject } from '../schemas/createWindowObject';

interface RawWindowData {
  'original_measurements.top'?: string | number;
  'original_measurements.bottom'?: string | number;
  'original_measurements.left'?: string | number;
  'original_measurements.right'?: string | number;
  'thickness_vector.jamb_depth'?: string | number;
  'thickness_vector.sill_depth'?: string | number;
  'thickness_vector.head_depth'?: string | number;
  'thickness_vector.casing_depth'?: string | number;
  original_measurements?: {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
  };
  original_vertical_splits?: Array<{
    position: number;
    direction?: 'left-to-right' | 'right-to-left';
    [key: string]: any;
  }>;
  [key: string]: any;
}

interface OrderData {
  Order_Id?: string;
  Client_Name?: string;
  Windows?: RawWindowData[];
  last_updated?: string;
  [key: string]: any;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Function to normalize form data to expected structure
function normalizeWindowData(window: RawWindowData): WindowObject {
  // Handle dot notation fields from form
  const normalized = { ...window };
  
  // Always prioritize dot notation fields over nested structure
  if (window['original_measurements.top'] !== undefined || window['original_measurements.bottom'] !== undefined || 
      window['original_measurements.left'] !== undefined || window['original_measurements.right'] !== undefined) {
    normalized.original_measurements = {
      top: parseFloat(String(window['original_measurements.top'])) || 0,
      bottom: parseFloat(String(window['original_measurements.bottom'])) || 0,
      left: parseFloat(String(window['original_measurements.left'])) || 0,
      right: parseFloat(String(window['original_measurements.right'])) || 0
    };
  } else if (normalized.original_measurements) {
    // Convert existing nested object values to numbers
    normalized.original_measurements = {
      top: parseFloat(String(normalized.original_measurements.top)) || 0,
      bottom: parseFloat(String(normalized.original_measurements.bottom)) || 0,
      left: parseFloat(String(normalized.original_measurements.left)) || 0,
      right: parseFloat(String(normalized.original_measurements.right)) || 0
    };
  }
  
  // Convert thickness vector fields if they exist as dot notation
  if (window['thickness_vector.jamb_depth']) {
    normalized.thickness_vector = {
      jamb_depth: parseFloat(String(window['thickness_vector.jamb_depth'])) || 0,
      sill_depth: parseFloat(String(window['thickness_vector.sill_depth'])) || 0,
      head_depth: parseFloat(String(window['thickness_vector.head_depth'])) || 0,
      casing_depth: parseFloat(String(window['thickness_vector.casing_depth'])) || 0
    };
  }
  
  // Normalize vertical splits to left-to-right for consistent database storage
  if (normalized.original_vertical_splits && Array.isArray(normalized.original_vertical_splits)) {
    const windowWidth = Number(normalized.original_measurements?.top) || 0;
    normalized.original_vertical_splits = normalized.original_vertical_splits.map(split => {
      if (split.direction === 'right-to-left') {
        return {
          ...split,
          position: windowWidth - split.position,
          direction: 'left-to-right'
        };
      }
      return {
        ...split,
        direction: 'left-to-right' // Ensure all splits are marked as left-to-right
      };
    });
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
  
  return normalized as WindowObject;
}

// Function to process and calculate all windows in an order
export function processOrderWindows(order: OrderData): OrderData {
  if (!order.Windows || !Array.isArray(order.Windows)) {
    return order;
  }

  const processedWindows = order.Windows.map((window: RawWindowData) => {
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
export function validateOrderForSave(order: OrderData): ValidationResult {
  const errors: string[] = [];

  if (!order.Order_Id) {
    errors.push('Order ID is required');
  }

  if (!order.Client_Name || order.Client_Name.trim() === '') {
    errors.push('Client Name is required');
  }

  // Validate windows
  if (order.Windows && Array.isArray(order.Windows)) {
    order.Windows.forEach((window: RawWindowData, index: number) => {
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
export function prepareOrderForDatabase(order: OrderData): OrderData {
  // Process all windows with calculations
  const processedOrder = processOrderWindows(order);
  
  // Add last updated timestamp
  return {
    ...processedOrder,
    last_updated: new Date().toISOString()
  };
}

export default {
  processOrderWindows,
  validateOrderForSave,
  prepareOrderForDatabase
};
