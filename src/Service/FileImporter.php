<?php

namespace App\Service;

use ErrorException;
use \RuntimeException;
use Symfony\Component\HttpKernel\KernelInterface;
use TildaTools\Tilda\Objects\Asset;

class FileImporter
{
    private const TILDA_INCORRECT_PATH_MASK = '/https:\/\/tilda\.ws\/project(\d+)\/tilda-blocks-([0-9.]+)(js|css)/';
    private string $publicDirectory;

    public function __construct(KernelInterface $kernel)
    {
        $this->publicDirectory = $kernel->getProjectDir() . '/public/';
    }

    public function import(Asset $asset, string $directory): void
    {
        $directoryPath = $this->publicDirectory;
        var_dump($asset->to);
        if (!preg_match(self::TILDA_INCORRECT_PATH_MASK, $asset->from) &&
            (strpos($asset->to, $directory) !== 0)
        ) {
            $directoryPath .= $directory;
        }
        if (!file_exists($directoryPath) && !mkdir($directoryPath) && !is_dir($directoryPath)) {
            throw new RuntimeException(sprintf('Directory "%s" was not created', $directoryPath));
        }

        set_error_handler(static function($errno, $errstr, $errfile, $errline) {
            if (strpos($errstr, '401 Unauthorized') !== false) {
                return false;
            }

            throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
        });
        $content = file_get_contents($asset->from);
        restore_error_handler();

        if ($content) {
            file_put_contents($directoryPath . $asset->to, $content);

            // It's ok if some file is missing
            // throw new RuntimeException(sprintf('Asset "%s" is empty', $asset->from));
        }
    }
}
