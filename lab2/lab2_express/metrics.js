module.exports = {
    get: (callback) => {
      callback(null, [
        { timestamp: new Date('2013-11-04 14:00 UTC').getTime(), value:12}
      , { timestamp: new Date('2013-11-04 14:30 UTC').getTime(), value:15}
      ])
    }
  }