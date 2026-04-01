import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ChatApp API",
      version: "1.0.0",
      description: "A production-ready real-time chat application API built with Express, Better Auth, and Prisma.",
      contact: {
        name: "Developer Support",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "better-auth.session_token",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/server.ts"], // files containing annotations
};

export const swaggerSpec = swaggerJsdoc(options);
