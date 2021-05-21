const express = require('express')
const serverless = require('serverless-http')
const app = express()
const AWS = require('aws-sdk')

var ddb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

app.use(express.json({limit: '50mb'}));

app.get('/', (req, res) => {
    res.status(200).send({ status: 'OK', message: 'Service working properly' })
})

app.post('/api/architects/createArchitect', (req, res) => {
    let params = {
        TableName: 'TODO-Architecture',
        ReturnConsumedCapacity: 'TOTAL',
        Item: {
            'pk': req.body.name.toUpperCase(),
            'sk': 'USER',
            'timestamp': new Date().toISOString(),
            'lastname': req.body.lastname.toUpperCase(),
            'join_date': new Date().toISOString().slice(0, 10)
        }
    }

    ddb.put(params, function(err, data) {
        if (err) res.status(500).send(err) 
        else    res.status(200).send(data)    
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


module.exports.handler = serverless(app)