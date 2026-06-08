#!/bin/bash

# Portfolio Deployment Script
echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Type check
echo "🔍 Running TypeScript type check..."
npm run type-check

# Lint
echo "🧹 Running linter..."
npm run lint

# Build
echo "🏗️ Building project..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Commit your changes: git add . && git commit -m 'Deploy to Vercel'"
echo "2. Push to GitHub: git push origin main"
echo "3. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your repository"
echo "   - Click Deploy"
echo ""
echo "🎉 Your portfolio will be live in minutes!" 