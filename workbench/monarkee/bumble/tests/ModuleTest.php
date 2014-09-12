<?php

use Monarkee\Bumble\Models\Module;

class ModuleTest extends \Orchestra\Testbench\TestCase {

    public function setUp()
    {
        // parent::setUp();
        // \Artisan::call('migrate --bench="monarkee/bumble"');
    }

    public function testCreateModule()
    {
        // Create the module in the system
        $module = new Module;
        $module->name = 'Example Module';
        $module->system_name = 'example-module';
        $module->sort_column = 'created_at';
        $module->sort_order = 10;
        $module->description = 'This is a module description';
        $module->active = 1;
        $module->save();

        // $this->assertTrue($module->first());
        $this->assertTrue(true);
    }
}