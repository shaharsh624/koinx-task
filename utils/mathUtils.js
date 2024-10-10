function calculateStandardDeviation(values) {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance =
        values
            .map((value) => Math.pow(value - mean, 2))
            .reduce((a, b) => a + b) / values.length;
    return Math.sqrt(variance);
}

module.exports = { calculateStandardDeviation };
