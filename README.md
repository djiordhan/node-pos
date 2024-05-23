# Node POS

![screen](https://github.com/djiordhan/node-pos/blob/main/demo/demo.png)

Node POS is a Node.js version of the [spring-boot-pos](https://github.com/djiordhan/spring-boot-pos) repository. This project uses Prisma, TypeScript, and Swagger.

## Features

- **Prisma**: ORM for database management.
- **TypeScript**: Type-safe JavaScript at any scale.
- **Swagger**: API documentation and testing.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/node-pos.git
    cd node-pos
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

- To start the development server:
    ```bash
    npm run dev
    ```

- To build the application:
    ```bash
    npm run build
    ```

- To start the application:
    ```bash
    npm start
    ```

### Database Setup

Make sure to set up your database and Prisma configuration. You can initialize Prisma with:
```bash
npx prisma init
