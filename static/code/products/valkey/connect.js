const Redis = require('ioredis');
const serviceUri = 'VALKEY_URI';
const redis = new Redis(redisUri);

redis.set('key', 'hello world');

redis.get('key').then(function (result) {
  console.log(`The value of key is: ${result}`);
  redis.disconnect();
});
