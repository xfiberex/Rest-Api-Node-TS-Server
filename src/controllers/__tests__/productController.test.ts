import request from "supertest";
import server from "../../server";

// Pruebas para crear producto y validar errores
describe("POST /api/products", () => {
    it("should display validation errors", async () => {
        const response = await request(server).post("/api/products").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    });

    it("should validate that the price is a number and greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Razer DeathAdder V3 Pro",
            price: 0,
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    });

    it("should validate that the price is a number", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Corsair K100 RGB",
            price: "hola",
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(4);
    });

    it("should create a new product", async () => {
        const response = await request(server).post("/api/products").send({
            name: "BenQ Zowie XL2566K",
            price: 599.0,
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("error");
    });
});

// Pruebas para obtener produtos y validar url
describe("GET /api/products", () => {
    it("should check if api/products url exists", async () => {
        const response = await request(server).get("/api/products");
        expect(response.status).not.toBe(404);
    });

    it("GET a JSON response with products", async () => {
        const response = await request(server).get("/api/products");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveLength(1);

        expect(response.body).not.toHaveProperty("errors");
    });
});

// Pruebas para validar que no exista el ID ingresado
describe("GET /api/products/:id", () => {
    it("should return a 404 response for a non-existent product", async () => {
        const productID = 2000;
        const response = await request(server).get(
            `/api/products/${productID}`
        );

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Producto no encontrado");
    });

    it("should check a valid ID in the URL", async () => {
        const response = await request(server).get(
            "/api/products/no-valid-url"
        );

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID no válido");
    });

    it("GET a JSON response for a single product", async () => {
        const response = await request(server).get("/api/products/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
    });
});

// Pruebas para actualizar productos y validar datos
describe("PUT /api/products", () => {
    it("should check a valid ID in the URL", async () => {
        const response = await request(server)
            .put("/api/products/no-valid-url")
            .send({
                name: "Samsung Odyssey G7 27-inch",
                price: 300,
                availability: true,
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID no válido");
    });

    it("should display validatiion error messages updating a product", async () => {
        const response = await request(server).put("/api/products/1").send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
    });

    it("should validate tha the price is greater than 0", async () => {
        const response = await request(server).put("/api/products/1").send({
            name: "Samsung Odyssey G7 27-inch",
            price: -599.99,
            availability: true,
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("El precio no es válido");

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
    });

    it("should return a 404 response for a non-existent product", async () => {
        const productId = 2000;
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Samsung Odyssey G7 27-inch",
                price: 300,
                availability: true,
            });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Producto no encontrado");

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
    });

    it("should update an existing product with valid data", async () => {
        const response = await request(server).put(`/api/products/1`).send({
            name: "Samsung Odyssey G7 27-inch",
            price: 300,
            availability: true,
        });

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe("Producto actualizado correctamente");

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("errors");
    });
});

// Pruebas para actualizar disponibilidad de productos
describe("PATCH /api/products/:id", () => {
    it("should check a valid ID", async () => {
        const response = await request(server).patch(
            "/api/products/not-valid"
        );

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[0].msg).toBe("ID no válido");
    });

    it("should return a 404 response for a non-existent product", async () => {
        const productId = 2000;
        const response = await request(server).patch(
            `/api/products/${productId}`
        );

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Producto no encontrado");

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
    });

    it("should update the product availability", async () => {
        const response = await request(server).patch("/api/products/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data.availability).toBe(false);

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("error");
    });
});

// Pruebas para eliminar productos
describe("DELETE /api/products/:id", () => {
    it("should check a valid ID", async () => {
        const response = await request(server).delete(
            "/api/products/not-valid"
        );

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[0].msg).toBe("ID no válido");
    });

    it("should return a 404 response for a non-existent product", async () => {
        const productId = 2000;
        const response = await request(server).delete(
            `/api/products/${productId}`
        );

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Producto no encontrado");

        expect(response.status).not.toBe(200);
    });

    it("should delete a product", async () => {
        const response = await request(server).delete("/api/products/1");

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe("Producto eliminado");

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
    });
});
