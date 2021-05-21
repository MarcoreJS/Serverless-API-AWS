const express = require('express')
const serverless = require('serverless-http')
const app = express()

app.get('/', function(req, res) {
    res.status(200).send({ status: 'OK', message: 'Service working properly' })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports.handler = serverless(app)