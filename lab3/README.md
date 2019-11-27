# Lab 3


In this lab, we were asked to do a simple project that runs a 'hello world' app. We expose a simple REST API that get, delete and post metrics 

## Prerequisites

Before you begin, you first need to install ```nodejs```. You also need **Postman** to post, get and delete the metrics


## Installing Lab 3

Move to your project directory after cloning the repository. Then, run the command :
```
    npm install
``` 

To start the server, just type the command :
```
    npm start
``` 

## Using Lab 3

To use this lab, you can see the metrics going to this URL :
* [All metrics](http://localhost:8080/metrics)
* [Metrics of user 2](http://localhost:8080/metrics/2)

For the rest of the lab, you should use **Postman**.

#### Get Functions

In **Postman**, you can perform a *GET* to this URL to see all metrics :
```
    http://localhost:8080/metrics
```

then, to see all metrics of user 2, perform a *GET* to :
```
    http://localhost:8080/metrics/2
```

#### Post Functions

In **Postman**, you can perform a *POST* to this URL to post a metric of user 2 :
```
    http://localhost:8080/metrics/2
```
with the following **body** : 
```JSON
[
  { "timestamp":"1384686660000", "value":22 }
]
```

Then you should see the new value with the *GET* function.

#### Delete Functions

then, to delete all metrics of user 2, perform a *DELETE* to :
http://localhost:8080/metrics/2

In **Postman**, you can perform a *DELETE* to this URL to delete all metrics :
http://localhost:8080/metrics/

## Contributors

The authors of this lab are [*Maxime Billette*](https://github.com/Billette), [*Sarah Lehuby*](https://github.com/SarahL24) and [*Amir Messedi*](https://github.com/AmirMessedi)