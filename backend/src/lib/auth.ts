import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import dotenv from "dotenv"
dotenv.config()

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: { 
        enabled: true, 
    },
    trustedOrigins: [process.env.ORIGIN!],
    baseURL: process.env.BETTER_AUTH_URL,
});