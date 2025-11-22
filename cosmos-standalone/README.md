# Cosmos - Standalone HTML Version

A complete standalone version of the Cosmos Brand Strategy Builder that runs directly in your browser without any installation.

## 📁 Package Contents

```
cosmos-standalone/
├── index.html          # Main application file (open this!)
├── models/
│   ├── Lava_Planet_2.obj
│   ├── Lava_Planet_2.mtl
│   └── maps/
│       ├── GraphicsCrate-Lava_Planet_2.jpg
│       ├── GraphicsCrate-Lava_Planet_2_Height.jpg
│       └── GraphicsCrate-Lava_Planet_2_Illumination.jpg
└── README.md           # This file
```

## 🚀 How to Use

### Option 1: Direct File Opening (Recommended)
1. **Download** the entire `cosmos-standalone` folder
2. **Double-click** on `index.html`
3. Your default browser will open the application
4. Start building your brand cosmos!

### Option 2: Local Web Server (For Best Experience)
If you have Python installed:

```bash
# Navigate to the cosmos-standalone folder
cd cosmos-standalone

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Option 3: Using Node.js
If you have Node.js installed:

```bash
# Install a simple server (one-time)
npm install -g http-server

# Navigate to the cosmos-standalone folder
cd cosmos-standalone

# Start the server
http-server
```

## ✨ Features Included

- ✅ **3D Animated Lava Planet** - Interactive rotating sphere with realistic lighting
- ✅ **Grid Background** - Animated grid that fades on scroll
- ✅ **Core Concepts Cards** - 5 fundamental brand building blocks
- ✅ **Central Conflict Input** - Define your brand's main challenge
- ✅ **37 Strategic Questions** - Organized in 3 collapsible sections:
  - **Homeland** (15 questions) - Physical world building
  - **Hierarchy** (9 questions) - Power and structure
  - **Habitat** (13 questions) - Culture and daily life
- ✅ **Dynamic Reply Management** - Add/remove multiple answers per question
- ✅ **Dark Theme Design** - Complete HSL-based design system
- ✅ **Fully Responsive** - Works on desktop, tablet, and mobile
- ✅ **No Installation Required** - Runs directly in browser

## 🌐 Browser Compatibility

**Recommended Browsers:**
- ✅ Google Chrome (latest)
- ✅ Microsoft Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

**Requirements:**
- Modern browser with WebGL support (for 3D rendering)
- JavaScript enabled
- Minimum screen resolution: 320px width

## 📦 What's Inside the HTML

All dependencies are loaded from CDN:
- **React 18** - UI framework
- **Three.js** - 3D rendering engine
- **Tailwind CSS** - Styling framework
- **Lucide Icons** - Icon library

All code is contained in a single HTML file for maximum portability.

## 💾 Data Persistence

**Note:** This standalone version does NOT automatically save your progress. Your answers will be lost if you:
- Close the browser tab
- Refresh the page
- Navigate away

**Recommendation:** 
- Copy your answers to a document periodically
- Take screenshots of completed sections
- Or use the browser's "Print to PDF" feature to save your work

## 🎨 Customization

The design system is defined in the `<style>` section using CSS variables:

```css
:root {
  --background: 0 0% 3%;
  --foreground: 0 0% 98%;
  --primary: 2 89% 29%;
  --secondary: 330 100% 50%;
  --accent: 280 100% 60%;
  /* ... and more */
}
```

Feel free to modify these values to customize colors!

## 🐛 Troubleshooting

### 3D Model Not Loading
- Ensure the entire `models/` folder is in the same directory as `index.html`
- Check browser console for errors (F12)
- Try using a local web server (Option 2 or 3 above)

### Accordion Not Working
- Make sure JavaScript is enabled in your browser
- Clear browser cache and reload (Ctrl+F5 / Cmd+Shift+R)

### Styling Issues
- Try hard refresh (Ctrl+F5 / Cmd+Shift+R)
- Ensure you're using a modern browser

## 📝 File Size

- **Total Package:** ~8-10 MB
- **HTML File:** ~45 KB
- **3D Models + Textures:** ~7-8 MB

## 🔒 Privacy

This application runs **100% offline** in your browser:
- No data is sent to any server
- No tracking or analytics
- No external dependencies except CDN libraries
- All your answers stay on your computer

## 📄 License

This is a standalone version of the Cosmos Brand Strategy Builder.
All code and assets are provided as-is for personal and commercial use.

## 🆘 Support

If you encounter issues:
1. Check this README for troubleshooting steps
2. Try different browsers
3. Make sure all files are in the correct folder structure
4. Use a local web server for best compatibility

---

**Enjoy building your brand cosmos! 🌌✨**
