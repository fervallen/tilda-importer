<?php

namespace App\Service;

use \RuntimeException;
use Symfony\Component\HttpKernel\KernelInterface;
use TildaTools\Tilda\Objects\Asset;

class FileImporter
{
    private const TILDA_INCORRECT_PATH_MASK = '/https:\/\/tilda\.ws\/project(\d+)\/tilda-blocks-([0-9.]+)(js|css)/';
    private string $publicDirectory;

    public function __construct(KernelInterface $kernel)
    {
        $this->publicDirectory = $kernel->getProjectDir() . '/public';
    }

    public function import(Asset $asset, string $directory): void
    {
        $directoryPath = $this->publicDirectory;
        if (!preg_match(self::TILDA_INCORRECT_PATH_MASK, $asset->from) &&
            (strpos($asset->to, $directory) !== 0)
        ) {
            $directoryPath .= $directory;
        }
        if (!file_exists($directoryPath) && !mkdir($directoryPath) && !is_dir($directoryPath)) {
            throw new RuntimeException(sprintf('Directory "%s" was not created', $directoryPath));
        }

        $content = file_get_contents($asset->from);
        if (!$content) {
            throw new RuntimeException(sprintf('Asset "%s" is empty', $asset->from));
        }
        file_put_contents($directoryPath . $asset->to, $content);
    }
}
