import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from 'next-auth/providers/credentials'
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import { compare } from 'bcrypt'
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
interface Props {
  clientId: string;
  clientSecret: string;
}
export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider(<Props>{
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    TwitterProvider(<Props>{
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      // version: "2.0", // opt-in to Twitter OAuth 2.0
      
    }),
    // ...add more providers here
    GoogleProvider(<Props>{
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
        
      }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {
           email: {label: 'Email', type: 'email', placeholder: 'mail'},
           password: {label: 'Password', type: 'password'}

      },
      async authorize(credentials, req){
          const { email, password} = credentials as {
              email: string;
              password: string;
          };
          // const user = { id: "1", name: "J Smith", email: "jsmith@example.com", password: '1234' }
          const user = await prisma.user.findUnique({
              where: {
                email: email,
              },
            });     
          console.log(user)
          console.log('checking pw')
          

          // const match = await compare(password, user.password);
          const match = await (password == user.password)
          if (match && user) {
              console.log('pw looks fine')
              return user
          } else {
              console.log('wrong credentials')
              return null
          }

          return user

      }
  })
  ],
  pages:{
    // override signin page with a custom
    // signIn: '/auth/signin2',
    // error: '/auth/error',
    // signout: '/auth/signout'

}
};

export default NextAuth(authOptions);
