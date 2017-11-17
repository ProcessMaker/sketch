<?php
namespace App\ServiceTaskTemplates;

class SendMailConnector {

    public function generate($existingData)
    {
        return [
            'type' => 'tasks.Service',
            'connector_class' => 'SendMailConnector',
            'title' => 'Send E-Mail',
            'connector_class' => 'SendMailConnector',
            'icon' => '/icons/mail.png',
            'description' => 'Send an e-mail to a specified recipient and with content',
            'type' => 'tasks.Service',
            'formConfig' => [
                [
                    'type' => 'help',
                    'text' => 'The SendMailConnector sends mail to a target email address. The subject and message template uses data model replacements, specifying what to insert into the message with curly braces.'
                ],
                [
                    'type' => 'text',
                    'name' => 'to',
                    'label' => 'Recipient Email Address',
                    'value' => isset($existingData['input_parameters']['to']) ? $existingData['input_parameters']['to'] : ''
                ],
                [
                    'type' => 'text',
                    'name' => 'name',
                    'label' => 'Sender Name',
                    'placeholder' => 'Name the email will appear from',
                    'value' => isset($existingData['input_parameters']['name']) ? $existingData['input_parameters']['name'] : ''
                ],
                [
                    'type' => 'text',
                    'name' => 'subj',
                    'label' => 'Email Subject Line',
                    'value' => isset($existingData['input_parameters']['subj']) ? $existingData['input_parameters']['subj'] : ''
                ],
                [
                    'type' => 'textarea',
                    'name' => 'message',
                    'label' => 'Message Template',
                    'value' => isset($existingData['input_parameters']['body']) ? $existingData['input_parameters']['body'] : ''
                ]
            ]

        ];

    }
}