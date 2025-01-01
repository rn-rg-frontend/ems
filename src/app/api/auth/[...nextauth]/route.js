import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth`, {
            userName: credentials.username,
            password: credentials.password,
          });
          console.log("API Response:", response.data);
          const userData = response.data;
          
          if (response.status === 200 && userData) {
            return {
              id: userData.user.id,
              name: userData.user.name,
              isAdmin: userData.user.isAdmin,
              token: userData.token
            };
          }
          
          return null;
        } catch (error) {
          console.error('Login error:', error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
        token.accessToken = user.token;
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.isAdmin = token.isAdmin;
      session.user.accessToken = token.accessToken;
      session.user.name = token.name; 
      session.user.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: '/auth',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);