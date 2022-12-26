function scheduleMeasurement() {
    if (!performance.measureMemory) {
        console.log("performance.measureMemory() is not available.");
        return;
    }
    const interval = measurementInterval();
    console.log("Scheduling memory measurement in " +
        Math.round(interval / 1000) + " seconds.");
    setTimeout(performMeasurement, interval);
}

// Начать измерения после загрузки страницы в браузере.
window.onload = function () {
    scheduleMeasurement();
}

function measurementInterval() {
    const MEAN_INTERVAL_IN_MS = 5 * 60 * 1000;
    return -Math.log(Math.random()) * MEAN_INTERVAL_IN_MS;
}

async function performMeasurement() {
    // 1. Вызов performance.measureMemory().
    let result;
    try {
        result = await performance.measureMemory();
    } catch (error) {
        if (error instanceof DOMException &&
            error.name === "SecurityError") {
            console.log("The context is not secure.");
            return;
        }
        // Повторный выброс других ошибок.
        throw error;
    }
    // 2. Запись результата.
    console.log("Memory usage:", result);
    // 3. Планирование следующего измерения.
    scheduleMeasurement();
}