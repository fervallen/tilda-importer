<?php

namespace App\Service;

use TildaTools\Tilda\TildaApi;

class Tilda
{
    public TildaApi $api;
    public int $projectId;

    public function __construct(
        string $apiPublicKey,
        string $apiSecretKey,
        string $projectId
    ) {
        $this->api = new TildaApi([
            TildaApi::CONFIG_OPTION_PUBLIC_KEY => $apiPublicKey,
            TildaApi::CONFIG_OPTION_SECRET_KEY => $apiSecretKey,
        ]);
        $this->projectId = (int) $projectId;
    }
}
