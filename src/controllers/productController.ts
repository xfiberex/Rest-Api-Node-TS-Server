import { Request, Response } from "express";
import Product from "../models/Product.model";

// Obtener todos los productos
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [["id", "DESC"]],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.json({ data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};

// Obtener un producto en especifico por su ID
export const getProductsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        // Validar si existe el producto con ese ID
        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        res.json({ data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};

// Crear un producto
export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json({
            data: product,
            msg: "Producto creado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};

// Actualizar un producto con PUT y su ID
export const updateProduct = async (req: Request, res: Response) => {
    try {
        // Validar si el producto existe por su ID
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            attributes: { exclude: ["createdAt"] },
        });

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        // Actualizar y guardar producto
        await product.update(req.body);
        await product.save();

        return res.status(200).json({
            msg: "Producto actualizado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};

// Modificar solo un dato en especifico del producto con PATCH y su ID sin datos desde el body
export const updateAvailability = async (req: Request, res: Response) => {
    try {
        // Validar si el producto existe por su ID
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            attributes: { exclude: ["createdAt"] },
        });

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        /* Modificar y guardar, solo un dato en especifico 
           del producto si pasarle nada desde el body */
        product.availability = !product.dataValues.availability;
        await product.save();

        res.json({ data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};

// Eliminar un producto con su ID
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            attributes: { exclude: ["createdAt"] },
        });

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        // Despues de validar si existe el producto eliminarlo
        await product.destroy();
        res.json({ msg: "Producto eliminado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};
