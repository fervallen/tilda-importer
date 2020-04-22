<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;

class OrderController
{
    public function indexAction(): JsonResponse
    {
        return new JsonResponse(['status' => 'ok']);
    }
}
