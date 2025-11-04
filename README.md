# 📚 Idlely - Smart Academic Task Management Platform

> Transform your academic productivity with AI-powered task management, study sessions, and personalized insights.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🌟 Features

### 🎯 Core Functionality
- **Smart Assignment Management** - AI-powered parsing and scheduling
- **Goal Tracking** - Set, track, and achieve academic goals with AI insights
- **Study Sessions** - Pomodoro timer with custom durations and analytics
- **Calendar Integration** - Sync with Google Calendar and other calendars
- **Real-time Analytics** - Track progress, streaks, and performance metrics

### 🎨 User Experience
- **Theme Customization** - Discord Nitro-style visual customization
- **Theme Gallery** - Free and premium theme marketplace
- **Responsive Design** - Mobile-first, PWA-enabled application
- **Dark/Light Mode** - Seamless theme switching with persistence
- **Guest Mode** - Try the app without creating an account

### 🤖 AI-Powered Features
- **Smart Text Parsing** - Convert natural language to structured tasks
- **Study Planning** - AI-generated personalized study schedules
- **Goal Decomposition** - Break down large goals into actionable steps
- **Deadline Reminders** - Intelligent notification system
- **Performance Analytics** - AI insights on study patterns and productivity

### 🔐 Security & Privacy
- **Supabase Authentication** - Secure Google OAuth and email/password
- **Row Level Security** - Database-level access control
- **Guest Mode** - Full functionality without account creation
- **Data Encryption** - End-to-end encryption for sensitive data

## 🏗️ Technology Stack

### Frontend
- **React 18** - Modern UI framework with hooks and concurrent features
- **TypeScript** - Type-safe development experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **React Router** - Client-side routing
- **React Hook Form** - Performant form management

### Backend
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Database security policies
- **Edge Functions** - Serverless functions for AI processing
- **Real-time Subscriptions** - Live data synchronization

### AI & Analytics
- **Custom AI Services** - Integrated AI for text parsing and insights
- **Chart.js/Recharts** - Data visualization
- **Analytics Engine** - Performance tracking and insights

### Development Tools
- **ESLint** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefixing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (preferred) or npm - Package manager
  ```bash
  npm install -g pnpm
  ```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/aceteria/idlely-app.git
cd idlely-app
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Setup
Copy the environment variables template:
```bash
cp .env.example .env
```

Update the `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start Development Server
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## 📚 Available Scripts

```bash
# Development
pnpm dev                  # Start development server
pnpm build               # Build for production
pnpm build:strict        # Build with TypeScript strict checking
pnpm build:prod          # Production build with optimizations

# Code Quality
pnpm lint                # Run ESLint
pnpm preview             # Preview production build

# Maintenance
pnpm install-deps        # Install dependencies only
pnpm clean              # Clean node_modules and cache
```

## 🏛️ Project Structure

```
idlely-app/
├── public/                 # Static assets
│   ├── manifest.json      # PWA manifest
│   └── service-worker.js  # Service worker
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components (buttons, cards, etc.)
│   │   ├── ai/           # AI-related components
│   │   └── chat/         # Chat interface components
│   ├── contexts/         # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── CustomizationContext.tsx
│   │   ├── NotificationContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   │   └── supabase.ts  # Supabase client and types
│   ├── pages/           # Application pages/routes
│   │   ├── Dashboard.tsx
│   │   ├── AssignmentsPage.tsx
│   │   ├── GoalsPage.tsx
│   │   ├── StudySessionsPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   └── ...
│   ├── services/        # API services and utilities
│   ├── utils/           # Utility functions
│   │   ├── enhanced-parser.ts
│   │   ├── haptics.ts
│   │   ├── notifications.ts
│   │   └── ...
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── supabase/            # Supabase configuration
│   ├── functions/       # Edge functions
│   └── migrations/      # Database migrations
├── docs/                # Documentation
│   ├── guides/          # Setup and usage guides
│   ├── api/            # API documentation
│   └── deployment/     # Deployment guides
├── package.json         # Project dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── .env.example         # Environment variables template
```

## 🔧 Configuration

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Update your `.env` file with these credentials

### Database Schema
The application uses the following main tables:
- `user_profiles` - User profile information
- `assignments` - Academic assignments and tasks
- `goals` - Academic goals and objectives
- `study_sessions` - Study session tracking
- `calendar_events` - Calendar integration
- `themes` - Theme marketplace
- `user_themes` - User theme purchases

### Authentication
Supports multiple authentication methods:
- **Google OAuth** - One-click Google sign-in
- **Email/Password** - Traditional email authentication
- **Guest Mode** - Full app functionality without account

## 🎨 Theme System

Idlely features a sophisticated theming system:

### Free Themes
- Default Light/Dark
- Academic Blue
- Study Green

### Premium Themes (Discord Nitro Style)
- Gradient themes with smooth animations
- Custom color schemes
- Animated backgrounds
- Premium layouts

## 📱 Mobile & PWA

The application is optimized for mobile devices:

- **Responsive Design** - Works seamlessly on all screen sizes
- **PWA Ready** - Install as native app on mobile devices
- **Offline Support** - Core functionality available offline
- **Touch Optimized** - Mobile-first interaction design

## 🚀 Deployment

### Development Deployment
```bash
pnpm build
pnpm preview
```

### Production Deployment
The application can be deployed to any static hosting service:

1. **Build the application**:
   ```bash
   pnpm build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - [Vercel](https://vercel.com)
   - [Netlify](https://netlify.com)
   - [GitHub Pages](https://pages.github.com)
   - [Firebase Hosting](https://firebase.google.com/products/hosting)

### Environment Variables
Ensure all production environment variables are set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📖 Documentation

- [User Guide](docs/guides/user-guide.md) - How to use Idlely
- [API Reference](docs/api/) - API documentation
- [Deployment Guide](docs/deployment/) - Detailed deployment instructions
- [Development Guide](docs/guides/development.md) - Contributing guidelines

## 🧪 Testing

```bash
# Run tests (when implemented)
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](docs/guides/development.md) for details on:

- Code of conduct
- Development workflow
- Pull request process
- Coding standards

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- 📧 **Email**: support@idlely.app
- 📖 **Documentation**: [docs.idlely.app](https://docs.idlely.app)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/aceteria/idlely-app/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/aceteria/idlely-app/discussions)

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Core task management
- [x] Study session tracking
- [x] Theme system
- [x] AI text parsing
- [x] Guest mode

### Phase 2 (Upcoming)
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard
- [ ] API for third-party integrations
- [ ] Mobile app (React Native)
- [ ] Advanced AI study planning

### Phase 3 (Future)
- [ ] Multi-language support
- [ ] Advanced calendar integrations
- [ ] Gamification system
- [ ] Academic institution partnerships
- [ ] AI-powered exam preparation

## 👥 Team

- **Developer**: aceteria
- **AI Consultant**: Built-in AI services
- **Design**: Modern UI/UX patterns

---

**Made with ❤️ for students worldwide**

*Transform your academic productivity with AI-powered insights and beautiful design.*