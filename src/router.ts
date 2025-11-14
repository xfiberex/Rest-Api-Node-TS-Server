import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./controllers/productController";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing

router.get("/", getProducts);

router.get("/:id", 
    param("id")
        .isInt()
        .withMessage("ID no válido"),
    handleInputErrors,
    getProductsById
);

router.post("/",
    // Validar de datos antes de guardarlos en la BD
    body("name")
        .notEmpty()
        .withMessage("El nombre del producto no puede ir vacio"),

    body("price")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
        .isNumeric().withMessage("El valor no es valido")
        .custom((value) => value > 0).withMessage("El precio no es valido"),
    handleInputErrors, // Mostrar errores existentes
    createProduct
);

router.put("/:id", 
    param("id")
        .isInt()
        .withMessage("ID no válido"),
    body("name")
        .notEmpty()
        .withMessage("El nombre del producto no puede ir vacio"),

    body("price")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
        .isNumeric().withMessage("El valor no es valido")
        .custom((value) => value > 0).withMessage("El precio no es valido"),
    body("availability")
        .isBoolean()
        .withMessage("Valor para disponibilidad no válido"),
    handleInputErrors,
    updateProduct
);

router.patch("/:id", 
    param("id")
        .isInt()
        .withMessage("ID no válido"),
    handleInputErrors,
    updateAvailability
);

router.delete("/:id", 
    param("id")
        .isInt()
        .withMessage("ID no válido"),
    handleInputErrors,
    deleteProduct
);

export default router;
