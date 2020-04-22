<?php

namespace App\Command\Import;

use App\Command\AbstractCommand;
use App\Service\FileImporter;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use TildaTools\Tilda\Objects\Project\ExportedProject;
use App\Service\Tilda;

class ProjectStaticCommand extends AbstractCommand
{
    use StaticFilesTrait;

    protected static $defaultName = 'import:static';
    private ExportedProject $project;
    private FileImporter $fileImporter;
    private Tilda $tilda;

    public function __construct(Tilda $tilda, FileImporter $fileImporter)
    {
        parent::__construct();
        $this->tilda = $tilda;
        $this->fileImporter = $fileImporter;
    }

    protected function execute(InputInterface $input, OutputInterface $output): ?int
    {
        $this->loadInfo();
        $this->importStaticFiles([
            $this->project->export_csspath => $this->project->css,
            $this->project->export_imgpath => $this->project->images,
            $this->project->export_jspath => $this->project->js,
        ]);

        return 1;
    }

    private function loadInfo(): void
    {
        $this->project = $this->tilda->api->getProjectExport($this->tilda->projectId);
    }
}
