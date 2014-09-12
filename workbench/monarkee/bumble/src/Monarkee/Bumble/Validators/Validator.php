<?php namespace Monarkee\Bumble\Validators;

use Monarkee\Bumble\Exceptions\ValidationException;
use Validator as V;

abstract class Validator
{
  /**
   * Do the validation
   * @param  array $input The input rules
   * @return Validator
   */
  public function validate($input, $rules = [])
  {
    $validator = V::make($input, $rules);

    if ($validator->fails()) throw new ValidationException($validator->messages(), 1);

    return true;
  }

  public function validateForCreate($input)
  {
    return $this->validate($input, $this->rules);
  }

  public function validateForUpdate($input)
  {
    return $this->validate($input, $this->updateRules);
  }

  public function createRulesArray($moduleComponents)
  {
    $validationRules = [];

    foreach ($moduleComponents as $component)
    {
        $validationRules[$component->column] = $component->validation_string;
    }

    // Add the 'active' validation to all post validation rulesets by default
    $validationRules['active'] = $this->rules['active'];

    return $validationRules;
  }
}