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
    $rules = $rules ?: $this->rules;

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
}
