// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import { axios } from "@/config/axiosConfig";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const res = await axios.post("/api/auth/login", {
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await res.data;

        if (res.status === 200 && user) {
          return user;
        } else {
          return null;
        }

        /**  if (response.status === 200) {
          return {
            token: response.data.token, // Token generado por el backend
            user: response.data.user,  // Datos del usuario
          };
        }
        return null; */
      },
    }),
  ], //fin del providers
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },

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

  session: {
    strategy: "jwt", //usar JWT como strategy de sesion
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.id;
      }

      /** if (user?.token) {
        token.accessToken = user.token; // Guardar el JWT en el token
      } */
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Añadir el token al objeto de sesión
        //session.accessToken=token.accessToken;
      }
      return session;
    },
  },
});
