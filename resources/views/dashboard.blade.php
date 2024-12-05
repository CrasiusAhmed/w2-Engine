@extends('layouts.app')

@section('dashboard')
    <div class="hero-dashboard">

        <div class="header">
            <div class="b-flex">
                <div class="logo">
                    <img src="/Images/w2-2.png" alt="">
                </div>

                <form method="POST" action="{{ route('logout') }}">
                    @csrf

                    <div class="flex-align gap30">
                        <div class="dashboard-button">
                            <button :href="route('logout')"
                                onclick="event.preventDefault(); this.closest('form').submit();">
                                Logout
                            </button>

                        </div>


                        <h1 class="f-s-20">Ahmed</h1>
                    </div>
                </form>
            </div>

        </div>

        <div class="main-dashboard">
            <div class="flex align-s gap30 width100">
                <div class="box-left-dashboard">

                    <h1 class="f-s-20 m-l-20">Ahmed Workspace</h1>

                    <div class="flex-col align-s m-l-20 gap20">
                        <div class="flex-align gap10 project-feature">
                            <img class="normal-img" src="/Images/w2-2.png" alt="">
                            <h1>All Website</h1>
                        </div>

                        <div class="flex-align gap10 images-feature">
                            <img class="normal-img" src="Icon/image-file.png" alt="">
                            <h1>All Image</h1>
                        </div>


                        <div class="templates">
                            <div class="line-templates"></div>
                            <div class="flex-sb-align templates-feature">
                                <div class="flex-align gap10">
                                    <img class="normal-img" src="Icon/art-icon.png" alt="">
                                    <h1>Templates</h1>

                                </div>

                                <img class="normal-img m-r-30" src="Icon/icons8-arrow-down-96.png" alt="">
                            </div>

                            <div class="flex-col m-t-10 gap20 ">
                                <div class="flex-align gap10 your-templates-feature">
                                    <div class="simple-div" style="width: 32px; height: 32px;"></div>
                                    <p>Your Templates</p>
                                </div>

                                <div class="flex-align gap10 w2-templates-feature">
                                    <div class="simple-div" style="width: 32px; height: 32px;"></div>
                                    <p>From w2</p>
                                </div>

                                <div class="flex-align gap10 users-templates-feature">
                                    <div class="simple-div" style="width: 32px; height: 32px;"></div>
                                    <p>From Users</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex-align gap10 laravel-feature">
                            <img class="normal-img" src="Icon/laravel.png" alt="">
                            <h1>Laravel Package</h1>
                        </div>
                    </div>
                </div>

                <div class="box-item-website">

                    <!-- Prompt Modal -->
                    <div id="promptModal" class="modal">
                        <div class="modal-content">
                            <h2>Enter Project Name</h2>
                            <input type="text" id="projectNameInput" placeholder="Project Name" />
                            <div class="modal-actions">
                                <button id="promptCancel">Cancel</button>
                                <button id="promptConfirm">Create</button>
                            </div>
                        </div>
                    </div>

                    <!-- Alert Modal -->
                    <div id="alertModal" class="modal">
                        <div class="modal-content">
                            <h2 id="alertMessage">Alert Message</h2>
                            <button id="alertClose">Close</button>
                        </div>
                    </div>

















                    <div class="grid-3x-website gap30">
                        <div class="bx-website">
                            <img class="position-center big-img" src="Icon/add.png" alt="">

                            <div class="title-bottom-w2">
                                <h1>Create Website</h1>
                            </div>
                        </div>
                        @foreach ($userTemplates as $template)
                            <div class="create-website" data-template-id="{{ $template->id }}">
                                <div class="flex-sb-align">
                                    <div class="simple-div" style="width: 32px; height: 32px;"></div>
                                    <img class="normal-img position-r m-r-10 delete-icon"
                                        style="z-index: 1; cursor: pointer;" src="Icon/garbage.png" alt="Delete"
                                        onclick="deleteProject({{ $template->id }})">
                                </div>
                                <div class="center-website">
                                    <img class="position-center big-img" src="/Images/w2-2.png" alt="Project Image">
                                    <button class="btn-go-to-project none"
                                        onclick="location.href='/project/{{ $template->id }}'">Go to Project</button>
                                </div>
                                <div class="title-bottom-w2">
                                    <h1>Project: {{ $template->project_name }}</h1>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>


                {{--  <div class="box-item-images none">
                    <div class="grid-3x-images gap30">
                        <div class="bx-images">
                            <img class="position-center big-img" src="Icon/upload.png" alt="">

                            <div class="title-bottom-w2">
                                <h1>Upload Image</h1>
                            </div>
                        </div>


                    </div>
                </div> --}}


                <!-- Modal Structure -->
                {{-- <div id="image-modal" class="modal-overlay2 none">
                    <div class="modal-container2">
                        <img id="modal-image" class="modal-image" src="" alt="Full-Size Image">
                        <div class="modal-details">
                            <p id="image-name">Name: </p>
                            <p id="image-size">Size: </p>
                        </div>
                        <button class="modal-close2" onclick="closeImageModal()">Close</button>
                    </div>
                </div> --}}

                <div id="image-modal" class="modal-overlay2 none">
                    <div class="modal-container2">
                        <img id="modal-image" class="modal-image" src="" alt="Full-Size Image">
                        <video id="modal-video" class="modal-video" controls style="display:none"></video>
                        <audio id="modal-audio" class="modal-audio" controls style="display:none"></audio>
                        <div class="modal-details">
                            <p id="image-name">Name: </p>
                            <p id="image-size">Size: </p>
                        </div>
                        <button class="modal-close2" onclick="closeFileModal()">Close</button>
                    </div>
                </div>


                <div class="box-item-images none">
                    <div class="grid-3x-images gap30">
                        <div class="bx-images upload-area">
                            <label for="image-upload" class="upload-label">
                                <div class="upload-container">
                                    <img class="position-center big-img" src="Icon/upload.png" alt="Upload">
                                    <h1>Click or Drag to Upload</h1>
                                </div>
                            </label>
                            <input type="file" id="file-upload" class="file-input" accept="image/*,video/*,audio/*"
                                hidden>
                        </div>

                        {{-- last update --}}
                        {{-- @foreach ($images as $image)
                            <div class="create-images-users" data-image-id="{{ $image->id }}">
                                <div class="flex-sb-align">
                                    <div class="simple-div" style="width: 32px; height: 32px;"></div>
                                    <img class="normal-img m-r-10 delete-icon2" src="Icon/garbage.png" alt="Delete"
                                        onclick="deleteImage({{ $image->id }})">
                                </div>
                                <div class="center-image">
                                    <img src="{{ asset('storage/' . $image->path) }}" alt="Uploaded Image"
                                        onclick="openImageModal('{{ asset('storage/' . $image->path) }}', '{{ $image->name }}', {{ $image->size }})">
                                </div>
                            </div>
                        @endforeach --}}

                        @foreach ($images as $image)
                            <div class="create-files-users" data-file-id="{{ $image->id }}"
                                data-file-size="{{ $image->size }}">
                                <div class="flex-sb-align">
                                    <div class="simple-div" style="width: 32px; height: 32px;"></div>
                                    <img class="normal-img m-r-10 delete-icon2" src="Icon/garbage.png" alt="Delete"
                                        onclick="deleteFile({{ $image->id }})">
                                </div>
                                <div class="center-file">
                                    @if ($image->type === 'image')
                                        <img src="{{ asset('storage/' . $image->path) }}" alt="Uploaded Image"
                                            onclick="openFileModal('{{ asset('storage/' . $image->path) }}', '{{ $image->name }}', {{ $image->size }})">
                                    @elseif ($image->type === 'video')
                                        <video controls>
                                            <source src="{{ asset('storage/' . $image->path) }}" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                    @elseif ($image->type === 'audio')
                                        <audio controls>
                                            <source src="{{ asset('storage/' . $image->path) }}" type="audio/mpeg">
                                            Your browser does not support the audio element.
                                        </audio>
                                    @endif
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>

                <div class="box-item-templates none">
                    <div class="grid-3x-templates gap30">
                        <div class="bx-templates">

                        </div>
                        <div class="bx-templates"></div>
                        <div class="bx-templates"></div>
                    </div>
                </div>

                <div class="box-item-owner none">
                    <div class="flex-sb-align gap30">
                        <div class="bx-owner">

                        </div>
                        <div class="bx-owner"></div>
                        <div class="bx-owner"></div>
                    </div>
                </div>

                <div class="box-item-w2 none">
                    <div class="flex-sb-align gap30">
                        <div class="bx-w2">

                        </div>
                        <div class="bx-w2"></div>
                        <div class="bx-w2"></div>
                    </div>
                </div>



                <div class="box-item-users none">
                    <div class="flex-sb-align gap30">
                        <div class="bx-users">

                        </div>
                        <div class="bx-users"></div>
                        <div class="bx-users"></div>
                    </div>
                </div>


                <div class="box-item-laravel none">
                    <div class="select-assets">
                        <img class="big-img m-tb-10" src="Icon/Laravel.png" alt="">

                        <h1>Coming Soon</h1>

                        <p>We just finish w2 project this is starting and we will update more about all feature if we get
                            more support from users.</p>
                    </div>
                </div>
            </div>
        </div>



    </div>
@endsection
