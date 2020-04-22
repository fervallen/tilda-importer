<?php

namespace App\Controller;

use App\Command\Import\PagesCommand;
use App\Command\Import\ProjectStaticCommand;
use App\Command\ImportCommand;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\NullOutput;
use Symfony\Component\HttpFoundation\Response;

class TildaUpdateController
{
    private PagesCommand $pagesCommand;
    private ProjectStaticCommand $projectStaticCommand;

    public function __construct(
        PagesCommand $pagesCommand,
        ProjectStaticCommand $projectStaticCommand
    ) {
        $this->pagesCommand = $pagesCommand;
        $this->projectStaticCommand = $projectStaticCommand;
    }

    public function indexAction(): Response
    {
        $command = new ImportCommand($this->pagesCommand, $this->projectStaticCommand);
        $command->run(new ArrayInput([]), new NullOutput());

        return new Response('Site updated');
    }
}
