# Hugo Tailbliss Site

A modern, responsive website built with Hugo static site generator and the Tailbliss theme, featuring Tailwind CSS styling and automated GitHub Pages deployment.

## Features

- **Hugo Static Site Generator**: Fast, secure, and flexible static site generation
- **Tailbliss Theme**: Modern, responsive theme with Tailwind CSS
- **Automated Deployment**: GitHub Actions workflow for seamless deployment to GitHub Pages
- **Custom Styling**: Extended Tailwind CSS configuration with custom components
- **Dark Mode Support**: Built-in dark/light mode toggle
- **Responsive Design**: Mobile-first responsive layout

## Quick Start

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.121.0 or later)
- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)

### Local Development

1. **Clone the repository**
   ```bash
   git clone --recursive https://github.com/username/fellowshipoftheflux.git
   cd fellowshipoftheflux
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:1313`

### Available Scripts

#### Development Scripts
- `npm run dev` - Start development server with drafts and future posts (port 1313)
- `npm run dev:fast` - Start development server without drafts (faster startup)
- `npm run dev:network` - Start development server accessible from network (0.0.0.0)

#### Build Scripts
- `npm run build` - Build production site with minification and garbage collection
- `npm run build:preview` - Build with drafts and future posts for preview
- `npm run build:production` - Build for production with NODE_ENV=production
- `npm run serve` - Build and serve the site locally on port 8080

#### Asset Scripts
- `npm run build:css` - Compile Tailwind CSS
- `npm run watch:css` - Watch and compile CSS changes

#### Maintenance Scripts
- `npm run clean` - Clean build artifacts (public, resources, .hugo_build.lock)
- `npm run clean:all` - Clean everything including node_modules
- `npm run setup` - Initialize Git submodules and install dependencies
- `npm run update:theme` - Update Tailbliss theme to latest version
- `npm run update:deps` - Update npm dependencies

#### Validation Scripts
- `npm run validate` - Run Hugo validation checks
- `npm run validate:html` - Validate HTML markup using W3C validator
- `npm run check:links` - Check for broken internal and external links
- `npm run test:lighthouse` - Run Lighthouse performance and accessibility tests
- `npm run test` - Run validation and build tests
- `npm run test:all` - Run comprehensive testing suite (HTML, links, performance)
- `npm run precommit` - Pre-commit validation (validate + preview build)

### Make Commands (Alternative)

For developers who prefer make commands, a Makefile is provided:

```bash
make help          # Show available commands
make setup         # Initialize project
make dev           # Start development server
make build         # Build production site
make clean         # Clean build artifacts
make test          # Run validation and tests
make update-theme  # Update Tailbliss theme
```

### Development Helper Script

A bash script is provided for additional development utilities:

```bash
./scripts/dev-helper.sh init    # Initialize project (first-time setup)
./scripts/dev-helper.sh health  # Run comprehensive health check
./scripts/dev-helper.sh clean   # Clean all artifacts and dependencies
./scripts/dev-helper.sh help    # Show available commands
```

### VS Code Integration

The project includes VS Code configuration for an optimized development experience:

- **Recommended Extensions**: Automatically suggests useful extensions for Hugo development
- **Tasks**: Pre-configured tasks accessible via `Cmd+Shift+P` > "Tasks: Run Task"
  - Hugo: Start Development Server
  - Hugo: Build Site
  - Hugo: Validate Site
  - Project: Setup
  - Project: Health Check
- **Settings**: Optimized editor settings for Hugo, Markdown, and Tailwind CSS
- **File Associations**: Proper syntax highlighting for Hugo templates

**Quick Start in VS Code:**
1. Open Command Palette (`Cmd+Shift+P`)
2. Run "Tasks: Run Task" > "Project: Setup" (first time only)
3. Run "Tasks: Run Task" > "Hugo: Start Development Server"

## Development Workflow

### Initial Setup

1. **Clone with submodules**
   ```bash
   git clone --recursive https://github.com/username/repository-name.git
   cd repository-name
   ```

2. **Setup dependencies**
   ```bash
   npm run setup
   ```

### Daily Development

1. **Start development server**
   ```bash
   npm run dev
   ```
   - Includes drafts and future-dated posts
   - Live reload enabled
   - Available at `http://localhost:1313`

2. **Create new content**
   ```bash
   hugo new posts/my-new-post.md
   hugo new pages/my-new-page.md
   ```

