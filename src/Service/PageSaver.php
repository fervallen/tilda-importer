<?php

namespace App\Service;

use \RuntimeException;
use Symfony\Component\HttpKernel\KernelInterface;
use TildaTools\Tilda\Objects\Page\ExportedPage;

class PageSaver
{
    private const TILDA_LABEL = '<!-- Tilda copyright. Don\'t remove this line --><div class="t-tildalabel " id="tildacopy" data-tilda-sign="2285060#{{PAGE_ID}}"><a href="https://tilda.cc/?upm=2285060" class="t-tildalabel__link"><div class="t-tildalabel__wrapper"><div class="t-tildalabel__txtleft">Made on </div><div class="t-tildalabel__wrapimg"><img src="/images/tildacopy.png" class="t-tildalabel__img"></div><div class="t-tildalabel__txtright">Tilda</div></div></a></div>';

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

        file_put_contents($this->publicDirectory . '/' . $page->filename, $this->prepareContent($page));
    }

    public function prepareContent(ExportedPage $page): string
    {
        $html = $page->html;
        $tildaLabelHtml = str_replace('{{PAGE_ID}}', $page->id, self::TILDA_LABEL);
        // $html = str_replace($tildaLabelHtml, '', $html);

        return $html;
    }
}
