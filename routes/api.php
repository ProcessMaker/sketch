<?php

use Illuminate\Http\Request;
use ProcessMaker\PMIO\Client;
use ProcessMaker\PMIO\ObjectSerializer;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/processes', function (Client $client, Request $request) {
    $processes = $client->listProcesses();
    return response()->json(ObjectSerializer::sanitizeForSerialization($processes));
});

Route::get('/processes/{id}', function(Client $client, Request $request, $id) {
    $data = [];
    // First, gather all events
    $events = $client->listEvents($id)->getData();
    foreach($events as $event) {
        $attributes = $event->getAttributes();
        $title = ucfirst(strtolower($attributes->getType()));
        $data[$event->getId()] = [
            'title' => $title . ' Event',
            'name' => $attributes->getName(),
            'type' => 'events.'. $title,
            'connections' => []
        ];
    }
    return response()->json($data);

});
