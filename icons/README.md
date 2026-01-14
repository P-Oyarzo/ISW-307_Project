# PWA Icons

This folder should contain the PWA icons referenced in `manifest.json`.

## Required Icons

Generate the following icon sizes:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## How to Generate Icons

### Option 1: Online Generator (Easiest)
1. Create a 512x512px image with the 🎬 emoji or custom design
2. Use [PWA Asset Generator](https://progressier.com/pwa-icons-and-ios-splash-screen-generator)
3. Upload your image
4. Download generated icons
5. Place in this folder

### Option 2: Use Favicon.io
1. Go to https://favicon.io/favicon-converter/
2. Upload a 512x512 image
3. Download the package
4. Rename files to match manifest.json requirements

### Option 3: Simple Placeholder
For testing, you can use a simple colored square:
```bash
# Using ImageMagick (if installed)
convert -size 512x512 xc:#1a1a2e -pointsize 300 -fill white \
  -gravity center -annotate +0+0 "🎬" icon-512x512.png

# Then resize for other sizes
convert icon-512x512.png -resize 192x192 icon-192x192.png
convert icon-512x512.png -resize 384x384 icon-384x384.png
# etc...
```

### Option 4: Use Online Tools
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Favicon Generator](https://www.favicon-generator.org/)
- [PWA Builder](https://www.pwabuilder.com/imageGenerator)

## Temporary Workaround

Until you generate proper icons, the app will still work. The browser will:
- Show a default icon when installing
- Display a broken image icon in the app drawer

The PWA functionality (offline, etc.) will work regardless of icons.
