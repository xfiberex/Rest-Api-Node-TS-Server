import db from "../config/db";
import Product from "../models/Product.model";
import colors from "colors";

/**
 * Limpia todos los productos de la base de datos y reinicia la secuencia de IDs
 */
export async function clearAllProducts() {
    try {
        const productCount = await Product.count();
        
        if (productCount > 0) {
            console.log(colors.yellow(`🗑️  Limpiando ${productCount} productos de la base de datos...`));
            
            // Eliminar todos los productos
            await Product.destroy({ where: {}, truncate: true });
            
            // Reiniciar la secuencia de IDs en PostgreSQL
            await db.query(`ALTER SEQUENCE products_id_seq RESTART WITH 1`);
            
            console.log(colors.green.bold("✅ Base de datos limpiada y secuencia de IDs reiniciada"));
        } else {
            console.log(colors.cyan("ℹ️  No hay productos para limpiar"));
        }
    } catch (error) {
        console.error(colors.red.bold("❌ Error al limpiar la base de datos:"), error);
        throw error;
    }
}

/**
 * Calcula el tiempo hasta la medianoche (00:00:00)
 */
function getTimeUntilMidnight(): number {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Próxima medianoche
    
    return midnight.getTime() - now.getTime();
}

/**
 * Programa la limpieza automática diaria de la base de datos
 */
export function scheduleDailyCleanup() {
    // Solo ejecutar en producción o si está explícitamente habilitado
    if (process.env.NODE_ENV !== "production" && process.env.ENABLE_AUTO_CLEANUP !== "true") {
        console.log(colors.yellow("⚠️  Limpieza automática deshabilitada (solo producción)"));
        return;
    }

    console.log(colors.cyan.bold("🕐 Programando limpieza automática diaria..."));
    
    // Función para programar el próximo cleanup
    const scheduleNextCleanup = () => {
        const timeUntilMidnight = getTimeUntilMidnight();
        
        // Convertir a horas y minutos para mostrar
        const hours = Math.floor(timeUntilMidnight / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntilMidnight % (1000 * 60 * 60)) / (1000 * 60));
        
        console.log(colors.cyan(`⏰ Próxima limpieza en: ${hours}h ${minutes}m`));
        
        setTimeout(async () => {
            console.log(colors.yellow.bold("\n🔄 Iniciando limpieza automática diaria..."));
            
            try {
                await clearAllProducts();
                console.log(colors.green.bold("✅ Limpieza diaria completada exitosamente\n"));
            } catch (error) {
                console.error(colors.red.bold("❌ Error en limpieza diaria:"), error);
            }
            
            // Programar la siguiente limpieza (24 horas después)
            scheduleNextCleanup();
        }, timeUntilMidnight);
    };
    
    // Iniciar el scheduler
    scheduleNextCleanup();
    
    console.log(colors.green.bold("✅ Scheduler de limpieza automática iniciado"));
}

/**
 * Verifica y limpia productos al iniciar si es necesario
 * Útil para reiniciar el contador de IDs en el primer arranque del día
 */
export async function checkAndCleanOnStartup() {
    // Solo en producción o si está habilitado
    if (process.env.NODE_ENV !== "production" && process.env.ENABLE_AUTO_CLEANUP !== "true") {
        return;
    }

    try {
        const productCount = await Product.count();
        
        if (productCount > 0) {
            console.log(colors.cyan(`📊 Base de datos contiene ${productCount} productos`));
            
            // Opcional: Puedes descomentar esto si quieres limpiar al iniciar
            // await clearAllProducts();
        } else {
            console.log(colors.green("✅ Base de datos vacía, secuencia de IDs lista"));
        }
    } catch (error) {
        console.error(colors.red("Error al verificar la base de datos:"), error);
    }
}
