<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use ProcessMaker\PMIO\ApiClient;
use ProcessMaker\PMIO\Client;
use ProcessMaker\PMIO\Configuration;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Register our ProcessMaker.IO Client
        $this->app->singleton(Client::class, function($app) {
            $config = new Configuration();
            $config->setHost(config('sketch.endpoint'));
            $config->setAccessToken(config('sketch.access_token'));
            return new Client(new ApiClient($config));
        });
    }
}
