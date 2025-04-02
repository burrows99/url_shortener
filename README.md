# URL Shortener

A simple URL shortener built with Next.js, Prisma, and PostgreSQL.

## Features

- URL shortening with custom short codes
- Click tracking for shortened URLs
- Modern UI with Tailwind CSS
- Form validation with Zod
- Copy to clipboard functionality

## Tech Stack

- Next.js
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- React Hook Form
- Zod

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/burrows99/url_shortener.git
cd url_shortener
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```
Update the DATABASE_URL in .env with your PostgreSQL connection string.

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

MIT
