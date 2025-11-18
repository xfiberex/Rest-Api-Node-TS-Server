import { Request, Response, NextFunction } from "express";
import colors from "colors";

// Interfaz para errores personalizados
interface CustomError extends Error {
    statusCode?: number;
    status?: string;
}

// Middleware de manejo de errores centralizado
export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Log del error en el servidor (no en testing)
    if (process.env.NODE_ENV !== "test") {
        console.error(colors.red.bold("Error: "), err.message);
        if (process.env.NODE_ENV === "development") {
            console.error(colors.red("Stack: "), err.stack);
        }
    }

    // Determinar el código de estado
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";

    // Preparar la respuesta de error
    const errorResponse: any = {
        status,
        message: err.message || "Error interno del servidor",
    };

    // En desarrollo, incluir el stack trace
    if (process.env.NODE_ENV === "development") {
        errorResponse.stack = err.stack;
    }

    res.status(statusCode).json(errorResponse);
};

// Middleware para rutas no encontradas
export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error: CustomError = new Error(`Ruta no encontrada - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

// Helper para crear errores personalizados
export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
