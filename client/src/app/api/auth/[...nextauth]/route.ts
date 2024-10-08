/*

import NextAuth from "next-auth";
import { axios } from "@/config/axiosConfig";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await axios.post("/api/auth/login", {
          email: credentials?.email,
          password: credentials?.password,
        });

        const user = await res.data;

        console.log("neextAuth", user);
        if (res.status === 200 && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ], //fin del providers
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },

  //==============otras opciones=============

  //secret: process.env.NEXTAUTH_SECRET, // Asegúrate de tener esta variable en tus variables de entorno

  session: {
    strategy: "jwt", //usar JWT como strategy de sesion
  },

  callbacks: {
    async jwt({ token, user }) {
  
      if (user) {
        (token.id = user.id as number),
          (token.role = user.role as string),
          (token.email = user.email as string),
          (token.token = user.token as string);
      }
      return token; // Retorna el token actualizado
    },
    async session({ session, token }) {
 
      session.user = {
        id: token.id as number,
        role: token.role as string,
        email: token.email as string,
        token: token.token as string,
      };
      return session; // Retorna la sesión actualizada
    },
  },
});

export { handler as POST, handler as GET };

*/
/*

JWT Tokens: NextAuth genera automáticamente un JWT cuando defines 
la estrategia session: { strategy: "jwt" } en la configuración. 
Esto significa que no necesitas generar manualmente los tokens, 
ya que NextAuth se encarga de ello. 
El token puede ser personalizado usando callbacks como jwt y session.

Callbacks: Los callbacks como jwt y session te permiten manipular el 
token y los datos de la sesión antes de que sean enviados al cliente.



  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        //  session.id = token.id;
      }
      return session;
    },
  },
*/
