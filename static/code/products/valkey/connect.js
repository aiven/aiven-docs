const Valkey = require('ioredis');
const serviceUri = 'SERVICE_URI';
const valkey = new Valkey(serviceUri);

valkey.set('key', 'hello world');

valkey.get('key').then(function (result) {
  console.log(`The value of key is: ${result}`);
  valkey.disconnect();
});
