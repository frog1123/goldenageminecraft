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

use dev values not prod values

```python
# .env

# these have different values for prod and dev
NEXTAUTH_SECRET=
DATABASE_URL=

# these are the same on prod and dev
#
```
