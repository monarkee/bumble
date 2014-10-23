<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateModulesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('modules', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('name');
            $table->string('system_name');
            $table->string('sort_column');
            $table->string('sort_order');
            $table->text('description');
            $table->integer('active');
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
		Schema::drop('modules');
	}

}