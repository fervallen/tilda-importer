<?php

namespace App\Command;

use App\Command\Import\PagesCommand;
use App\Command\Import\ProjectStaticCommand;
use DateTime;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ImportCommand extends AbstractCommand
{
    /**
     * @var string
     */
    protected static $defaultName = 'import';
    private PagesCommand $pagesCommand;
    private ProjectStaticCommand $projectStaticCommand;
    private DateTime $startedAt;

    public function __construct(
        PagesCommand $pagesCommand,
        ProjectStaticCommand $projectStaticCommand
    ) {
        parent::__construct();
        $this->pagesCommand = $pagesCommand;
        $this->projectStaticCommand = $projectStaticCommand;
    }

    protected function configure(): void
    {
        $this->setDescription('Import everything from Tilda')
            ->setHelp('Downloads html and assets from Tilda');
    }

    public function initialize(InputInterface $input, OutputInterface $output): void
    {
        parent::initialize($input, $output);
        $this->startedAt = new DateTime();
        $this->displayStartMessage();
    }

    private function displayStartMessage(): void
    {
        $this->output->writeln([
            $this->getDescription(),
            $this->startedAt->format('Y-m-d H:m:i'),
            '============================',
            '',
        ]);
    }

    protected function execute(InputInterface $input, OutputInterface $output): ?int
    {
        $this->projectStaticCommand->initialize($input, $output);
        $this->projectStaticCommand->execute($input, $output);
        $this->pagesCommand->initialize($input, $output);
        $this->pagesCommand->execute($input, $output);
        $this->displayFinishMessage();

        return 0;
    }

    private function displayFinishMessage(): void
    {
        $finishedAt = new  DateTime();
        $interval = $finishedAt->diff($this->startedAt);
        $this->output->writeln([
            '',
            'Finished at: ' . $finishedAt->format('Y-m-d H:m:i'),
            'Total time: ' . $interval->m . ' minutes, ' . $interval->s . ' seconds',
        ]);
    }
}
