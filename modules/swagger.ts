import swaggerJSDoc from "swagger-jsdoc"

const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "Witty API Docs with Swagger API",
      description:
        "트위터, 인스타그램 등의 SNS 서비스를 오마주한 Witty의 API 문서입니다.",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["src/routes/*.ts"],
}

export const specs = swaggerJSDoc(options)