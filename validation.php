<?php
/**
 * A Validator for system_names
 */
Validator::extend('system_name', function($attribute, $value, $parameters)
{
    return preg_match('`^[a-zA-Z0-9_]{1,}$`', $value);
});