import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const response = await makeRequest('/auth/login', 'POST', credentials);

        if (response.error) {
          return null;
        } else {
          return {token : response.token}
        }
      }
    })
  ],
  callbacks: {
    jwt: async (token, user) => {
      if (user?.token) {
        token.backendJWT = user.token;
      }
      return token;
    },
    session: async (session, user) => {
      const userResponse = await makeRequest('/auth/user', 'GET');
      session.user = userResponse;

      return Promise.resolve(session);
    }
  }
})
