📰 NewsHub
NewsHub is a modern, responsive news aggregator application built with Next.js 14 and Supabase. It provides users with personalized news feeds, reading list functionality.

🔐 Authentication & User Management
Secure Authentication: Email/password login and signup using Supabase Auth
Session Management: Persistent user sessions with automatic token refresh
Protected Routes: Middleware protection for authenticated pages
User Profiles: Display user information with profile avatars

📰 News Features
Multi-Category News: Browse news across various categories (Trending, Technology, Business, Science, Health, Sports)
Article Reading: Clean, focused reading experience with full article content
Responsive Design: Optimized for desktop, tablet, and mobile devices

💾 Personal Reading List
Save Articles: Add articles to personal reading list for later
Manage Content: Remove articles from reading list
Reading Statistics: Track number of saved articles

🛠 Technical Features
Server-Side Rendering: Fast initial page loads with SSR
Client-Side Interactivity: Smooth user interactions with client components
Row-Level Security: Secure data access with PostgreSQL RLS policies

🏗 Architecture & Tech Stack
Frontend
Next.js 14: React framework with App Router
React 18: UI library with hooks and modern patterns
Tailwind CSS: Utility-first CSS framework
Lucide React: Beautiful SVG icons

Backend & Database
Supabase: Backend-as-a-Service with PostgreSQL
PostgreSQL: Relational database with Row-Level Security
Supabase Auth: Authentication and user management

Development & Deployment
JavaScript/JSX: Primary programming language
Next.js Middleware: Route protection and authentication
Environment Variables: Secure configuration management

Installation & Setup
Prerequisites
Node.js 18+
npm or yarn
Supabase account
1. Clone the Repository
2. Install Dependencies
npm install
# or
yarn install
3. Environment Configuration
Create a .env.local file in the root directory:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key,
NEWS_API_KEY=your_news_api_key

4. Database Setup
Run these SQL commands in your Supabase SQL editor:
-- Create saved_articles table
CREATE TABLE saved_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  author TEXT,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  url TEXT,
  url_to_image TEXT,
  source TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Enable Row Level Security
ALTER TABLE saved_articles ENABLE ROW LEVEL SECURITY;
-- Create RLS policies
CREATE POLICY "Users can view own articles" ON saved_articles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own articles" ON saved_articles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own articles" ON saved_articles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own articles" ON saved_articles
  FOR DELETE USING (auth.uid() = user_id);

5. Run Development Server
npm run dev

