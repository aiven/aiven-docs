const Redis = require('ioredis');
const serviceUri = 'SERVICE_URI';
const redis = new Redis(serviceUri);

redis.set('key', 'hello world');

redis.get('key').then(function (result) {
  console.log(`The value of key is: ${result}`);
  redis.disconnect();
});
