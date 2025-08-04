# Neon Voyager - Futuristic Travel Guide App

## Overview

Neon Voyager is a visually stunning, futuristic travel guide application that combines modern web technologies with a cyberpunk-inspired neon aesthetic. The app provides users with an immersive experience for discovering destinations, planning itineraries, and exploring travel information through an interactive interface featuring animated backgrounds, glowing UI elements, and ambient soundscapes.

The application serves as a comprehensive travel companion with features including destination browsing, hotel and restaurant recommendations, attraction discovery, weather information, and a drag-and-drop itinerary builder. The entire interface is designed with a dark theme and neon color palette (cyan, pink, purple) to create a futuristic atmosphere.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using **React 18** with **TypeScript** and bundled with **Vite** for fast development and optimized production builds. The UI framework leverages **Tailwind CSS** for styling with custom CSS variables for the neon color scheme, complemented by **shadcn/ui** components for consistent design patterns.

**State Management**: The application uses **TanStack Query** (React Query) for server state management, providing caching, synchronization, and background updates. Local state is managed through React hooks, with custom hooks for specific features like itinerary management and audio control.

**Routing**: Navigation is handled by **Wouter**, a lightweight routing library that provides client-side navigation without the overhead of larger routing solutions.

**Animation System**: **Framer Motion** powers the application's micro-interactions, page transitions, and entrance animations, creating smooth and engaging user experiences throughout the interface.

### Backend Architecture
The server is built on **Express.js** with TypeScript, following a REST API pattern. The architecture implements a clean separation between route handlers and business logic through a storage abstraction layer.

**API Design**: RESTful endpoints provide data access for destinations, hotels, restaurants, attractions, weather, and itineraries. The API includes search functionality and supports CRUD operations for itinerary management.

**Storage Layer**: The application uses an abstraction pattern with an `IStorage` interface, currently implemented with an in-memory storage solution for development. This design allows for easy migration to persistent database solutions without changing the business logic.

### Data Storage Solutions
**Database Schema**: The application is configured for **PostgreSQL** using **Drizzle ORM** with **Neon Database** serverless hosting. The schema defines tables for destinations, hotels, restaurants, attractions, weather data, and itineraries with proper relationships and data types.

**Session Management**: Configured with **connect-pg-simple** for PostgreSQL-based session storage, enabling user session persistence and authentication capabilities.

**Type Safety**: The entire data layer is type-safe using **Drizzle-Zod** for schema validation and TypeScript interfaces shared between client and server.

### UI/UX Design System
**Component Library**: Built on **Radix UI** primitives for accessibility and consistent behavior, with custom styling applied through Tailwind CSS classes.

**Theming**: Implements a comprehensive dark theme with neon accent colors using CSS custom properties. The design system includes specialized classes for glowing effects, glass morphism, and animated elements.

**Responsive Design**: Mobile-first approach with responsive breakpoints and adaptive layouts using Tailwind's responsive utilities.

### Interactive Features
**Map Integration**: Prepared for **Mapbox GL JS** integration with custom dark themes and neon-colored markers for different location types (hotels, restaurants, attractions).

**Audio System**: Framework prepared for **Tone.js** integration to provide ambient synth-wave soundscapes with user controls for volume and playback.

**Background Effects**: Placeholder implementation for **Vanta.js** animated backgrounds, currently using CSS-based particle effects for development.

## External Dependencies

### Core Framework Dependencies
- **React 18** with TypeScript for component-based UI development
- **Vite** for fast development server and optimized production builds
- **Express.js** for server-side API and routing
- **Tailwind CSS** for utility-first styling and design system

### Database and ORM
- **Drizzle ORM** for type-safe database operations and schema management
- **PostgreSQL** via **Neon Database** for serverless database hosting
- **Drizzle-Zod** for runtime schema validation and type inference

### UI Component Libraries
- **Radix UI** suite for accessible, unstyled component primitives
- **shadcn/ui** for pre-styled component implementations
- **Lucide React** for consistent iconography throughout the application

### State Management and Data Fetching
- **TanStack Query** for server state management, caching, and synchronization
- **React Hook Form** with **Hookform Resolvers** for form state management and validation

### Animation and Interactivity
- **Framer Motion** for smooth animations, transitions, and micro-interactions
- **Embla Carousel** for touch-friendly carousel components

### Development and Build Tools
- **TypeScript** for static type checking across the entire application
- **ESBuild** for fast server-side bundling in production
- **PostCSS** with **Autoprefixer** for CSS processing and vendor prefixes

### Planned Integrations
- **Mapbox GL JS** for interactive maps with custom dark themes
- **Tone.js** for synthetic audio generation and ambient soundscapes
- **Vanta.js** for advanced 3D animated backgrounds and visual effects

The architecture is designed to be modular and extensible, allowing for easy integration of additional features and services as the application evolves.