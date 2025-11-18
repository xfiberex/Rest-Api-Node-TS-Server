import rateLimit from "express-rate-limit";

// Rate limiter general para todas las rutas
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 peticiones por ventana por IP
    message: "Demasiadas peticiones desde esta IP, por favor intente de nuevo más tarde.",
    standardHeaders: true, // Retorna información del rate limit en los headers `RateLimit-*`
    legacyHeaders: false, // Deshabilita los headers `X-RateLimit-*`
});

// Rate limiter más estricto para rutas de escritura (POST, PUT, PATCH, DELETE)
export const writeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 50, // Límite de 50 peticiones de escritura por ventana por IP
    message: "Demasiadas operaciones de escritura desde esta IP, por favor intente de nuevo más tarde.",
    standardHeaders: true,
    legacyHeaders: false,
    // Solo aplicar a métodos de escritura
    skip: (req) => req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS",
});

// Rate limiter específico para crear productos (más restrictivo)
export const createProductLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 20, // Límite de 20 productos creados por hora por IP
    message: "Ha alcanzado el límite de creación de productos por hora.",
    standardHeaders: true,
    legacyHeaders: false,
});