3. **Preview production build**
   ```bash
   npm run build:preview
   npm run serve
   ```

### Git Workflow with Submodules

#### Working with Theme Updates

1. **Update theme to latest version**
   ```bash
   npm run update:theme
   git add themes/tailbliss
   git commit -m "Update Tailbliss theme"
   ```

2. **Check submodule status**
   ```bash
   git submodule status
   ```

3. **Reset submodule to committed version**
   ```bash
   git submodule update --init --recursive
   ```

#### Cloning and Setup for New Contributors

```bash
# Clone with submodules
git clone --recursive https://github.com/username/repository-name.git

# If already cloned without --recursive
git submodule update --init --recursive

# Setup development environment
npm run setup
```

### Content Creation Workflow

1. **Use archetypes for consistent structure**
   ```bash
   hugo new posts/my-post.md  # Uses archetypes/posts.md
   hugo new pages/my-page.md  # Uses archetypes/default.md
   ```

2. **Front matter best practices**
   - Always include `title`, `date`, and `description`
   - Use `draft: true` for work-in-progress content
   - Add relevant `tags` and `categories`
   - Include `featured_image` for better social sharing

3. **Preview drafts during development**
   ```bash
   npm run dev  # Includes drafts automatically
   ```

### Testing and Validation

The project includes comprehensive automated testing and validation:

#### Local Testing

1. **HTML Validation**
   ```bash
   npm run validate:html  # Validate HTML markup
   ```

2. **Link Checking**
   ```bash
   npm run check:links    # Check for broken links
   ```

3. **Performance Testing**
   ```bash
   npm run test:lighthouse  # Run Lighthouse audits
   ```

4. **Comprehensive Testing**
   ```bash
   npm run test:all       # Run all tests
   ```

#### Automated CI/CD Testing

The GitHub Actions workflow automatically runs:

- **HTML Validation**: W3C markup validation on all generated HTML
- **Broken Link Detection**: Checks for internal and external broken links
- **Lighthouse Performance Audits**: Tests performance, accessibility, SEO, and best practices
- **Build Validation**: Ensures the site builds successfully

**Pull Request Validation**: All tests run on pull requests to catch issues before merging.

**Production Deployment**: Full validation runs before deploying to GitHub Pages.

#### Test Configuration

- **HTML Validator**: Uses `vnu-jar` for W3C HTML5 validation
- **Link Checker**: Uses `broken-link-checker` for comprehensive link validation
- **Lighthouse**: Configured with performance thresholds in `lighthouserc.json`
  - Performance: minimum score 80%
  - Accessibility: minimum score 90%
  - SEO: minimum score 90%
  - Best Practices: minimum score 80%

1. **Validate before committing**
   ```bash
   npm run precommit
   ```

2. **Check for common issues**
   ```bash
   npm run validate  # Hugo validation
   hugo --printPathWarnings --printUnusedTemplates
   ```

3. **Test production build locally**
   ```bash
   npm run build:production
   npm run serve
   ```

## Troubleshooting

### Common Issues

#### Submodule Issues

**Problem**: Theme not loading or missing files
```bash
# Solution: Reinitialize submodules
git submodule update --init --recursive
```

**Problem**: Theme is outdated
```bash
# Solution: Update theme submodule
npm run update:theme
git add themes/tailbliss
git commit -m "Update Tailbliss theme"
```

#### Build Issues

**Problem**: Hugo build fails with template errors
```bash
# Solution: Check Hugo version and validate templates
hugo version
npm run validate
```

**Problem**: CSS not compiling
```bash
# Solution: Rebuild CSS assets
npm run build:css
# Or clean and rebuild everything
npm run clean && npm run build
```

**Problem**: Port 1313 already in use
```bash
# Solution: Use different port or kill existing process
hugo server --port 1314
# Or find and kill the process
lsof -ti:1313 | xargs kill -9
```

#### Development Server Issues

**Problem**: Changes not reflecting in browser
```bash
# Solution: Hard refresh or disable fast render
# Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)
# Or restart with disabled fast render
npm run dev  # Already includes --disableFastRender
```

**Problem**: Live reload not working
```bash
# Solution: Check browser console and restart server
npm run dev
# Ensure you're accessing http://localhost:1313 (not 127.0.0.1)
```

#### Git and Deployment Issues

