<?php namespace Monarkee\Bumble\Interfaces;

interface FileFieldInterface extends FieldInterface
{
    public function handleFile($request, $file, $filename);

    public function unlinkFile($filename);
}
