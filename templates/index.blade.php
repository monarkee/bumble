@foreach (Post::section('blog')->limit(5)->get() as $entry)
    {{ $entry->title }}
    {{ $entry->content }}

    @foreach ($entry->categories as $category )
        {{{ $category->title }}} / {{{ $category->slug }}}
    @endforeach
@endforeach