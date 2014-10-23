<?php namespace Monarkee\Bumble\Validators;

use Illuminate\Validation\Factory as LaravelValidator;
use Monarkee\Bumble\Exceptions\ValidationException;

abstract class Validator
{
    /**
     * @var LaravelValidator
     */
    private $validator;

    public function __construct(LaravelValidator $validator)
    {
        $this->validator = $validator;
    }

  /**
   * Do the validation
   * @param  array $input The input rules
   * @return bool
   */
  public function validate($input, $rules = [])
  {
    $rules = $rules ?: $this->rules;

    $validator = $this->validator->make($input, $rules);

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
