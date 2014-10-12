<?php namespace Monarkee\Bumble\Interfaces;

interface FileFieldInterface extends FieldInterface
{
    public function handleFile($request);

    public function removeFile($filename);
}
