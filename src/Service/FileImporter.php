<?php

namespace App\Service;

use \RuntimeException;
use Symfony\Component\HttpKernel\KernelInterface;
use TildaTools\Tilda\Objects\Asset;

class FileImporter
{
    private string $publicDirectory;

    public function __construct(KernelInterface $kernel)
    {
        $this->publicDirectory = $kernel->getProjectDir() . '/public';
    }

    public function import(Asset $asset, string $directory): void
    {
        $directory = $this->publicDirectory . $directory;
        if (!file_exists($directory) && !mkdir($directory) && !is_dir($directory)) {
            throw new RuntimeException(sprintf('Directory "%s" was not created', $directory));
        }

        $content = file_get_contents($asset->from);
        if (!$content) {
            throw new RuntimeException(sprintf('Asset "%s" is empty', $asset->from));
        }
        file_put_contents($directory . $asset->to, $content);
    }
}
