<aside class="main-sidebar">
    <ul class="side-nav">
        @foreach ($sideModels as $model)
            @unless ($model->isHidden())
                <li class="side-nav__item"><a href="{{ route(Config::get('bumble::admin_prefix').'.'.$model->getPluralSlug().'.index') }}" class="side-nav__link">{{{ $model->getPluralName() }}}</a></li>
            @endunless
        @endforeach
        <li class="side-nav__item"><a href="{{ route('admin.settings.index') }}" class="side-nav__link">Settings</a></li>
    </ul>
</aside>
