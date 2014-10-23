<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOptionsAndValidationFieldsToComponentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('components', function(Blueprint $table)
        {
            $table->longText('options')->after('description');
            $table->longText('validation')->after('options');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('component', function($table)
        {
            $table->dropColumn('options', 'validation');
        });
	}

}