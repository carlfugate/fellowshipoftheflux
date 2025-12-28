#!/bin/bash

# Deployment validation script
# This script validates that the deployment configuration is working correctly

set -e

echo "🔍 Validating deployment configuration..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Validate configuration files
validate_configs() {
    print_status "Validating configuration files..."
    
    # Check main config
    if [ -f "config.yaml" ]; then
        print_success "✓ config.yaml exists"
    else
        print_error "✗ config.yaml missing"
        exit 1
    fi
    
    # Check production config
    if [ -f "config.production.yaml" ]; then
        print_success "✓ config.production.yaml exists"
    else
        print_error "✗ config.production.yaml missing"
        exit 1
    fi
    
    # Check development config
    if [ -f "config.dev.yaml" ]; then
        print_success "✓ config.dev.yaml exists"
    else
        print_error "✗ config.dev.yaml missing"
        exit 1
    fi
    
    # Check PostCSS config
    if [ -f "postcss.config.js" ]; then
        print_success "✓ postcss.config.js exists"
    else
        print_error "✗ postcss.config.js missing"
        exit 1
    fi
    
    # Check Tailwind config
    if [ -f "tailwind.config.js" ]; then
        print_success "✓ tailwind.config.js exists"
    else
        print_error "✗ tailwind.config.js missing"
        exit 1
    fi
}

# Validate GitHub Actions workflow
validate_workflow() {
    print_status "Validating GitHub Actions workflow..."
    
    if [ -f ".github/workflows/deploy.yml" ]; then
        print_success "✓ GitHub Actions workflow exists"
        
        # Check for key workflow elements
        if grep -q "NODE_ENV.*production" .github/workflows/deploy.yml; then
            print_success "✓ Production environment configured"
        else
            print_warning "⚠ Production environment may not be configured"
        fi
        
        if grep -q "config.production.yaml" .github/workflows/deploy.yml; then
            print_success "✓ Production config referenced in workflow"
        else
            print_warning "⚠ Production config not referenced in workflow"
        fi
        
        if grep -q "cache:" .github/workflows/deploy.yml; then
            print_success "✓ Caching configured in workflow"
        else
            print_warning "⚠ No caching configured in workflow"
        fi
    else
        print_error "✗ GitHub Actions workflow missing"
        exit 1
    fi
}

# Validate domain configuration
validate_domain() {
    print_status "Validating domain configuration..."
    
    # Check CNAME file
    if [ -f "static/CNAME" ]; then
        domain=$(cat static/CNAME)
        print_success "✓ CNAME file exists with domain: $domain"
        
        # Check if baseURL matches CNAME
        if grep -q "$domain" config.yaml; then
            print_success "✓ baseURL matches CNAME domain"
        else
            print_warning "⚠ baseURL may not match CNAME domain"
        fi
    else
        print_warning "⚠ No CNAME file found (using GitHub Pages default domain)"
    fi
    
    # Check robots.txt
    if [ -f "static/robots.txt" ]; then
        print_success "✓ robots.txt exists"
    else
        print_warning "⚠ robots.txt missing"
    fi
}

# Validate build optimization
validate_optimization() {
    print_status "Validating build optimization..."
    
    # Test production build
    print_status "Testing production build..."
    NODE_ENV=production hugo --minify --gc --cleanDestinationDir --environment production --config config.yaml,config.production.yaml > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        print_success "✓ Production build successful"
    else
        print_error "✗ Production build failed"
        exit 1
    fi
    
    # Check build output
    if [ -d "public" ]; then
        print_success "✓ Build output directory exists"
        
        # Check essential files
        essential_files=("index.html" "sitemap.xml" "robots.txt")
        for file in "${essential_files[@]}"; do
            if [ -f "public/$file" ]; then
                print_success "✓ $file generated"
            else
                print_error "✗ $file missing from build"
                exit 1
            fi
        done
        
        # Check minification
        if [ -f "public/index.html" ]; then
            # Simple check for minification (no excessive whitespace)
            if grep -q "    " public/index.html; then
                print_warning "⚠ HTML may not be fully minified"
            else
                print_success "✓ HTML appears to be minified"
            fi
        fi
        
        # Check CSS files
        css_count=$(find public -name "*.css" | wc -l)
        if [ "$css_count" -gt 0 ]; then
            print_success "✓ CSS files generated ($css_count files)"
        else
            print_warning "⚠ No CSS files found"
        fi
        
        # Check asset optimization
        if [ -f "public/.htaccess" ]; then
            print_success "✓ .htaccess file for optimization exists"
        else
            print_warning "⚠ .htaccess file missing"
        fi
        
    else
        print_error "✗ Build output directory missing"
        exit 1
    fi
}

# Validate performance features
validate_performance() {
    print_status "Validating performance features..."
    
    # Check if gzip/compression headers are configured
    if grep -q "gzip\|deflate" static/.htaccess 2>/dev/null; then
        print_success "✓ Compression configured in .htaccess"
    else
        print_warning "⚠ Compression not configured (GitHub Pages handles this)"
    fi
    
    # Check caching headers
    if grep -q "Cache-Control\|Expires" static/.htaccess 2>/dev/null; then
        print_success "✓ Caching headers configured in .htaccess"
    else
        print_warning "⚠ Caching headers not configured (GitHub Pages handles this)"
    fi
    
    # Check image optimization
    webp_count=$(find public -name "*.webp" 2>/dev/null | wc -l)
    if [ "$webp_count" -gt 0 ]; then
        print_success "✓ WebP images found ($webp_count files)"
    else
        print_warning "⚠ No WebP images found"
    fi
}

# Show build metrics
show_metrics() {
    print_status "Build metrics:"
    
    if [ -d "public" ]; then
        total_size=$(du -sh public 2>/dev/null | cut -f1)
        html_count=$(find public -name "*.html" 2>/dev/null | wc -l)
        css_count=$(find public -name "*.css" 2>/dev/null | wc -l)
        js_count=$(find public -name "*.js" 2>/dev/null | wc -l)
        img_count=$(find public -name "*.jpg" -o -name "*.png" -o -name "*.webp" -o -name "*.svg" 2>/dev/null | wc -l)
        
        echo ""
        echo "📊 Build Statistics:"
        echo "  Total size: $total_size"
        echo "  HTML files: $html_count"
        echo "  CSS files: $css_count"
        echo "  JS files: $js_count"
        echo "  Images: $img_count"
        echo ""
    fi
}

# Main execution
main() {
    echo "🚀 Deployment Configuration Validation"
    echo "====================================="
    echo ""
    
    validate_configs
    validate_workflow
    validate_domain
    validate_optimization
    validate_performance
    show_metrics
    
    echo ""
    print_success "🎉 Deployment configuration validation completed!"
    echo ""
    echo "Next steps:"
    echo "1. Commit and push changes to trigger deployment"
    echo "2. Monitor GitHub Actions: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/' 2>/dev/null || echo 'your-repo')/actions"
    echo "3. Verify live site functionality"
    echo ""
}

# Run main function
main "$@"