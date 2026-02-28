#!/bin/bash
# Test script for Fellowship of the Flux website

set -e

echo "🧪 Running Fellowship of the Flux Tests"
echo "========================================"

# Test 1: Hugo build
echo "✓ Testing Hugo build..."
hugo --config config.yaml,config.production.yaml --quiet
echo "  ✓ Build successful"

# Test 2: Check critical files exist
echo "✓ Checking critical files..."
files=(
    "public/index.html"
    "public/about/index.html"
    "public/learn/index.html"
    "public/services/index.html"
    "public/images/site-logo.svg"
)
for file in "${files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "  ✗ Missing: $file"
        exit 1
    fi
done
echo "  ✓ All critical files present"

# Test 3: Check homepage content
echo "✓ Checking homepage content..."
if ! grep -q "Advancing the Art of Learning to Solder" public/index.html; then
    echo "  ✗ Homepage missing main heading"
    exit 1
fi
if grep -q "Test page" public/index.html; then
    echo "  ✗ Homepage still has test content"
    exit 1
fi
echo "  ✓ Homepage content correct"

# Test 4: Check logo exists and is reasonable size
echo "✓ Checking logo..."
if [ ! -f "static/images/site-logo.svg" ]; then
    echo "  ✗ Logo missing from static"
    exit 1
fi
logo_size=$(wc -c < static/images/site-logo.svg)
if [ "$logo_size" -gt 1000000 ]; then
    echo "  ✗ Logo too large (${logo_size} bytes)"
    exit 1
fi
echo "  ✓ Logo present and reasonable size"

# Test 5: Check no build artifacts in git
echo "✓ Checking git cleanliness..."
if git ls-files | grep -q "^public/\|^resources/"; then
    echo "  ✗ Build artifacts tracked in git"
    exit 1
fi
echo "  ✓ No build artifacts in git"

echo ""
echo "✅ All tests passed!"
