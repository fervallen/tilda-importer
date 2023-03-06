<?php

namespace App\Service;

use \ErrorException;
use \RuntimeException;
use Symfony\Component\HttpKernel\KernelInterface;
use TildaTools\Tilda\Objects\Asset;

class FileImporter
{
    private const TILDA_INCORRECT_PATH_MASK = '/https:\/\/tilda\.ws\/project(\d+)\/tilda-blocks-([0-9.]+)(js|css)/';
    private const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0';
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

        set_error_handler(static function($errno, $errstr, $errfile, $errline) {
            if (strpos($errstr, '401 Unauthorized') !== false) {
                return false;
            }

            throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
        });

        $curlHandle=curl_init();
        curl_setopt($curlHandle, CURLOPT_URL, $asset->from);
        curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curlHandle, CURLOPT_USERAGENT, self::DEFAULT_USER_AGENT);
        $content = curl_exec($curlHandle);
        curl_close($curlHandle);
        restore_error_handler();

        if ($content) {
            file_put_contents($directoryPath . $asset->to, $content);

            // It's ok if some file is missing
            // throw new RuntimeException(sprintf('Asset "%s" is empty', $asset->from));
        }
    }
}
