import express from 'express'
import request from 'request'

var app = express()
app.use('/load', function(req, res){
    var url = req.url.replace('formpress-production-241c.up.railway.app')
    req.pipe(request(url)).pipe(res)
})

app.listen(4025)