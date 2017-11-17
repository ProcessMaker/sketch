<?php
namespace App;

use ProcessMaker\PMIO\Model\TaskConnectorAttributes;

class ServiceTaskTemplateGenerator
{
    public function generate(TaskConnectorAttributes $data)
    {
        $generator = 'App\ServiceTaskTemplates\\' . $data['connector_class'];
        if(!$generator) {
            throw new \Exception('Unknown Service Task Connector Class: ' . $data['connector_class']);
        }
        $generator = new $generator;
        return $generator->generate($data);
    }


}