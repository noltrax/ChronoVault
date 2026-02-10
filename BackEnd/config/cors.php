<?php
return [
    'paths' => ['*'],
    'allowed_methods'   => ['*'],
    'allowed_origins'   => [
        'https://medlabs.circleone.tech',
        'http://localhost:3000',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers'   => ['*'],
    'exposed_headers'   => [],
    'max_age'           => 3600,
    'supports_credentials' => false,
];