**Problem**: GitHub Actions deployment fails
```bash
# Solution: Check workflow logs and validate locally
npm run test  # Test build locally
# Check .github/workflows/deploy.yml for issues
```

**Problem**: Submodule conflicts during merge
```bash
# Solution: Update submodules after merge
git submodule update --init --recursive
```

### Performance Tips

1. **Faster development builds**
   ```bash
   npm run dev:fast  # Excludes drafts for faster startup
   ```

2. **Optimize images before adding**
   - Use WebP format when possible
   - Compress images before committing
   - Consider using Hugo's image processing features

3. **Clean builds when needed**
   ```bash
   npm run clean && npm run build  # Clean build
   ```

### Getting Help

- **Hugo Documentation**: [gohugo.io/documentation](https://gohugo.io/documentation/)
- **Tailbliss Theme**: [github.com/nusserstudios/tailbliss](https://github.com/nusserstudios/tailbliss)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)

## GitHub Pages Deployment

This site is configured for automatic deployment to GitHub Pages using GitHub Actions with support for custom domains.

### Setup Instructions

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

2. **Configure Custom Domain**
   - The site is configured for `fellowshipoftheflux.com`
   - `baseURL` in `config.yaml` is set to:
     ```yaml
     baseURL: 'https://fellowshipoftheflux.com'
     ```
   - The `static/CNAME` file contains:
     ```
     fellowshipoftheflux.com
     ```
   - In GitHub repository settings > Pages, add `fellowshipoftheflux.com` as your custom domain
   - Ensure "Enforce HTTPS" is enabled

3. **DNS Configuration**
   Configure your domain's DNS settings:
   
   **For apex domain (yourdomain.com):**
   ```
   A    185.199.108.153
   A    185.199.109.153
   A    185.199.110.153
   A    185.199.111.153
   ```
   
   **For subdomain (www.yourdomain.com):**
   ```
   CNAME    username.github.io
   ```

4. **Automatic Deployment**
   - Push changes to the `main` branch
   - GitHub Actions will automatically build and deploy your site
   - View deployment status in the "Actions" tab

5. **Verify Custom Domain Setup**
   - After deployment, check that your domain resolves correctly
   - Verify HTTPS certificate is properly configured
   - Test that the CNAME file is present in the deployed site

### Deployment Workflow

The deployment process includes:

- **Build Environment**: Ubuntu latest with Hugo Extended v0.121.0
- **Node.js Setup**: Version 18 with npm cache
- **Theme Handling**: Automatic Git submodule initialization
- **Asset Processing**: Tailwind CSS compilation and minification
- **Optimization**: Hugo's built-in minification and garbage collection
- **Security**: Proper permissions and concurrency controls

## Project Structure

```
├── .github/workflows/     # GitHub Actions workflows
├── .vscode/              # VS Code configuration
│   ├── extensions.json   # Recommended extensions
│   ├── settings.json     # Editor settings
│   └── tasks.json        # VS Code tasks
├── archetypes/           # Content templates
├── assets/              # Source assets (CSS, JS)
├── content/             # Markdown content files
├── layouts/             # Custom layout overrides
├── scripts/             # Development helper scripts
│   └── dev-helper.sh    # Project setup and maintenance
├── static/              # Static assets
│   └── CNAME            # Custom domain configuration
├── themes/tailbliss/    # Tailbliss theme (Git submodule)
├── .editorconfig        # Editor configuration
├── .gitattributes       # Git attributes for proper file handling
├── .gitmodules          # Git submodule configuration
├── config.yaml          # Hugo configuration
├── config.dev.yaml      # Development-specific configuration
├── Makefile             # Make commands for development
├── package.json         # Node.js dependencies and scripts
└── tailwind.config.js   # Tailwind CSS configuration
```

## Customization

### Theme Customization

The site uses layout overrides to customize the Tailbliss theme without modifying the original theme files:

- **Layouts**: Custom templates in `layouts/` directory
- **Styling**: Extended CSS in `assets/css/custom.css`
- **Configuration**: Site parameters in `config.yaml`

### Content Management

- **Pages**: Create `.md` files in `content/` directory
- **Posts**: Add blog posts to `content/posts/` directory
- **Front Matter**: Use consistent metadata structure for SEO and organization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Check the [Hugo documentation](https://gohugo.io/documentation/)
- Review [Tailbliss theme documentation](https://github.com/nusserstudios/tailbliss)
- Open an issue in this repository