const FRAME_CONFIGURATIONS = [
  "full-top", 
]

const FRAME_CONFIGURATIONS_META = {
  "full-top": {
    "label": "Full Top Piece",
    "diagram-link": "future file path for diagram"
  }, 
}

const FRAMING_MATERIALS = [
  "pvc_1x2", 
  "wood2x2",
  "primedpine1x2",
  "primedpine1x6", "primedpine1x8","primedpine1x10", "primedpine1x12",
  "standard_vertical_split",
  "thin_vertical_split",
  "horizontal_split_3/8_panels",
  "horizontal_split_1/4_panels"
]

// note on something i'm not too sure how to account for
// there should also be standard pieces that's like 2-3 framing materials combined
// for example standard_vertical_split is 2 pvc_1x2 and and 2 wood 2x2's added together
// the warehosue person would need to cut 3 pieces and join them together

const FRAMING_MATERIALS_META = {
  "pvc_1x2": {
    name: "Standard 1x2 PVC",
    width: 1.5,
    thickness: 5/8,
    preferred_length: 8*12,
    max_length: 8*12
  },
  "primed_pine1x6":{
    name:"Primed Pine 1x6",
    width: 5.75,
    thickness: 3/4,
    preferred_length: 8*12,
    max_length: 10*12
  }
}

const FRAME_MOUNTING_DIRECTIONS = ["Width Is Front-Facing", "Thickness Is Front-Facing"]
// ^^
// **Business logic for FRAME_MOUNTING_DIRECTIONS**
// - extensions by default will be thickness Front Facing
// - paddings have no default logic
// - PVC trim with metal tape is always width front facing 


// **logic for calculating cut sheets**
// 1. if extension, calculate cut lengths for extension pieces and update 4 window dimensions + middle splits
// 2. (skip for MVP) if padding, calculate padding pieces and update 4 window dimensions + middle splits
// 3. calculate the lengths of the frame pieces used for the metal tape / panels 


// output for 8/20
// calculateFrameCutSheet
// - inputs: T, B, L, R measurement | configuration | material type
// - output: Top, B, L, R length of specific materials to cut & new effective window size and vert + horizontal middle split sizes

