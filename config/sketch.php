<?php
return [
    // The endpoint of processmaker.io to communicate with
    'endpoint' => env('PROCESSMAKERIO_ENDPOINT', 'https://localhost/api/v1'),

    // The access token for the user connecting
    'access_token' => env('PROCESSMAKERIO_ACCESS_TOKEN', ''),

    // The refresh token for the user connecting
    'refresh_token' => env('PROCESSMAKERIO_REFRESH_TOKEN', '')
];