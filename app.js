require('module-alias/register');

const TARGET = require('@config/target_server.json');
const { ZINCRBY } = require('@config/redis_const');
const { WARNINGDOMAIN } = require('@config/warningDomain');

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

const express = require('express');
const app = express();
const logger = require('morgan');

const redis = require('redis');
const redisCountClient = redis.createClient(require('@config/redisClient').redisCacheServer);
redisCountClient.select(0, err => {
  if (err) {
    return ;
  }
  console.log('redisCount DB0 selected');
})

proxy.on('error', err => {
  console.log(err);
});

app.use(logger('dev'));

app.use('/', (req, res) => {
  const domain = req.headers.host;
  const url = req.url;

  for(let i in WARNINGDOMAIN) {
    if(domain == WARNINGDOMAIN[i]) {
      console.log('유해사이트');
      res.send('YOU CANT ACCESS ' + domain);
    }
  }

  if(url === '/favicon.ico') {
    console.log('favicon required');
  } else {
    console.log('Domain:',domain);
    redisCountClient.ZINCRBY(ZINCRBY.KEY, ZINCRBY.INCREMENT, domain, (err, results) => {
      if(err) {
        console.log('Redis Get Error');
      }else {
        console.log('SUCCESS', domain, results);
      }
    })
    proxy.web(req, res, TARGET);
  }
  res.send('hi');
})

module.exports = app;

/**
  proxy.on('proxyReq', (proxyReq, req, res, options) => {
  proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});
app.use('/favicon.ico', function(req,res,next){
  res.redirect('https://i.ytimg.com/vi/frrBSyEqS6c/maxresdefault.jpg');
})

 */