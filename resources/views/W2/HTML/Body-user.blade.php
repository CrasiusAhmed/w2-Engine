@include('W2.layouts.websiteBuilder')

@if (!empty($userHtml))
    {{-- Display the user's custom HTML content --}}
    <div id="preview-content" class="Body">
        {!! $userHtml !!}

    </div>
    @if (!empty($userCss))
        {{-- Inject the user's custom CSS content --}}
        <style id="dynamic-styles">
            {!! $userCss !!}
        </style>
    @endif
    @include('W2.HTML.Important.Little-Box')
    {{--     @include('W2.HTML.Important.Background-Box') --}}
    @include('W2.HTML.Important.Text-Box')
    @include('W2.HTML.Important.Error-Message')
    @include('W2.HTML.Important.Success-Message')

    @include('W2.HTML.Important.Image-Upload')
    @include('W2.HTML.Important.Video-Upload')
    @include('W2.HTML.Important.Audio-Upload')
@else
    <div id="preview-content" class="Body">

    </div>
    @include('W2.HTML.Important.Little-Box')
    {{--     @include('W2.HTML.Important.Background-Box') --}}
    @include('W2.HTML.Important.Text-Box')
    @include('W2.HTML.Important.Error-Message')
    @include('W2.HTML.Important.Success-Message')

    @include('W2.HTML.Important.Image-Upload')
    @include('W2.HTML.Important.Video-Upload')
    @include('W2.HTML.Important.Audio-Upload')
@endif
