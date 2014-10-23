<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComponentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('components', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('component_type_id');
            $table->integer('module_id');
            $table->string('name');
            $table->string('column');
            $table->boolean('display_listing');
            $table->boolean('active');
            $table->string('sort_order');
            $table->text('description');
            $table->timestamps();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('components');
	}

}