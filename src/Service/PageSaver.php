<?php

namespace App\Service;

use \RuntimeException;
use Symfony\Component\HttpKernel\KernelInterface;
use TildaTools\Tilda\Objects\Page\ExportedPage;

class PageSaver
{
    private string $publicDirectory;

    public function __construct(KernelInterface $kernel)
    {
        $this->publicDirectory = $kernel->getProjectDir() . '/public';
    }

    public function save(ExportedPage $page): void
    {
        if (!$page->html) {
            throw new RuntimeException(sprintf('Page "%s" is empty', $page->filename));
        }
        file_put_contents($this->publicDirectory . '/' . $page->filename, $page->html);
    }
}
