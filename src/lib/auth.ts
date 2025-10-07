import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../server/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1️⃣ Try Admin first
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });
        if (admin) {
          const isValid = await bcrypt.compare(credentials.password, admin.password);
          if (!isValid) return null;

          return {
            id: admin.id.toString(),
            email: admin.email,
            name: admin.name ?? undefined,
            role: "ADMIN",
          };
        }

        // Then try School Owner
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};


// // src/lib/auth.ts
// import { type NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "../server/prisma";
// import bcrypt from "bcryptjs";

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         // 🔹 Try Admin first
//         const admin = await prisma.admin.findUnique({
//           where: { email: credentials.email },
//         });
//         if (admin) {
//           const isValid = await bcrypt.compare(credentials.password, admin.password);
//           if (!isValid) return null;

//           return {
//             id: admin.id.toString(),
//             email: admin.email,
//             name: admin.name ?? undefined,
//             role: "ADMIN",
//           };
//         }

//         // Then try School Owner (User)
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });
//         if (!user) return null;

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) return null;

//         return {
//           id: user.id.toString(),
//           email: user.email,
//           name: `${user.firstName} ${user.lastName}`,
//           role: user.role, // "SCHOOL_OWNER"
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       // Add user data to token at login
//       if (user) {
//         token.id = user.id;
//         token.role = user.role; // 🔥 include role
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       // Attach token data to session
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };
