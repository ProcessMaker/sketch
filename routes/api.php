<?php

use Illuminate\Http\Request;
use ProcessMaker\PMIO\Client;
use ProcessMaker\PMIO\ObjectSerializer;
use App\ServiceTaskTemplateGenerator;

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

Route::get('/processes/{id}', function(ServiceTaskTemplateGenerator $generator, Client $client, Request $request, $id) {
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
    // Need to now fetch tasks
    $tasks = $client->listTasks($id)->getData();
    foreach($tasks as $task) {
        $attributes = $task->getAttributes();
        $type = $attributes->getType();
        if($type == 'SERVICE-TASK') {
            // Then we're a service task and we need to get it's connector information as well
            $connectors = $client->listTaskConnectors($id, $task->getId())->getData();
            // However, we're only getting the first
            $connector = $connectors[0];
            // So now we have the first connector, so let's build the data element.
            $data[$task->getId()] = $generator->generate($connector->getAttributes());
        }
    }
    // Now need to fetch gateways
    /**
     * @todo Handle gateways
     */
    // Now need to fetch flows
    $flows = $client->listFlows($id)->getData();
    foreach($flows as $flow) {
        $attributes = $flow->getAttributes();
        $type = $attributes->getType();
        switch($type) {
            case 'SEQUENTIAL':
                $data[$attributes->getFromObjectId()]['connections'][] = $attributes->getToObjectId();
                break;
            default:
                throw new \Exception('Unsupported flow type: ' . $type);
        }
    }
    return response()->json($data);

});
