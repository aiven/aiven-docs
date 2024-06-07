<?php

require 'vendor/autoload.php';
Predis\Autoloader::register();

$service_uri = 'VALKEY_URI';

$client = new Predis\Client($valkey_uri);

$client->set('key', 'hello world');
$value = $client->get('key');

echo "The value of key is: {$value}";
