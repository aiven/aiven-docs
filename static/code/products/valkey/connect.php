<?php

require 'vendor/autoload.php';
Predis\Autoloader::register();

$service_uri = 'SERVICE_URI';

$client = new Predis\Client($service_uri);

$client->set('key', 'hello world');
$value = $client->get('key');

echo "The value of key is: {$value}";
