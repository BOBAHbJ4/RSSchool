
exports.min = function min (array) {
    return array !== undefined && array.length ? Math.min.apply(null, array) : 0;
}
exports.max = function max (array) {
    return array !== undefined && array.length ? Math.max.apply(null, array) : 0;
}
exports.avg = function avg (array) {
 return array !== undefined && array.length ? array.reduce((a, b) => (a + b)) / array.length : 0;
}
