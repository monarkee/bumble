@include('themes.includes.header')
    <div id="posts">
        @if ($posts)
            @foreach($posts as $post)
                <div class="post text">

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

                    <h2><a href="{Permalink}">{{ $post->title }}</a></h2>

                    @markdown($post->excerpt)
                    @markdown($post->content)

                    <div class="post-meta-permalink"><p><a href="{Permalink}" alt="Permalink">+</a></p></div>  <!-- /.post-meta-permalink -->
                </div> <!-- /.post -->
            @endforeach
        @endif
    </div> <!-- /#posts -->


            <div id="pagination">
                <a id="pag-prev" href="{PreviousPage}">&larr; Previous Page</a>
                <a id="pag-next" href="{NextPage}">Next Page &rarr;</a>
            </div> <!-- /#pagination -->
</body>
</html>
