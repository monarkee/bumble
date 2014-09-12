@include('themes.includes.header')
    <div id="posts">
        @if ($posts)
            @foreach($posts as $post)
                @if ($post->type->slug == 'text')
                <div class="post text">

                    <div class="post-meta-row">
                    @if ($post->tags)
                    <ul class="tags">
                        @foreach ($post->tags as $tag)
                        <li><a href="{{ $tag->id }}" class="tag">{{ $tag->title }}</a></li>
                        @endforeach
                    </ul>
                    @endif

                    <span class="post-meta">{{ $post->type->title }} / {{ $post->created_at }}</span>
                     </div> <!-- /.post-meta-row -->

                    <h2><a href="{Permalink}">{{ $post->title }}</a></h2>

                    @markdown($post->content)

                    <div class="post-meta-permalink"><p><a href="{Permalink}" alt="Permalink">+</a></p></div>  <!-- /.post-meta-permalink -->
                </div> <!-- /.post -->
                @elseif ($post->type->slug == 'link')
                <div class="post link">
                    <div class="post-meta-row">
                        @if ($post->tags)
                        <ul class="tags">
                            @foreach ($post->tags as $tag)
                                <li><a href="{{ $tag->id }}" class="tag">{{ $tag->title }}</a></li>
                            @endforeach
                        </ul>
                        @endif

                        <span class="post-meta">{{ $post->created_at }}</span>

                    </div> <!-- /.post-meta-row -->
                    <h2><a href="{Url}">&#8734; {{ $post->title }}</a></h2>

                    @markdown($post->content)

                    <div class="post-meta-permalink"><a href="Permalink" alt="Permalink">+</a></div>  <!-- /.post-meta-permalink -->
                </div> <!-- /.link -->
                @endif
            @endforeach
        @endif
    </div> <!-- /#posts -->


            <div id="pagination">
                <a id="pag-prev" href="{PreviousPage}">&larr; Previous Page</a>
                <a id="pag-next" href="{NextPage}">Next Page &rarr;</a>
            </div> <!-- /#pagination -->
</body>
</html>
