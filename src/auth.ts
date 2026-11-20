import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDb from "./app/lib/connectDB";
import User from "./app/models/user.model";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({

  // Configure one or more authentication providers
  providers: [

    // Add Credentials provider for email and password authentication
    Credentials({

      // Define the credentials fields for the provider
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" },
      },

      // Define the authorize function to handle user authentication
      async authorize(credentials) {

        // connect to the database
        await connectDb()

        // get email and password from credentials
        const email = credentials.email as string
        const password = credentials.password as string

        // find user 
        const user = await User.findOne({ email })

        // throw error if not found
        if (!user) {
          throw new Error("User does not exist")
        }

        // compare password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password)

        // throw error if password does not match
        if (!isMatch) {
          throw new Error("Incorrect Password")
        }

        // return user object if authentication is successful
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        }

      },

    }),

  ],

  // callback function to handle JWT token creation and user session management
  callbacks: {

    // jwt 
    jwt({ token, user }) {

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }

      return token

    },

    // session
    session({ session, token }) {

      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }

      // return 
      return session

    }

  },

  // define custom pages for sign in and error handling
  pages: {
    signIn: "/login",
    error: "/login"
  },

  // define session strategy and secret for JWT authentication
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60 * 1000
  },

  // define secret for JWT authentication
  secret: process.env.BETTER_AUTH_SECRET

});