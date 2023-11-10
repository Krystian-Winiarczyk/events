String.prototype.firstToUpper = function () {
  return this.valueOf().charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}

String.prototype.dateRange = function () {
  const dates = this.valueOf().split(/(?: do | to )+/)

  if (dates.length === 1)
    dates.push(dates[0])

  return dates
}

Array.prototype.mapKeys = function (key = 'id') {
  return this.map(value => value[key] || value).filter(Boolean)
}

Array.prototype.groupBy = function (f) {
  return this.reduce((a, b, i) => ((a[f(b, i, this)] ||= []).push(b), a), {})
}

Array.prototype.findWhere = function (key = 'id', value) {
  return this.find(item => item[key] === value) || null
}

Array.prototype.removeDuplicates = function (key = 'id') {
  return this.filter((value, index, self) => index === self.findIndex(t => {
    return (
      t[key] === value[key]
    )
  }))
}

Array.prototype.splitIntoChunks = function (chunkSize = 10) {
  const chunks = []
  let index = 0

  while (index < this.length) {
    chunks.push(this.slice(index, index + chunkSize))
    index += chunkSize
  }

  return chunks
}
