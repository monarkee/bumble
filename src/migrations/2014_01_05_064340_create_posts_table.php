<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePostsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('posts', function(Blueprint $table) {
			$table->increments('id');
			$table->string('title');
			$table->string('slug');
            $table->text('excerpt');
			$table->text('content');
			$table->text('quote_source');
			$table->text('content_source');
			$table->string('link');
			$table->string('image');
			$table->string('audio');
			$table->text('video');
			$table->boolean('draft');
			$table->string('type');
			$table->boolean('active');
			$table->datetime('published');
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
		Schema::drop('posts');
	}

}
