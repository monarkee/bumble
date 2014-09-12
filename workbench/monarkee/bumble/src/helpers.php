<?php

if (!function_exists('slug_case'))
{
    function slug_case($value)
    {
        return ctype_lower($value) ? $value : strtolower(preg_replace('/(.)([A-Z])/', '$1-$2', $value));
    }
}

if (!function_exists('resource_name'))
{
    function resource_name($value)
    {
        return str_plural(slug_case($value));
    }
}

if (!function_exists('model_name'))
{
    function model_name($value)
    {
        return str_singular(studly_case($value));
    }
}

/**
 * Return the active color
 * @param  [type] $boolean [description]
 * @return [type]          [description]
 */
if (!function_exists('active_color'))
{
    function active_color($activeStatus)
    {
        return $activeStatus == 1 ? 'green' : 'red';
    }
}

/**
 * Swap the module separators
 * @param  string $string The string to search
 * @param  string $firstOption The string to be replaced
 * @param  string $secondOption The string to replace with
 * @return string The final string
 */
if (!function_exists('swap_sep'))
{
    function swap_sep($string, $firstOption = '-', $secondOption = '_')
    {
        return str_replace($firstOption, $secondOption, $string);
    }
}

/**
 * Get the module system name
 * @param  string $string The string to search
 * @param  string $firstOption The string to be replaced
 * @param  string $secondOption The string to replace with
 * @return string The final string
 */
if (!function_exists('module_name'))
{
    function module_name($string)
    {
        return str_replace('_', '-', $string);
    }
}

/**
 * Get the database table name for a string
 * @param  string $string The string to search
 * @param  string $firstOption The string to be replaced
 * @param  string $secondOption The string to replace with
 * @return string The final string
 */
if (!function_exists('table_name'))
{
    function table_name($string)
    {
        return str_replace('-', '_', $string);
    }
}

/**
 * Grab a config item from the database
 * @param  string $key The key of the setting to get from the database
 * @param  string $table The table to get the setting from
 * @return mixed The returned value
 */
if (!function_exists('app_config'))
{
    function app_config($key, $table = 'settings')
    {
        try {
            return DB::table($table)->whereKey($key)->pluck('value');
        }
        catch (Exception $e)
        {
            return false;
        }
    }
}

/**
 * Convert Integer Into Human-Readable Active Status
 * @param  string $boolean
 * @return string
 */
if (!function_exists('open_status'))
{
    function published_status($value)
    {
        return (string) $value === '1' ? 'Published' : 'Draft';
    }
}

/**
 * Return Human-Readable Integer Status
 * @param  string $boolean
 * @return string
 */
if (!function_exists('int_column'))
{
    function int_column($value)
    {
        return ($value === (string) '0' || $value === (string) '1') ? true : false;
    }
}

/**
 * Return a Carbon\Carbon version of the provided date
 * @param string $date
 */
if (!function_exists('carbon_date'))
{
    function carbon_date($date)
    {
        return (new \Carbon\Carbon)->createFromTimestamp(strtotime($date));
    }
}

if (!function_exists('timestamp_column'))
{
    function timestamp_column($timestamp)
    {
        $pattern = '/^(((\d{4})(-)(0[13578]|10|12)(-)(0[1-9]|[12][0-9]|3[01]))|((\d{4})(-)(0[469]|1‌​1)(-)([0][1-9]|[12][0-9]|30))|((\d{4})(-)(02)(-)(0[1-9]|1[0-9]|2[0-8]))|(([02468]‌​[048]00)(-)(02)(-)(29))|(([13579][26]00)(-)(02)(-)(29))|(([0-9][0-9][0][48])(-)(0‌​2)(-)(29))|(([0-9][0-9][2468][048])(-)(02)(-)(29))|(([0-9][0-9][13579][26])(-)(02‌​)(-)(29)))(\s([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9]))$/';
        $real_timestamp = preg_match($pattern, $timestamp);

        $re1='(0000)';  # Integer Number 1
        $re2='(-)';   # Any Single Character 1
        $re3='(00)';  # Integer Number 2
        $re4='(-)';   # Any Single Character 2
        $re5='(00)';  # Integer Number 3
        $re6='( )';   # White Space 1
        $re7='(00)';  # Integer Number 4
        $re8='(:)';   # Any Single Character 3
        $re9='(00)';  # Integer Number 5
        $re10='(:)';  # Any Single Character 4
        $re11='(00)'; # Integer Number 6

        $empty_timestamp = preg_match_all ("/".$re1.$re2.$re3.$re4.$re5.$re6.$re7.$re8.$re9.$re10.$re11."/is", $timestamp, $matches);

        if ($empty_timestamp || $real_timestamp) return true;

        return false;
    }
}

/**
 * Get the relationship display value
 */
if (!function_exists('get_relation_display_value'))
{
    function get_relation_display_value($value, $options)
    {
        // UnJSONinfy the $options
        $options = json_decode($options);
        // dd($options);
        return DB::table($options->module)->where('id', '=', $value)->pluck($options->display_column);
    }
}
