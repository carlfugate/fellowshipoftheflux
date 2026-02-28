# Fellowship of the Flux - Technical Issues & Solutions

## Date: 2026-02-28

### Issues Identified

1. **Hugo Version Mismatch**
   - Workflows used Hugo 0.153.3 and 0.128.0
   - Local had Hugo 0.157.0
   - **Solution**: Updated all workflows to 0.157.0

2. **Deprecated Cache Configs**
   - `getcsv` and `getjson` cache types removed in Hugo 0.157.0
   - **Solution**: Removed from all config files (config.yaml, config.dev.yaml, config.production.yaml)

3. **Theme Duplicate Markup Key**
   - Tailbliss theme had duplicate `markup:` keys at lines 16 and 199
   - **Solution**: Fixed in theme submodule commit f27ce79b

4. **PostCSS Resource Processing Issue**
   - `resources.PostProcess` causes cache errors in Hugo 0.157.0
   - Custom CSS processing fails with "resource not found in file cache"
   - **Root Cause**: Hugo 0.157.0 has stricter resource caching/processing
   - **Solution**: Simplified CSS processing, removed PostProcess

5. **Template Variable Shadowing**
   - head.html used `:=` for reassignment causing scope issues
   - **Solution**: Changed to `=` for reassignment

### Current Status

- Site builds successfully without custom CSS
- Need to fix custom CSS processing for full functionality

### Recommended Approach

1. Simplify custom CSS - don't use PostCSS pipeline
2. Or: Use static CSS file in /static/css/ instead of Hugo pipes
3. Update GitHub Actions to use Hugo 0.157.0 (done)
4. Keep theme as submodule with our fix

### Files Modified

- `.github/workflows/deploy.yml` - Hugo version update
- `.github/workflows/hugo.yml` - Hugo version update  
- `config.yaml` - Removed deprecated caches, fixed markup duplication
- `config.dev.yaml` - Removed deprecated caches
- `config.production.yaml` - Removed deprecated caches
- `layouts/partials/head.html` - Fixed variable shadowing, disabled custom CSS temporarily
- `themes/tailbliss` - Submodule updated to f27ce79b (duplicate markup fix)
