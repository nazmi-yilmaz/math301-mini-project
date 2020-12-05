const M = 3 // 110510283
const N = 23 // September 23
const T = 7 // fluctuation range

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

function photons() {
  let r1 = Math.random()
  let r2 = Math.random()
  let nfluc = -1 * r1 * T
  let pfluc = r2 * T
  return Math.floor(N + nfluc + pfluc)
}

function test() {
  let data = []
  for (let i = 0; i < M; i++) {
    let count = photons()
    data.push(count)
  }
  return {
    data: data,
    sum: data.reduce((a, b) => a + b),
    variance: getVariance(data),
  }
}

function simulate() {
  let result = test()
  saveRecords(`./data/action5/test1`, result)
}

simulate()
