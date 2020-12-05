const fs = require('fs')

// Generates json file with result data
function saveRecords(dest, meta) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  // Write meta data
  fs.writeFileSync(`${dest}/meta.json`, JSON.stringify(meta))
}
// Calculates the mean
function getMean(dataset) {
  return dataset.reduce((a, b) => a + b) / dataset.length
}

// Calculates the variance
function getVariance(dataset) {
  let sum = 0
  let mean = getMean(dataset)
  for (i of dataset) {
    let val = i - mean
    sum = sum + val * val
  }
  return sum / (dataset.length - 1)
}
// Enter student : p => P(female)
function enter(p) {
  let r = Math.random()
  if (r <= p) {
    return 'female'
  }
  return 'male'
}
// Tests for a single p
function test(p) {
  let counter = 0
  while (true) {
    let student = enter(p)
    console.log(p, 'next is ', student, counter)
    if (student == 'female') {
      console.log('found female, returning...')
      return counter
    }
    counter++
  }
}
// Simulates system with some ps and ns
function simulate() {
  let ps = [0.5, 0.4, 0.3, 0.2, 0.1]
  let xs = []

  ps.forEach(function (p, i) {
    let x = test(p)
    xs.push(x)
    saveRecords(`./data/action4/test${i + 1}`, { p, x })
  })
  let variance = getVariance(xs)
  saveRecords(`./data/action4`, { variance })
}
simulate()
