# CONTRIBUTING

This project uses nextjs

## Getting started

To run:

`pnpm i`

`pnpm dev`

## Other commands

```
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint",
"prisma": "prisma generate --schema prisma/schema.prisma && prisma db push",
"studio": "prisma studio",
"migrate-reset": "prisma migrate reset",
"prettier": "prettier --write \"./**/*.{js,jsx,mjs,cjs,ts,tsx,json}\""
```

# env

.env setup

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
WEBHOOK_SECRET=
DATABASE_URL=
```
