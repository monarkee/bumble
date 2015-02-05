<aside class="main-sidebar">
    @if ($sideModels)
    <ul class="side-nav">
        @foreach ($sideModels as $model)
            @unless ($model->isHiddenFromSideNav())
                <li class="side-nav__item"><a href="{{ route(config('bumble.admin_prefix').'.'.$model->getPluralSlug().'.index') }}" class="side-nav__link">{{{ $model->getPluralName() }}}</a></li>
            @endunless
        @endforeach
    </ul>
    @endif
</aside>
