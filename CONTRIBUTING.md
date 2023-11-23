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

## env

use dev values not prod values

```python
# .env

# db (dev)
DATABASE_URL=

# edgestore
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=

# nodemailer
NODEMAILER_USER=
NODEMAILER_PASS=
SEND_EMAILS=

# auth
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

```

then go to `localhost:3000`

## routes

![routes](https://github.com/frog1123/goldenageminecraft/blob/master/assets/contributing/routes.png)
