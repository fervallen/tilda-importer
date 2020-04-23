<?php

namespace App\Command\Import;

use App\Command\AbstractCommand;
use App\Service\FileImporter;
use App\Service\PageSaver;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use TildaTools\Tilda\Objects\Asset;
use TildaTools\Tilda\Objects\Page\ExportedPage;
use TildaTools\Tilda\Objects\Project\ExportedProject;
use App\Service\Tilda;

class PagesCommand extends AbstractCommand
{
    use StaticFilesTrait;

    protected static $defaultName = 'import:pages';
    private ExportedProject $project;
    private FileImporter $fileImporter;
    private PageSaver $pageSaver;
    private Tilda $tilda;

    /**
     * @var ExportedPage[]
     */
    private array $pages = [];

    public function __construct(Tilda $tilda, FileImporter $fileImporter, PageSaver $pageSaver)
    {
        parent::__construct();
        $this->tilda = $tilda;
        $this->fileImporter = $fileImporter;
        $this->pageSaver = $pageSaver;
    }

    protected function execute(InputInterface $input, OutputInterface $output): ?int
    {
        $this->loadInfo();
        $count = count($this->pages);
        $this->output->writeln('Importing ' . $count . ' pages');
        foreach ($this->pages as $page) {
            $this->output->writeln('Importing "' . $page->title . '" page' . "\r");
            $this->importPage($page);
        }

        return 1;
    }

    private function loadInfo(): void
    {
        $this->project = $this->tilda->api->getProjectExport($this->tilda->projectId);
        $pagesList = $this->tilda->api->getPagesList($this->tilda->projectId);
        foreach ($pagesList as $page) {
            $page = $this->tilda->api->getPageFullExport($page->id);
            if ($page->html) {
                $this->pages[] = $page;
            }
        }
    }

    private function importPage(ExportedPage $page): void
    {
        $this->pageSaver->save($page);
        $this->importStaticFiles([
            $this->project->export_imgpath => $page->images,
            $this->project->export_csspath => $page->css,
            $this->project->export_jspath => $page->js,
        ], false);
    }
}
