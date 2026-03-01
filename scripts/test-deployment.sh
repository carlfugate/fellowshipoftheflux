#!/bin/bash
# Deployment verification script

set -e

SITE_URL="${1:-https://www.fellowshipoftheflux.com}"

echo "🌐 Testing Deployment: $SITE_URL"
echo "========================================"

# Test 1: Site is accessible
echo "✓ Checking site accessibility..."
status=$(curl -s -L -o /dev/null -w "%{http_code}" "$SITE_URL")
if [ "$status" != "200" ]; then
    echo "  ✗ Site returned status $status"
    exit 1
fi
echo "  ✓ Site accessible (200 OK)"

# Test 2: Homepage has correct content
echo "✓ Checking homepage content..."
content=$(curl -s -L "$SITE_URL")
if ! echo "$content" | grep -q "From Beginner to Builder"; then
    echo "  ✗ Homepage missing main heading"
    exit 1
fi
if echo "$content" | grep -q "Test page"; then
    echo "  ✗ Homepage still has test content"
    exit 1
fi
echo "  ✓ Homepage content correct"

# Test 3: CSS files load
echo "✓ Checking CSS files..."
css_main_status=$(curl -s -L -o /dev/null -w "%{http_code}" "$SITE_URL/css/main.css")
css_custom_status=$(curl -s -L -o /dev/null -w "%{http_code}" "$SITE_URL/css/custom.css")
if [ "$css_main_status" != "200" ]; then
    echo "  ✗ main.css not accessible (status $css_main_status)"
    exit 1
fi
if [ "$css_custom_status" != "200" ]; then
    echo "  ✗ custom.css not accessible (status $css_custom_status)"
    exit 1
fi
echo "  ✓ CSS files accessible"

# Test 4: CSS is processed (no @import statements)
echo "✓ Checking CSS processing..."
custom_css=$(curl -s -L "$SITE_URL/css/custom.css")
if echo "$custom_css" | grep -q "@import.*tailwindcss"; then
    echo "  ✗ custom.css contains unprocessed @import statements"
    exit 1
fi
if ! echo "$custom_css" | grep -q "animate-fade-in"; then
    echo "  ✗ custom.css missing animation definitions"
    exit 1
fi
echo "  ✓ CSS properly processed"

# Test 5: Tailwind classes present in HTML
echo "✓ Checking Tailwind classes..."
if ! echo "$content" | grep -q "class=\".*text-.*\""; then
    echo "  ✗ No Tailwind classes found in HTML"
    exit 1
fi
echo "  ✓ Tailwind classes present"

# Test 6: Logo loads
echo "✓ Checking logo..."
logo_status=$(curl -s -L -o /dev/null -w "%{http_code}" "$SITE_URL/images/site-logo.svg")
if [ "$logo_status" != "200" ]; then
    echo "  ✗ Logo not accessible (status $logo_status)"
    exit 1
fi
echo "  ✓ Logo accessible"

# Test 7: Key pages exist
echo "✓ Checking key pages..."
pages=("about" "learn" "services" "community" "get-involved")
for page in "${pages[@]}"; do
    page_status=$(curl -s -L -o /dev/null -w "%{http_code}" "$SITE_URL/$page/")
    if [ "$page_status" != "200" ]; then
        echo "  ✗ Page /$page/ returned status $page_status"
        exit 1
    fi
done
echo "  ✓ All key pages accessible"

# Test 8: Check meta tags
echo "✓ Checking meta tags..."
if ! echo "$content" | grep -q "Kansas City-based volunteer organization"; then
    echo "  ✗ Missing description meta tag"
    exit 1
fi
echo "  ✓ Meta tags present"

echo ""
echo "✅ Deployment verified successfully!"
