'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { sendGTMEvent } from '@next/third-parties/google';

/**
 * Fires a 'page_view' event on the dataLayer on:
 *  - first page load
 *  - client-side route changes (App Router)
 */
export default function GtmPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Keep payload minimal; GTM/GA4 can read URL/title natively
    sendGTMEvent({ event: 'page_view' });
  }, [pathname, searchParams]);

  return null;
}


// // sample cocnversion code
// sendGTMEvent({
//   event: 'purchase',
//   transaction_id: order.id,
//   value: order.total,       // number
//   currency: order.currency, // e.g., 'USD'
//   items: order.items?.map(i => ({
//     item_id: i.sku,
//     item_name: i.name,
//     quantity: i.qty,
//     price: i.price,
//   })),
// });


// // setting up conversion on GTM UI
// B) Google Ads (Conversions)

// Create a conversion action in Google Ads and note the Conversion ID and Label.

// In GTM: Tag → New → “Google Ads Conversion Tracking”

// Enter Conversion ID + Label.

// Trigger: Custom Event → Event name: purchase.

// (Add more conversion tags for other events as needed, e.g., generate_lead.) 
// Google Help

// For conversions, create additional Pixel event tags (e.g., Purchase) and set Trigger: Custom Event → purchase. 
// tagmanager.google.com
// Analytics Mania
// data-marketing-school.com