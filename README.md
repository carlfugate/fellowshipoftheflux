# Fellowship of the Flux

Fellowship of the Flux is a Kansas City-based volunteer organization dedicated to advancing the art of learning to solder through community outreach, education, and resource sharing.

## About

We provide portable soldering labs, educational workshops, and resources to help individuals and organizations build soldering skills and create their own educational programs. Our mission began with "Learn to Solder" workshops at community events like MakerFaire KC and BSides KC, and has grown to support STEM education across the Midwest.

## Website Features

- **Educational Platform**: Comprehensive soldering tutorials, guides, and projects
- **Service Information**: Details about our portable lab workshops for events
- **Resource Sharing**: Guides for building your own soldering education programs
- **Community Hub**: Volunteer opportunities and ways to get involved
- **Professional Presentation**: Suitable for partnerships and sponsorships

## Technical Stack

- **Hugo Static Site Generator**: Fast, secure, and flexible static site generation
- **Tailwind CSS**: Modern, responsive styling with custom Fellowship branding
- **GitHub Actions**: Automated deployment to GitHub Pages
- **Interactive Features**: Progress tracking, skill assessments, and community tools

## Quick Start

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.153.3 or later)
- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)

### Local Development

1. **Clone the repository**
   ```bash
   git clone --recursive https://github.com/carlfugate/fellowshipoftheflux.git
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
- `npm run build` - Build production site with minification and optimization
- `npm run build:preview` - Build with drafts and future posts for preview
- `npm run build:production` - Build for production with NODE_ENV=production
- `npm run serve` - Build and serve the site locally on port 8080

#### Validation Scripts
- `npm run validate` - Run Hugo validation checks
- `npm run validate:html` - Validate HTML markup using W3C validator
- `npm run check:links` - Check for broken internal and external links
- `npm run test:lighthouse` - Run Lighthouse performance and accessibility tests
- `npm run test` - Run validation and build tests
- `npm run test:all` - Run comprehensive testing suite

#### Maintenance Scripts
- `npm run clean` - Clean build artifacts (public, resources, .hugo_build.lock)
- `npm run clean:all` - Clean everything including node_modules
- `npm run setup` - Initialize Git submodules and install dependencies
- `npm run update:theme` - Update theme to latest version
- `npm run update:deps` - Update npm dependencies

## Development Workflow

### Initial Setup

1. **Clone with submodules**
   ```bash
   git clone --recursive https://github.com/carlfugate/fellowshipoftheflux.git
   cd fellowshipoftheflux
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

2. **Create new content**
   ```bash
   hugo new posts/my-new-post.md
   hugo new learn/tutorials/my-tutorial.md
   ```

3. **Preview production build**
   ```bash
   npm run build:preview
   npm run serve
   ```

## Content Structure

### Main Sections

- **Learn to Solder** (`/learn/`) - Educational platform with tutorials, guides, and projects
- **Request Lab Services** (`/services/`) - Information for organizations wanting workshops
- **Build Your Own Lab** (`/lab-setup/`) - Resources for creating soldering education programs
- **Community** (`/community/`) - Events, volunteer spotlights, and impact stories
- **Get Involved** (`/get-involved/`) - Volunteer opportunities and ways to support

### Content Types

- **Tutorials** - Step-by-step learning modules with progress tracking
- **Guides** - Comprehensive reference materials and best practices
- **Projects** - Hands-on builds with skill assessments
- **Posts** - News, updates, and community stories
- **Pages** - Static content like About, Services, etc.

## Brand Guidelines

Fellowship of the Flux brand identity is documented in `docs/brand-guidelines.md`, including:

- Mission statement and brand personality
- Color palette (Flux Blue, Solder Silver, Copper Warm)
- Typography guidelines (Inter font family)
- Imagery style and content guidelines
- Voice and tone for consistent messaging

## Deployment

### GitHub Pages Setup

The site automatically deploys to GitHub Pages at `https://fellowshipoftheflux.com` using GitHub Actions.

1. **Custom Domain Configuration**
   - Domain: `fellowshipoftheflux.com`
   - CNAME file: `static/CNAME`
   - DNS configured for GitHub Pages

2. **Automatic Deployment**
   - Push to `master` branch triggers deployment
   - GitHub Actions handles build and deployment
   - Includes HTML validation and link checking

### DNS Configuration

For custom domain setup:

**Apex domain (fellowshipoftheflux.com):**
```
A    185.199.108.153
A    185.199.109.153
A    185.199.110.153
A    185.199.111.153
```

## Project Structure

```
├── .github/workflows/     # GitHub Actions deployment
├── assets/               # Source assets (CSS, JS, images)
├── content/              # Markdown content
│   ├── learn/           # Educational content
│   │   ├── tutorials/   # Step-by-step learning modules
│   │   ├── guides/      # Reference materials
│   │   └── projects/    # Hands-on builds
│   ├── posts/           # News and updates
│   └── *.md             # Main pages (about, services, etc.)
├── docs/                # Documentation and brand guidelines
├── layouts/             # Custom Hugo templates
│   ├── learn/           # Educational platform layouts
│   ├── tutorials/       # Tutorial-specific layouts
│   ├── guides/          # Guide-specific layouts
│   └── projects/        # Project-specific layouts
├── scripts/             # Development and deployment scripts
├── static/              # Static assets and CNAME
├── themes/tailbliss/    # Base theme (Git submodule)
├── config.yaml          # Main Hugo configuration
├── config.dev.yaml      # Development configuration
├── config.production.yaml # Production configuration
└── package.json         # Node.js dependencies and scripts
```

## Contributing

### For Content Contributors

1. **Educational Content**: Add tutorials, guides, or projects to `/content/learn/`
2. **Community Stories**: Share volunteer spotlights and event recaps in `/content/posts/`
3. **Resource Updates**: Improve lab setup guides and equipment recommendations

### For Developers

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Run validation with `npm run test`
6. Submit a pull request

### Content Guidelines

- Follow brand guidelines in `docs/brand-guidelines.md`
- Use inclusive, welcoming language
- Prioritize safety in all technical content
- Include clear learning objectives and prerequisites
- Test all procedures and code examples

## Community

### Get Involved

- **Volunteer**: Help with workshops, content creation, or technical development
- **Partner**: Bring Fellowship workshops to your event or organization
- **Support**: Contribute equipment, funding, or expertise
- **Learn**: Use our resources and share your soldering journey

### Contact

- **Website**: https://fellowshipoftheflux.com
- **Email**: info@fellowshipoftheflux.com
- **Location**: Kansas City, Missouri (serving the Midwest)
- **Workshops**: workshops@fellowshipoftheflux.com
- **Volunteers**: volunteers@fellowshipoftheflux.com

## Mission

Fellowship of the Flux advances the art of learning to solder through community outreach, education, and resource sharing. We believe that hands-on learning builds not just technical skills, but confidence, community, and a lifelong love of making and problem-solving.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Fellowship of the Flux is a volunteer-driven organization dedicated to making soldering education accessible, safe, and fun for learners of all ages and backgrounds.*