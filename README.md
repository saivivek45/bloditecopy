# ⚡ Next.js Full Stack App with TypeScript, Prisma, MySQL, NextAuth & Zod

Welcome to a powerful and scalable **Next.js** full stack project — built with all the modern tools you'll need for your next web app! 🎯

---

## 🧰 Tech Stack

| Tool            | Description                                                 |
|-----------------|-------------------------------------------------------------|
| 🧪 **Next.js**     | React framework for SSR, SSG, and full-stack capabilities |
| 🧠 **TypeScript**  | Strongly typed language built on JavaScript               |
| 🧬 **Prisma**      | Type-safe ORM for relational DBs like MySQL/PostgreSQL    |
| 🐬 **MySQL**       | Relational database system                                |
| 🔐 **NextAuth.js** | Authentication provider for secure login & session mgmt   |
| 🧾 **Zod**         | Schema validation and type inference                      |
| 📦 **API Routes**  | RESTful API endpoints via Next.js                         |

---

## 🚀 Features

- 🌍 Server-side rendered pages (SSR)
- 🛡 Secure login system via NextAuth
- 🔄 Fully typed client-server validation with Zod
- 🔧 API endpoints built with type-safe Prisma queries
- 📁 Clean modular structure
- 🧪 Easy to test and extend

---

## 🏁 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Create `.env` File

Create a `.env` file in the root:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/dbname"
NEXTAUTH_SECRET="some_super_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 🧬 Prisma Setup

### ✅ Initialize DB & Generate Client

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 📝 Example `schema.prisma`

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

---

## 🧾 Zod Validation

### 🧪 `validations/user.ts`
```ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
```

### 🔐 Use in API Route
```ts
import { createUserSchema } from "@/validations/user";

export default async function handler(req, res) {
  try {
    const body = createUserSchema.parse(req.body);
    // Proceed with DB logic
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }
}
```

---

## 🔐 Authentication with NextAuth.js

```ts
// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        return { id: 1, name: "Demo User", email: credentials.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
```

---

## 🔄 Project Structure

```
📁 prisma          -> Prisma schema and migrations
📁 pages
   └── 📁 api      -> API routes (RESTful)
📁 lib             -> Utility functions (e.g., auth, validation)
📁 components      -> Reusable UI components
📁 types           -> Global TypeScript types
📁 validations     -> Zod schemas
📄 .env            -> Environment variables
📄 next.config.js  -> Next.js configuration
```

---

## 🛠 Useful Scripts

```bash
npm run dev         # Run development server
npm run format      # Format code with Prettier
npx prisma studio   # View DB in browser
npx prisma migrate dev --name init   # Run migrations
```

---

## 📦 Deployment

You can deploy this project easily using:

- [Vercel](https://vercel.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)

Ensure your environment variables are set properly during deployment.

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📬 Contact

📧 Email: pratikraj220011@gmail.com
