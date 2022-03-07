export const openApiOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "books directory api",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "islam saeed",
        email: "islam.s.mhmd1998@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
    components: {
      schemas: {
        scucess: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },

        GeneralError: {
          type: "object",
          properties: {
            code: {
              type: "integer",
              format: "int32",
            },
            message: {
              type: "string",
            },
          },
        },
        validationError: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
        },
        loginRes: {
          type: "object",
          properties: {
            token: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
        LoginBody: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
        book: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            book_name: {
              type: "string",
            },
            book_category: {
              type: "string",
            },
            book_author: {
              type: "string",
            },
            realase_year: {
              type: "string",
              format: "date",
            },
          },
        },
        createBook: {
          type: "object",
          properties: {
            book_name: {
              type: "string",
            },
            book_category: {
              type: "string",
            },
            book_author: {
              type: "string",
            },
            realase_year: {
              type: "string",
              format: "date",
            },
          },
        },
      },
    },
    paths: {
      //csrf
      "/api/auth/csrf": {
        get: {
          tags: ["Csrf-token"],
          summary: "getting csrf token",
          responses: {
            200: {
              description: "the csrf token response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      csrf_: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      // auth login
      "/api/auth/login": {
        post: {
          tags: ["Login"],
          summary: "Authenticate a user cerdentials",
          requestBody: {
            description: "authentication login body",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/LoginBody",
                },
              },
            },
            required: true,
          },
          parameters: [
            {
              name: "_csrf",
              in: "query",
              description: "A Csrf token to Authenticate the request",
              required: true,
              schema: {
                type: "string",
              },
              style: "simple",
            },
          ],
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/loginRes",
                  },
                },
              },
            },
            401: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/GeneralError",
                  },
                },
              },
            },
            400: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/validationError",
                  },
                },
              },
            },
          },
        },
      },
      "/api/books": {
        get: {
          tags: ["Find all Books"],
          summary: "Finds all Books",
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/book",
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Create a Book"],
          summary: "create a new book",
          parameters: [
            {
              name: "_csrf",
              in: "query",
              description: "A Csrf token to Authenticate the request",
              required: true,
              schema: {
                type: "string",
              },
              style: "simple",
            },
          ],
          requestBody: {
            description: "Creating a book body",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/createBook",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/scucess",
                  },
                },
              },
            },
            400: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/validationError",
                  },
                },
              },
            },
            401: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/GeneralError",
                  },
                },
              },
            },
          },
        },
      },
      "/api/books/:id": {
        get: {
          tags: ["Finds a Book"],
          summary: "Finds a Book with id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "the book id to delete",
              required: true,
              schema: {
                type: "string",
              },
              style: "simple",
            },
          ],
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/book",
                  },
                },
              },
            },
            400: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/validationError",
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ["Updates a Book"],
          summary: "Updates a book with id",
          parameters: [
            {
              name: "_csrf",
              in: "query",
              description: "A Csrf token to Authenticate the request",
              required: true,
              schema: {
                type: "string",
              },
              style: "simple",
            },
            {
              name: "id",
              in: "path",
              description: "the book id to delete",
              required: true,
              schema: {
                type: "string",
              },
              style: "simple",
            },
          ],
          requestBody: {
            description: "authentication login body",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/createBook",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/success",
                  },
                },
              },
            },
            401: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/GeneralError",
                  },
                },
              },
            },
            400: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/validationError",
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Deleting a Book"],
          summary: "Delete a book with id",
          parameters: [
            {
              name: "_csrf",
              in: "query",
              description: "A Csrf token to Authenticate the request",
              required: true,
              schema: {
                type: "string",
              },
              style: "simple",
            },
            {
              name: "id",
              in: "path",
              description: "the book id to delete",
              required: true,
              schema: {
                type: "string",
              },
              style: "simple",
            },
          ],
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/scucess",
                  },
                },
              },
            },
            400: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/validationError",
                  },
                },
              },
            },
            401: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/GeneralError",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};
