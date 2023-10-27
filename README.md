# URL Shortener

This project is a URL shortener that allows you to create and manage shortened URLs. Users can access short URLs to redirect to the original web page.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

Make sure you have the following software and tools installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository to your local machine.

2. Change to the project directory.

3. Install project dependencies.

4. Configure environment variables.

### Usage

Run the development server:
(The application will be available at <http://localhost:3000>.)

```bash
npm run dev
```

## Features

- Shorten long URLs and manage shortened URLs.
- Access shortened URLs to redirect to the original web page.

## Built With

The t3-app (<https://create.t3.gg/>)

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- and more...

## Pre-Commit Hooks

We've integrated Husky pre-commit hooks into this project to ensure code quality and formatting consistency. These hooks run automatically before each commit to keep the codebase clean and maintainable.

### What It Does

The pre-commit hooks include the following tasks:

1. **Prisma Format**: Formats Prisma schema files to ensure consistency and readability.

2. **Prettier Check**: Checks the entire codebase for formatting issues. It ensures that the code adheres to the defined coding style and formatting rules.

3. **Linting**: Runs ESLint to identify and report any code quality issues. This helps maintain code consistency and enforces best practices.

### How to Use

When you make a commit, Husky will automatically execute these tasks, and if any issues are found, the commit will be blocked until they are resolved. This ensures that every commit meets the project's quality and style standards.

Enjoy the benefits of automated code quality and formatting checks with Husky!

## Dependencies

The project uses various packages and dependencies, including:

- [@clerk/nextjs](https://www.clerk.dev/)
- [@prisma/client](https://www.prisma.io/)
- [@radix-ui/react-label](https://radix-ui.com/)
- [@tanstack/react-query](https://react-query.tanstack.com/)
- [@trpc/client](https://trpc.io/)
- [@trpc/next](https://trpc.io/)
- [@trpc/react-query](https://trpc.io/)
- [@trpc/server](https://trpc.io/)
- [@upstash/ratelimit](https://upstash.com/docs/)
- and more...

For the full list of dependencies, refer to the project's `package.json` file.

## Scripts

The project includes various scripts for development and production:

- `npm run build`: Build the project for production.
- `npm run db:push`: Push changes to the database using Prisma.
- `npm run db:studio`: Open Prisma Studio.
- `npm run dev`: Start the development server.
- `npm run lint`: Lint the code using ESLint.
- `npm run start`: Start the production server.
- `npm run prepare`: Install Husky for Git hooks.

## Roadmap

For a detailed project roadmap, please visit our [Roadmap](https://zip-url.vercel.app/roadmap).

## Acknowledgments

Special thanks to the open-source community for the various packages used in this project.

Enjoy using your URL shortener!
