#!/bin/bash
# Emergency Deployment Script for TeAoMarama Educational Platform
# Multiple hosting options for immediate deployment

set -e

echo "🚀 TeAoMarama Emergency Deployment Script"
echo "=========================================="

# Build the project
echo "📦 Building project..."
npm run build

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build successful!"
echo ""

echo "Available hosting options:"
echo "1. Surge.sh (fastest setup)"
echo "2. Firebase Hosting (Google infrastructure)"
echo "3. GitHub Pages (via push - already configured)"
echo "4. Manual upload to any static hosting"

read -p "Choose option (1-4): " option

case $option in
    1)
        echo "🌊 Deploying to Surge.sh..."
        if command -v surge &> /dev/null; then
            cd dist
            surge --domain teaomarama-edu.surge.sh
        else
            echo "Installing Surge..."
            npm install -g surge
            cd dist
            surge --domain teaomarama-edu.surge.sh
        fi
        echo "✅ Deployed to: https://teaomarama-edu.surge.sh"
        ;;
    2)
        echo "🔥 Deploying to Firebase..."
        if command -v firebase &> /dev/null; then
            firebase deploy
        else
            echo "Installing Firebase CLI..."
            npm install -g firebase-tools
            echo "Please run 'firebase login' and 'firebase init' first"
        fi
        ;;
    3)
        echo "📄 GitHub Pages deployment..."
        echo "Workflow already pushed. Visit your GitHub repo's Actions tab"
        echo "Or enable GitHub Pages in repository settings"
        ;;
    4)
        echo "📁 Manual deployment ready"
        echo "Upload contents of 'dist' directory to your hosting provider"
        echo "Make sure to configure SPA redirects to index.html"
        ;;
    *)
        echo "Invalid option"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo ""
echo "Current working deployments:"
echo "- Netlify: https://teaomarama.netlify.app (build minutes limited)"
echo "- GitHub Pages: Will be available after Actions complete"
echo ""
echo "Site features:"
echo "- 5,439+ educational resources"
echo "- NZ Curriculum aligned"
echo "- Cultural integration"
echo "- Responsive design"