// Polyfill for pairs (cons, car, cdr)
var root = (typeof window === 'undefined') ? global : window 

root.cons = function(x, y) {
  return function(pick) {
    return pick(x, y)
  }
}

root.car = function(f) {
  return f(function(x, y) { return x })
}

root.cdr = function(f) {
  return f(function(x, y) { return y })
}
// End of pairs polyfill
