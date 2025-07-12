# 📊 Dashboard App - Assignment

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Recharts** - Data visualization library
- **react-email** - Email template system

### Backend
- **Node.js** - Runtime environment
- **MongoDB** - NoSQL database
- **Nodemailer** - Email delivery service
- **Server Actions** - Form handling and API logic

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or Atlas)
- Email service credentials (Gmail recommended)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/divyanshucodes20/myjobbAi
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install --legacy-peer-deps
   \`\`\`

3. **Environment Setup**
   
   Create a \`.env` file in the root directory:
   
   \`\`\`env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/dashboard-app
   # For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/dashboard-app
   
   # Email Configuration (Gmail example)
   GMAIL_USER= YOUR_GMAIL_USER_HERE
   GMAIL_PASS= YOUR_GMAIL_PASSWORD_HERE   

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── auth/                 # Authentication endpoints
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # Dashboard pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── dashboard-layout.tsx      # Dashboard layout
│   ├── products-overview.tsx     # Products analytics
│   ├── product-search.tsx        # Search functionality
│   └── theme-provider.tsx        # Theme management
├── emails/                       # Email templates
│   ├── otp-email.tsx            # OTP verification email
│   └── confirmation-email.tsx   # Welcome email
├── lib/                         # Utility functions
│   ├── mongodb.ts               # Database connection
│   ├── email.ts                 # Email service
│   └── utils.ts                 # Helper functions
├── scripts/                     # Database scripts
│   └── setup-database.sql       # MongoDB setup
├── .env               # Environment variables
├── .env.sample                   # Sample environment variables
├── next.config.mjs              # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── package.json                 # Dependencies
\`\`\`

## 🔧 Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:setup     # Setup database indexes
npm run db:seed      # Seed sample data (if available)
\`\`\`

## 🎯 Features Walkthrough

### 1. Authentication Flow
1. **Enter Email** → System sends OTP
2. **Check Email** → Receive beautiful OTP email
3. **Enter OTP** → Verify and login
4. **Welcome Email** → Confirmation sent
5. **Dashboard Access** → Full application access

### 2. Dashboard Analytics
- **Overview Cards** - Key metrics at a glance
- **Category Chart** - Visual distribution of products
- **Price Analysis** - Price range breakdown
- **Product Table** - Detailed product listing

### 3. Search & Filter
- **Text Search** - Search across multiple fields
- **Category Filter** - Filter by product category
- **Pagination** - Navigate through large datasets
- **Responsive Design** - Works on all devices

## 🔒 Security Features

- **OTP Expiration** - 10-minute validity
- **Session Management** - Secure HTTP-only cookies

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Real-time feedback
- **Accessibility** - ARIA labels and keyboard navigation
- **Dark/Light Mode** - Theme switching support