#!/bin/bash

# Performance testing script for Hugo Tailbliss site
# This script tests the complete deployment pipeline and validates optimizations

set -e

echo "🚀 Starting performance testing for Hugo Tailbliss site..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v hugo &> /dev/null; then
        print_error "Hugo is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    print_success "All dependencies are available"
}

# Clean previous builds
clean_build() {
    print_status "Cleaning previous builds..."
    npm run clean
    print_success "Build directory cleaned"
}

# Install dependencies
install_deps() {
    print_status "Installing Node.js dependencies..."
    npm ci
    print_success "Dependencies installed"
}

# Test development build
test_dev_build() {
    print_status "Testing development build..."
    
    # Test with development config
    hugo server --buildDrafts --buildFuture --config config.yaml,config.dev.yaml --port 1315 &
    SERVER_PID=$!
    
    # Wait for server to start
    sleep 3
    
    # Test if server is responding
    if curl -f http://localhost:1315 > /dev/null 2>&1; then
        print_success "Development server is running correctly"
    else
        print_error "Development server failed to start"
        kill $SERVER_PID 2>/dev/null || true
        exit 1
    fi
    
    # Stop the server
    kill $SERVER_PID 2>/dev/null || true
    sleep 2
}

# Test production build
test_production_build() {
    print_status "Testing production build..."
    
    # Set production environment
    export NODE_ENV=production
    export HUGO_ENVIRONMENT=production
    
    # Build with production config
    hugo --minify --gc --cleanDestinationDir --environment production --config config.yaml,config.production.yaml
    
    if [ -d "public" ]; then
        print_success "Production build completed successfully"
    else
        print_error "Production build failed"
        exit 1
    fi
}

# Validate build output
validate_build() {
    print_status "Validating build output..."
    
    # Check if essential files exist
    essential_files=("public/index.html" "public/sitemap.xml" "public/robots.txt")
    
    for file in "${essential_files[@]}"; do
        if [ -f "$file" ]; then
            print_success "✓ $file exists"
        else
            print_error "✗ $file is missing"
            exit 1
        fi
    done
    
    # Check if CSS is minified (should not contain unnecessary whitespace)
    if find public -name "*.css" -exec grep -l "  " {} \; | head -1 > /dev/null; then
        print_warning "CSS files may not be fully minified"
    else
        print_success "CSS files appear to be minified"
    fi
    
    # Check if HTML is minified (basic check)
    if find public -name "*.html" -exec grep -l "    " {} \; | head -1 > /dev/null; then
        print_warning "HTML files may not be fully minified"
    else
        print_success "HTML files appear to be minified"
    fi
}

# Test asset optimization
test_asset_optimization() {
    print_status "Testing asset optimization..."
    
    # Check for fingerprinted assets (cache busting)
    if find public -name "*.[a-f0-9]*.css" -o -name "*.[a-f0-9]*.js" | head -1 > /dev/null; then
        print_success "Fingerprinted assets found (cache busting enabled)"
    else
        print_warning "No fingerprinted assets found"
    fi
    
    # Check image optimization
    if find public -name "*.webp" | head -1 > /dev/null; then
        print_success "WebP images found (image optimization working)"
    else
        print_warning "No WebP images found"
    fi
}

# Test local serving
test_local_serving() {
    print_status "Testing local serving of production build..."
    
    # Start local server
    npm run serve:production &
    SERVER_PID=$!
    
    # Wait for server to start
    sleep 5
    
    # Test if server is responding
    if curl -f http://localhost:8080 > /dev/null 2>&1; then
        print_success "Production build serves correctly"
    else
        print_error "Production build serving failed"
        kill $SERVER_PID 2>/dev/null || true
        exit 1
    fi
    
    # Test gzip compression (if available)
    if curl -H "Accept-Encoding: gzip" -s http://localhost:8080 | head -1 | grep -q "gzip"; then
        print_success "Gzip compression is working"
    else
        print_warning "Gzip compression may not be enabled"
    fi
    
    # Stop the server
    kill $SERVER_PID 2>/dev/null || true
    sleep 2
}

# Performance metrics
show_performance_metrics() {
    print_status "Gathering performance metrics..."
    
    # Build size analysis
    if [ -d "public" ]; then
        total_size=$(du -sh public | cut -f1)
        html_size=$(find public -name "*.html" -exec du -ch {} + | tail -1 | cut -f1)
        css_size=$(find public -name "*.css" -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1 || echo "0")
        js_size=$(find public -name "*.js" -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1 || echo "0")
        img_size=$(find public -name "*.jpg" -o -name "*.png" -o -name "*.webp" -o -name "*.svg" -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1 || echo "0")
        
        echo ""
        echo "📊 Build Size Analysis:"
        echo "  Total build size: $total_size"
        echo "  HTML files: $html_size"
        echo "  CSS files: $css_size"
        echo "  JS files: $js_size"
        echo "  Images: $img_size"
        echo ""
    fi
    
    # File count
    html_count=$(find public -name "*.html" | wc -l)
    css_count=$(find public -name "*.css" | wc -l)
    js_count=$(find public -name "*.js" | wc -l)
    
    echo "📁 File Count:"
    echo "  HTML files: $html_count"
    echo "  CSS files: $css_count"
    echo "  JS files: $js_count"
    echo ""
}

# Main execution
main() {
    echo "🧪 Hugo Tailbliss Performance Test Suite"
    echo "========================================"
    echo ""
    
    check_dependencies
    clean_build
    install_deps
    test_dev_build
    test_production_build
    validate_build
    test_asset_optimization
    test_local_serving
    show_performance_metrics
    
    echo ""
    print_success "🎉 All performance tests passed!"
    echo ""
    echo "Next steps:"
    echo "1. Commit your changes to trigger GitHub Actions deployment"
    echo "2. Monitor the deployment at: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/')/actions"
    echo "3. Verify the live site at: https://fellowshipoftheflux.com"
    echo ""
}

# Run main function
main "$@"