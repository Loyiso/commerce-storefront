# React Storefront

## Project Overview and Purpose

React Storefront is a modern e-commerce application built with Next.js and React. It provides a complete storefront experience with product browsing, user authentication, shopping cart management, and product ratings. The application demonstrates best practices in React development, TypeScript usage, and modern web technologies.

## Technology Stack

- **Frontend Framework**: Next.js 16.1.6
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with PostCSS
- **Linting**: ESLint 9
- **Node.js Compatible**: Babel React Compiler for optimization

## Features

- **Product Browsing**: Browse and search through available products with detailed product pages
- **User Authentication**: Secure login and registration system for users
- **Shopping Cart**: Add products to cart, manage cart items, and view cart contents
- **Product Ratings**: View and interact with star ratings for products
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Type-Safe**: Full TypeScript implementation for type safety and better developer experience
- **API Routes**: Backend API routes for authentication, cart management, and product data

## Project Structure

```
src/
├── app/
│   ├── api/                    # API routes for backend functionality
│   │   ├── auth/
│   │   │   ├── login/         # User login endpoint
│   │   │   └── logout/        # User logout endpoint
│   │   └── cart/
│   │       └── add/           # Add item to cart endpoint
│   ├── cart/                   # Shopping cart page
│   ├── login/                  # Login page
│   ├── products/               # Products listing and detail pages
│   │   └── [id]/              # Individual product page
│   ├── register/               # User registration page
│   ├── layout.tsx              # Root layout component
│   ├── page.tsx                # Home page (redirects to products)
│   └── globals.css             # Global styles
├── components/
│   ├── AddToCartButton.tsx     # Reusable add to cart button
│   ├── CartProvider.tsx        # Cart context provider
│   ├── StarRating.tsx          # Star rating display component
│   └── TopNav.tsx              # Navigation bar component
├── services/
│   ├── authService.ts          # Authentication logic
│   ├── cartViewService.ts      # Cart view operations
│   ├── productService.ts       # Product data operations
│   └── userService.ts          # User management
├── types/
│   ├── auth.ts                 # Authentication types
│   ├── cart.ts                 # Cart-related types
│   ├── product.ts              # Product types
│   └── user.ts                 # User types
└── utils/
    └── safeJson.ts             # JSON utility functions
```

## Setup and Installation Instructions

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm installed
- Git for version control

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd online-store-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   Or with yarn:
   ```bash
   yarn install
   ```

3. **Configure environment variables** (if needed)
   - Create a `.env.local` file in the project root
   - Add any required API endpoints or configuration variables

## Running the Application

### Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Check code for linting issues:

```bash
npm run lint
```

## Key Components

- **CartProvider**: Manages global cart state using React Context
- **TopNav**: Main navigation component with links to key pages
- **StarRating**: Displays product ratings with visual star representation
- **AddToCartButton**: Reusable button component for adding items to cart

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/cart/add` - Add item to cart

## Additional Notes

- The home page automatically redirects to the products page
- All components are built with TypeScript for type safety
- The project uses Tailwind CSS for efficient and responsive styling
- Environment-specific configurations can be managed through `.env.local`
 # touch
