<div class="box-adding-assets">
    <div class="f1-assets m-b-5">
        <div class="flex-sb-align">
            <h1 class="f-s-20">Assets</h1>

            <img class="small-img open-menu-all-assets p-10" src="/Icon/menu-open.png" alt="">
        </div>


        <div class="flex-sb-align">
            <p>All Assets</p>

            <div class="flex-align">
                <img class="small-img close-little-menu p-10" src="/Icon/new-folder.png" alt="">

                <img id="upload-trigger" class="small-img close-little-menu p-10" src="/Icon/upload.png" alt="Upload">
                <input type="file" id="file-upload" class="file-input" accept="image/*,video/*,audio/*" hidden>
            </div>
        </div>


    </div>

    <div class="f1-assets2 p-b-5">
        <div class="search">
            <input type="search" name="" id="" placeholder="Search">
        </div>
    </div>

    <div class="menu-box-assets {{ $uploadedFiles->isEmpty() ? '' : 'none' }}">
        <div class="select-assets">
            <img class="big-img m-tb-10" src="/Icon/add-image.png" alt="">
            <h1>Drop files here</h1>
            <p>Drag and drop files anywhere on the screen, or click the upload button above.</p>
        </div>
    </div>
    
    <div class="assets-grid">
        @foreach ($uploadedFiles as $file)
            <div class="asset-item">
                @if ($file->type === 'image')
                    <img src="{{ asset('storage/' . $file->path) }}" alt="{{ $file->name }}" class="asset-preview">
                @elseif ($file->type === 'video')
                    <video controls>
                        <source src="{{ asset('storage/' . $file->path) }}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                @elseif ($file->type === 'audio')
                    <audio controls>
                        <source src="{{ asset('storage/' . $file->path) }}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                @endif
            </div>
        @endforeach
    </div>






</div>

<div class="menu-all-assets none">
    <div class="f1-add">
        <div class="flex-align gap10">

            <div class="flex-align">
                <img class="small-img close-menu-all-assets p-10" style="pointer-events: auto;" src="/Icon/icons8-arrow-96.png" alt="">
            </div>
            <p>All Assets</p>
        </div>
    </div>

    <div class="f1-assets2 p-b-5">
        <div class="search">
            <input type="search" name="" id="" placeholder="Search">
        </div>
    </div>


    <div class="assets-grid p-assets">
        @foreach ($uploadedFiles as $file)
            <div class="asset-item">
                @if ($file->type === 'image')
                    <img src="{{ asset('storage/' . $file->path) }}" alt="{{ $file->name }}" class="asset-preview">
                @elseif ($file->type === 'video')
                    <video controls>
                        <source src="{{ asset('storage/' . $file->path) }}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                @elseif ($file->type === 'audio')
                    <audio controls>
                        <source src="{{ asset('storage/' . $file->path) }}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                @endif
            </div>
        @endforeach
    </div>
</div>
