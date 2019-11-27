import {LevelDB} from './leveldb'
import WriteStream from 'level-ws'


export class Metric {
  public timestamp: string
  public value: number

  constructor(ts: string, v: number) {
    this.timestamp = ts
    this.value = v
  }
}

export class MetricsHandler {
    private db: any 
  
    constructor(dbPath: string) {
      this.db = LevelDB.open(dbPath)
    }

    public save (
      key : number,
      metrics : Metric[],
      callback: (error:Error | null) => void
    ){
      const stream = WriteStream(this.db)
      stream.on('error', callback)
      stream.on('close', callback)
      metrics.forEach((m: Metric) => {
        stream.write({ key: `metric:${key}:${m.timestamp}`, value: m.value })
      })
      stream.end()
    }

    public getAll (
      callback: (error:Error | null, result: any) => void
    ){

      let metrics: Metric[] = []
      const rs = this.db.createReadStream()
        .on('data', function (data) {
          console.log(data.key, '=', data.value) 
          const timestamp = data.key.split(':')[2]
          let metric: Metric = new Metric(timestamp, data.value)
          metrics.push(metric)
        })
        .on('error', function (err) {
          console.log('Oh my!', err)
          callback(err ,null)
        })
        .on('close', function () {
          console.log('Stream closed')
        })
        .on('end', function () {
          console.log('Stream ended')
          callback(null, metrics)
        })
    }


    public getOne(
      key : number,
      callback: (error:Error | null, result:any) => void){
        let metrics: Metric[] = []
        const rs = this.db.createReadStream()
        .on('data', function (data) {
          //console.log("key :", data.key)
          const tmp = data.key.split(':')[1]
          //console.log("test :", tmp)
          //console.log("key parameters :", key)
          if(tmp === key){
            console.log(data.key, '=', data.value) 
            const timestamp = data.key.split(":")[2]
            let metric: Metric = new Metric(timestamp,data.value)
            metrics.push(metric)
          }
        })
        .on('error', function (err) {
          console.log('Oh my!', err)
          callback(err ,null)
        })
        .on('close', function () {
          console.log('Stream closed')
        })
        .on('end', function () {
          console.log('Stream ended')
          callback(null, metrics)
        })

      }

      public deleteOne(
        key : number,
        callback: (error:Error | null, result:any) => void
        ){
          console.log("key : ",key)
          const del = this.db.del(key,callback)
          //console.log("je sais pas", del)
          //callback(null, del)
        }
}