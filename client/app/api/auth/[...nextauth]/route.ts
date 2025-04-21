// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak"

export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.NEXT_PUBLIC_KEYCLOACK_ID,
            clientSecret: process.env.NEXT_PUBLIC_KEYCLOACK_SECRET,
            issuer: process.env.NEXT_PUBLIC_KEYCLOACK_ISSUER
        })
    ]
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }