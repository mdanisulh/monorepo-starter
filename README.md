# Monorepo Starter

<a href="https://idx.google.com/import?url=https%3A%2F%2Fgithub.com%2Fmdanisulh%2Fmonorepo-starter">
  <img
    height="32"
    alt="Open in IDX"
    src="https://cdn.idx.dev/btn/open_purple_32.svg">
</a>
<a href="https://idx.google.com/new?template=https%3A%2F%2Fgithub.com%2Fmdanisulh%2Fmonorepo-starter">
  <img
    height="32"
    alt="Export to IDX"
    src="https://cdn.idx.dev/btn/export_purple_32.svg">
</a>

A modern TypeScript-based monorepo starter template built with Nx, Bun, and Biome.

## Features

- 📦 Monorepo structure using Nx for efficient task management
- 🏗️ TypeScript support throughout the project
- 🚀 React 19 frontend with TanStack Router
- 🌐 Hono backend with OpenAPI documentation
- 📚 Shadcn UI components with Tailwind CSS
- 🧩 Shared packages for consistent development
- 🔧 Biome for linting, formatting and code quality
- 📝 Conventional commits with emoji support via Commitlint and czg
- 🪝 Git hooks with Lefthook

## Technologies

- [Nx](https://nx.dev/)
- [Bun](https://bun.sh/)
- [React](https://react.dev/)
- [Hono](https://hono.dev/)
- [TanStack Router](https://tanstack.com/router)
- [Shadcn UI](https://ui.shadcn.com/)
- [Biome](https://biomejs.dev/)

## Project Structure

```
.
├── apps/
│   ├── backend/        # Hono API server
│   └── frontend/       # React 19 frontend app
├── packages/
│   ├── tsconfig/       # Shared TypeScript configurations
│   ├── types/          # Shared TypeScript types
│   ├── ui/             # UI component library with Shadcn
│   └── utils/          # Shared utility functions
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.2.4 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/monorepo-starter.git
cd monorepo-starter

# Install dependencies
bun install
```

### Development

```bash
# Start all applications in development mode
bun run dev

# Frontend will be available at http://localhost:3001
# Backend will be available at http://localhost:5173
# API documentation at http://localhost:5173/reference
```

### Build

```bash
# Build all applications
bun run build

# Start production servers (per project)
# For example
bun run start
```

### TypeScript

```bash
# Type check all packages and applications
bun run typecheck
```

### Code Quality

```bash
# Lint the codebase
bun run lint

# Fix linting issues
bun run lint:fix

# Format the codebase
bun run format

# Fix formatting issues
bun run format:fix
```

## Adding UI Components

This project uses Shadcn UI components. To add a new component:

```bash
bun run add-shadcn-component button
```

## Committing Changes

This repository uses conventional commits with emoji support:

```bash
# Use the interactive commit tool
bun run commit
```

## Git Hooks

This project uses Lefthook to manage Git hooks:

- **pre-commit**: Automatically runs `sort-package-json` and Biome checks on staged files
- **commit-msg**: Validates commit messages according to conventional commit format

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`bun run commit`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
