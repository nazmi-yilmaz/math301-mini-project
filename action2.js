const fs = require('fs')
const XLSX = require('xlsx')

// Generates excel file from the dataset
function saveRecords(dest, cols, meta) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  // Write meta data
  fs.writeFileSync(`${dest}/meta.json`, JSON.stringify(meta))
  // Write .xlsx file
  let sheet = XLSX.utils.json_to_sheet(cols)
  let wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, sheet, 'Default')
  XLSX.writeFile(wb, `${dest}/data.xlsx`)
}

// Generates an array of random integers with the specified size
function randomIntegerArray(lowerBound, upperBound, size) {
  return [...Array(size - 1)].map((i) => {
    let f = Math.random()
    return Math.floor(f * (upperBound - lowerBound + 1) + lowerBound)
  })
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

// Calculates the standard deviation
function getStandardDeviation(dataset) {
  return Math.sqrt(getVariance(dataset))
}

// Function for single test
function test(number) {
  let n1 = randomIntegerArray(1, 9, 1000)
  let n2 = randomIntegerArray(1, 9, 1000)
  let n3 = randomIntegerArray(1, 9, 1000)

  let result = [...Array(999)].map((v, i) => {
    return {
      n1: n1[i],
      n2: n2[i],
      n3: n3[i],
      sum: n1[i] + n2[i] + n3[i],
    }
  })

  let sum = result.map((i) => i.sum)

  let meta = {
    mean: getMean(sum),
    variance: getVariance(sum),
    standard_deviation: getStandardDeviation(sum),
  }
  console.log(meta)
  saveRecords(`./data/action2/test${number}`, result, meta)
}

// Simulates 5 test cases
function simulate() {
  for (let i = 1; i <= 5; i++) {
    test(i)
  }
}

simulate()
