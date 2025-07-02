import prisma from "@/config/db.config";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "Enter your password" }
      },

      async authorize(credentials) {
        try {
          if(!credentials || !credentials.email){
            throw new Error("Email is required");
          }

          const user = await prisma.user.findFirst({
            where:{
              email: credentials.email
            }
          })

          if(!user){
            throw new Error("User not found");
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

          if(isPasswordCorrect) return user;
          else throw new Error("Password is incorrect");
        } 
        catch (error) {
          throw new Error(error as string);
        }
      }
    })
  ], 

  callbacks: {
    async jwt({ token, user }) {
      if(user){
        token.id = user.id?.toString();
        token.email = user.email
        token.username = user.username
      }
      return token;
    },
    async session({ session, token }) {
      if(token){
        session.user.id = token.id
        session.user.username = token.username
        session.user.email = token.email
      }
      return session
    }
  },

  pages: {
    signIn: '/login'
  },

  session: {
    strategy: 'jwt'
  },
  
  secret: process.env.NEXTAUTH_SECRET
}