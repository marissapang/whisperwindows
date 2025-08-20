
export function getMainExtensionCuts(
    min_w, // inches
    min_h, // inches
    t, // thickness of material
    mount, // "inside" or "outside"
    fit, // "tight_fit" or "exact" or "minimize_cutting"
    orientation = "full_width", // "full_width" or "full_height"
) {
  
  // orientation adjustments
  let w_pad = 0;
  let h_pad = 0;

  if (mount === "inside") {
    if (orientation === "full_width") {
      w_pad = 0;
      h_pad = -t * 2;
    } else if (orientation === "full_height") {
      w_pad = -t * 2;
      h_pad = 0;
    }
  } else if (mount === "outside") {
    if (orientation === "full_width") {
      w_pad = 0;
      h_pad = -t * 2;
    } else if (orientation === "full_height") {
      w_pad = -t * 2;
      h_pad = 0;
    }
  }
  
  // fit adjustments
  let offset = 0;
  if (fit === "tight_fit") {
    offset = 1/8;
  } else if (fit === "exact") {
    offset = 0;
  } else if (fit === "minimize_cutting") {
    offset = -1/8;
  }
   
  return {
    cuts: {
      top: min_w + w_pad + offset,
      bot: min_w + w_pad + offset,
      left: min_h + h_pad + offset, 
      right: min_h + h_pad + offset
    }, 
    int_dims: {
      top: min_w + w_pad + offset,
      bot: min_w + w_pad + offset,
      left: min_h + h_pad + offset, 
      right: min_h + h_pad + offset
    }
  };
}