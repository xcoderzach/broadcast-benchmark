var Benchmark = require('benchmark')
var object = require('./object')
var objectFn = require('./object-fn-unsubscribe')
var suite = new Benchmark.Suite

// add tests
suite.add('id unsubscribe', function() {
  var sub = object({})
  var unsubs = []
  for(var i = 0 ; i < 10000 ; i++) {
    unsubs.push(sub.subscribe(() => {}))
  }
  for(var i = 0 ; i < 10000 ; i++) {
    sub.unsubscribe(unsubs[i])
  }
})
.add('fn unsubscribe', function() {
  var sub = objectFn({})
  var unsubs = []
  for(var i = 0 ; i < 10000 ; i++) {
    unsubs.push(sub.subscribe(() => {}))
  }
  for(var i = 0 ; i < 10000 ; i++) {
    unsubs[i]()
  }
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.run()
