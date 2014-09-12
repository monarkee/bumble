@include('themes.includes.header')
    <div id="posts">
        <div class="post text">
            <h2><a href="{{ $page->slug }}">{{ $page->title }}</a></h2>
            @markdown($page->content)
            <div class="post-meta-permalink">
                <p>
                    <a href="{{ $page->slug }}" alt="Permalink">+</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
