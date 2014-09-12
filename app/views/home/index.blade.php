<h1>{{{ config('company_name') }}}</h1>

<pre>
    Things to note: No resetting is required. Queries are automatically reset
</pre>

<hr>

<?php /*
<h2>Dogs Module</h2>
@foreach (Posts::type('dog')->limit(10)->getItems() as $post)
    <li>{{ $post->get('name') }}</li>
@endforeach
<hr>
*/ ?>

<?php $posts = Posts::type('post')->limit(10); ?>

@if ($posts->hasItems())
<ul>
    @foreach ($posts->getItems() as $post)
    <li>{{ $post->itemCount() }}. <a href="{{ $post->permalink('posts') }}">{{{ $post->get('title') }}} <small>{{ $post->permalink('media') }}</small></a></li>
    @endforeach
</ul>
@endif

<hr>

<?php $tubes = Posts::type('post_type')->where('slug', '=', 'video')->orWhere('slug', '=', 'chat')->limit(2); ?>
<ul>
    @foreach ($tubes->getItems() as $post)
    <li><a href="{{ $post->permalink('post-types') }}">{{{ $post->get('title') }}} <small>{{ $post->permalink('terry') }}</small></a></li>
    @endforeach
</ul>

<hr>

<?php $post = Posts::type('post')->offset(1)->getItem(); ?>
<ul>
@if ($post)
    <li><a href="{{ $post->permalink('posts-types') }}">{{{ $post->get('title') }}} <small>{{ $post->permalink('mast') }}</small></a></li>
</ul>
@endif
