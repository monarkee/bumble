<?php namespace Monarkee\Bumble\Controllers;

use Monarkee\Bumble\Controllers\BumbleController;
use Monarkee\Bumble\Models\Module;
use Monarkee\Bumble\Models\Component;
use Monarkee\Bumble\Models\ComponentType;
use Monarkee\Bumble\Services\ModuleBuilder;
use Monarkee\Bumble\Services\ComponentBuilder;
use Monarkee\Bumble\Exceptions\ValidationException;
use Input;
use Redirect;
use View;

class ModuleController extends BumbleController
{
    public function __construct(ModuleBuilder $moduleBuilder, ComponentBuilder $componentBuilder)
    {
        $this->moduleBuilder = $moduleBuilder;
        $this->componentBuilder = $componentBuilder;
    }

    public function getIndex()
    {
        $modules = Module::orderBy('sort_order')->get();

        return View::make('bumble::modules.index')->with('modules', $modules);
    }

    public function getEdit($id)
    {
        $module = Module::findorFail($id);

        return View::make('bumble::modules.edit')->with('module', $module);
    }

    public function postEdit($id)
    {
        try {
            $this->moduleBuilder->updateModule($id, Input::all());

            return Redirect::route('bumble_modules')->with('success', 'The module changes have been saved');
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withInput()->withErrors($e->getErrors());
        }
    }

    public function getCreate()
    {
       return View::make('bumble::modules.create');
    }

    public function postCreate()
    {
        try {
            $this->moduleBuilder->createModule(Input::all());

            return Redirect::route('bumble_modules')->with('success', 'Congratulations! Your new module is ready to go.');
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withInput()->withErrors($e->getErrors());
        }
    }

    public function getDelete($id)
    {
        $module = Module::findorFail($id);
        return 'Are you sure?';
    }

    public function postDelete($id)
    {
        $response = Response::make('{\'message\': \'Yes. That worked.\'}', 200);
        $response->header('Content-Type', 'application/json');
        return $response;
    }

    public function getComponents($id)
    {
        $componentTypes = Component::componentTypes();
        $module = Module::findorFail($id);
        $moduleComponents = Component::whereModuleId($module->id)->ordered()->get();

        return View::make('bumble::modules.components')
                   ->with(compact('componentTypes', 'module', 'moduleComponents'));
    }

    public function postComponents($id)
    {
        $module = Module::findorFail($id);

        // This module exists, so let's continue to create the Component
        try {
            $this->componentBuilder->createComponent(Input::all());

            return Redirect::back()->with('success', 'The component was added to the module.');
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withInput()->withErrors($e->getErrors());
        }
    }

    /**
     * Update the component
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function putComponent()
    {
        $component = Component::findorFail(Input::get('id'));

        // This module exists, so let's continue to update the Component
        try {
            $this->componentBuilder->updateComponent(Input::all());

            return Redirect::back()->with('success', 'The component has been updated');
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withInput()->withErrors($e->getErrors());
        }
    }

    public function deleteComponent($id)
    {
        $component = Component::findorFail($id);

        // This module exists, so let's continue to update the Component
        try {
            $this->componentBuilder->deleteComponent($component);

            return Redirect::back()->with('success', 'The component has been deleted.');
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withInput()->withErrors($e->getErrors());
        }
    }
}