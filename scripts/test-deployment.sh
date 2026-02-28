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

# Test 3: Logo loads
echo "✓ Checking logo..."
logo_status=$(curl -s -L -o /dev/null -w "%{http_code}" "$SITE_URL/images/site-logo.svg")
if [ "$logo_status" != "200" ]; then
    echo "  ✗ Logo not accessible (status $logo_status)"
    exit 1
fi
echo "  ✓ Logo accessible"

# Test 4: Key pages exist
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

# Test 5: Check meta tags
echo "✓ Checking meta tags..."
if ! echo "$content" | grep -q "Kansas City-based volunteer organization"; then
    echo "  ✗ Missing description meta tag"
    exit 1
fi
echo "  ✓ Meta tags present"

echo ""
echo "✅ Deployment verified successfully!"
