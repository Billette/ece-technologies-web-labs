#!/usr/bin/env ts-node

import { Metric, MetricsHandler } from '../src/metrics'

const met = [
  new Metric(`${new Date('2013-11-04 14:00 UTC').getTime()}`, 12),
  new Metric(`${new Date('2013-11-04 14:15 UTC').getTime()}`, 10),
  new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 8)
]

const db = new MetricsHandler('./db/metrics')



const met2 = [
  new Metric(`${new Date('2013-12-04 13:00 UTC').getTime()}`, 13),
  new Metric(`${new Date('2013-12-04 14:25 UTC').getTime()}`, 18),
  new Metric(`${new Date('2013-12-04 14:45 UTC').getTime()}`, 7)
]

db.save(0, met, (err: Error | null) => {
  if (err) throw err
})

db.save(2, met2, (err: Error | null) => {
  if (err) throw err
})

console.log("Data populated")