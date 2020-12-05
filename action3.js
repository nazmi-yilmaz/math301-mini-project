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

// Selects a child with P(boy) = p
function pick(p) {
  let r = Math.random()
  if (r <= p) {
    return 'boy'
  }
  return 'girl'
}

// Selects N children
function test(p, n) {
  const children = []
  for (let i = 0; i < n; i++) {
    children.push(pick(p))
  }
  return {
    children,
    x: children.filter((c) => c == 'boy').length,
  }
}

// Simulates system with some ps and ns
function simulate() {
  let ps = [0.2, 0.4, 0.7]
  let ns = [10, 100, 1000]
  ps.forEach(function (p, i) {
    ns.forEach(function (n, i2) {
      const { children, x } = test(p, n)
      const meta = {
        p,
        n,
        x,
      }
      const rows = children.map((c) => {
        return {
          child: c,
        }
      })
      saveRecords(`./data/action3/test${i + 1}/${i2 + 1}`, rows, meta)
    })
  })
}

simulate()
