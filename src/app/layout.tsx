// In rootLayout.tsx, replace all icon paths with the CDN URL if intended for logos.  
// ⚠️ WARNING: This is NOT standard practice for favicons. Only proceed if you want ALL icons to use the logo.  
export const metadata: Metadata = {  
  title: "LostyoCord",  
  description: "...",  
  // Update these URLs if you want to force the CDN logo for ALL icons:  
  icon: [  
    { url: "https://cdn.lostyo.com/logo.png", sizes: "16x16", type: "image/png" },  
    // ... other entries ...  
  ],  
  // ... rest of metadata ...  
};