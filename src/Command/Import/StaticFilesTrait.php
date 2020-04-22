<?php

namespace App\Command\Import;

use App\Command\AbstractCommand;
use App\Service\FileImporter;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use TildaTools\Tilda\Objects\Asset;
use TildaTools\Tilda\Objects\Project\ExportedProject;
use App\Service\Tilda;

/**
 * @property FileImporter $fileImporter
 * @property OutputInterface $output
 */
trait StaticFilesTrait
{
    protected function importStaticFiles($staticFiles, bool $output = true): void
    {
        foreach ($staticFiles as $path => $assetGroup) {
            $count = count($assetGroup);
            if ($count) {
                if ($output) {
                    $this->output->writeln('Importing ' . $count . ' ' . $path . ' files');
                    $progressBar = new ProgressBar($this->output, $count);
                    $progressBar->start();
                }
                /** @var Asset[] $assetGroup */
                foreach ($assetGroup as $asset) {
                    $this->fileImporter->import($asset, $path);
                    if ($output) {
                        $progressBar->advance();
                    }
                }
                if ($output) {
                    $progressBar->finish();
                    $this->output->writeln("\r\n");
                }
            }
        }
    }
}
