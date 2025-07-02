# Portfolio - Next.js App Routernpm

A modern portfolio website built with Next.js 14 and the App Router, featuring interactive chat, weather display, and dark mode support.

## 🚀 Features

- **Interactive Chat System** - Dynamic dialogue with character portraits
- **Real-time Weather** - Current weather and forecast display
- **Dark/Light Mode** - Toggle between themes with system preference detection
- **Responsive Design** - Works on all devices
- **SSR Optimized** - Server-side rendering for better performance
- **Redux State Management** - Centralized state with persistence

## 🏗️ Project Structure

```
src/
└── app/                    # Next.js App Router
    ├── components/         # Reusable UI components
    │   ├── background/    # Animated background component
    │   ├── ChatBox/       # Interactive chat system
    │   ├── Main/         # Main layout component
    │   ├── Switch/       # Theme toggle component
    │   └── Weather/      # Weather display components
    ├── data/             # Static data files
    │   └── dialogueScript.json
    ├── features/         # Redux slices
    │   └── story/
    ├── hooks/            # Custom React hooks
    │   ├── useDarkMode.js
    │   ├── useStorage.js
    │   └── useDynamicRefs.js
    ├── lib/              # Utility libraries
    │   ├── store.js      # Redux store configuration
    │   └── browserStorage.js
    ├── globals.css       # Global styles
    ├── app.css          # App-specific styles
    ├── layout.js        # Root layout
    ├── page.js          # Home page
    └── client-layout.js # Client-side wrapper
public/                   # Static assets
├── gif/                 # Character animations
├── showcase/           # Portfolio images
└── ...                 # Other static files
```

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Moment.js** - Date/time utilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenWeatherMap API key:
```
NEXT_PUBLIC_API_URL=https://api.openweathermap.org/data/2.5
NEXT_PUBLIC_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding New Chat Dialogue

Edit `src/app/data/dialogueScript.json` to add new conversation nodes and responses.

### Styling

- Global styles: `src/app/globals.css`
- Component styles: `src/app/components/*/styles.css`
- Tailwind CSS: Utility classes in components

### Theme Customization

The dark/light mode system uses CSS classes. Modify the theme colors in the respective CSS files.

## 🔧 Development

### Component Structure

Each component follows this structure:
```
ComponentName/
├── ComponentName.js    # Main component
├── styles.css         # Component styles (if needed)
└── index.js           # Export file (optional)
```

### State Management

- Redux store: `src/app/lib/store.js`
- Slices: `src/app/features/`
- Persistence: `src/app/lib/browserStorage.js`

### Hooks

Custom hooks are located in `src/app/hooks/`:
- `useDarkMode` - Theme management
- `useStorage` - Local storage utilities
- `useDynamicRefs` - Dynamic ref management

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:
```bash
npm run build
```

The built files will be in the `.next` directory.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, please open an issue in the GitHub repository.
