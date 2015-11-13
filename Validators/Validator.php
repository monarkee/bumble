<?php

namespace Monarkee\Bumble\Validators;

use Monarkee\Bumble\Exceptions\ValidationException;
use Illuminate\Validation\Factory as LaravelValidator;

abstract class Validator
{
    /**
     * @var LaravelValidator
     */
    protected $validator;

    /**
     * @var array
     */
    protected $rules;

    /**
     * @var
     */
    protected $updateRules;

    public function __construct(LaravelValidator $validator)
    {
        $this->validator = $validator;
    }

    /**
     * Do the validation
     *
     * @param  array $input The input rules
     * @param array  $rules
     * @throws ValidationException
     * @return bool
     */
  public function validate($input, $rules = [])
  {
      $rules = $rules ?: $this->getRules();

      $validator = $this->validator->make($input, $rules);

      if ($validator->fails()) {
          throw new ValidationException($validator->messages(), 'Validation failed.');
      }

      return true;
  }

    /**
     * @return array
     */
    public function getRules()
    {
        return $this->rules;
    }

    /**
     * @param array $rules
     */
    public function setRules($rules)
    {
        $this->rules = $rules;
    }

    /**
     * Validate the model for creation
     *
     * @param $input
     * @return bool
     * @throws ValidationException
     */
    public function validateForCreate($input)
    {
        return $this->validate($input, $this->getRules());
    }

    /**
     *
     *
     * @param $input
     * @return bool
     * @throws ValidationException
     */
    public function validateForUpdate($input)
    {
        return $this->validate($input, $this->getUpdateRules());
    }

    /**
     * @return mixed
     */
    public function getUpdateRules()
    {
        return $this->updateRules;
    }

    /**
     * @param mixed $updateRules
     */
    public function setUpdateRules($updateRules)
    {
        $this->updateRules = $updateRules;
    }
}
