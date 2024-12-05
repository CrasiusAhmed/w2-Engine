@extends('W2.layouts.w2')

@section('content')
    <div class="hero">


        <div class="menu-stackflow">
            <div class="f1-stackflow">
                <div class="logo-project">
                    <a href="{{ route('dashboard') }}">
                        <img src="/Images/w2-2.png" alt="">
                    </a>
                </div>

                <div class="pages-name">
                    <h1>Page: Home</h1>
                </div>


                <div class="view">
                    <img src="/Icon/eye.png" alt="">
                </div>
            </div>

            <div class="f2-stackflow">
                <div class="view">
                    <img src="/Icon/computer-laptop-icon.png" alt="Laptop" id="img-full">
                </div>

                <div class="view">
                    <img src="/Icon/copy-icon.png" alt="Copy" id="img-medium">
                </div>

                <div class="view">
                    <img src="/Icon/cell-phone-icon.png" alt="Phone" id="img-small">
                </div>

                <div class="width-height-show">
                    <p id="preview-size-display"><span class="grey">px</span></p>
                </div>
            </div>

            <div class="f3-stackflow">

                <div class="undo" id="undoButton">
                    <img src="/Icon/turn-left-arrow-icon.png" alt="Undo">
                </div>
                <div class="redo" id="redoButton">
                    <img src="/Icon/turn-right-arrow-icon.png" alt="Redo">
                </div>



                <button onclick="savePreviewContent()" class="btn-click">Save</button>

                <div class="coding">
                    <img src="/Icon/code-icon.png" alt="Open Code Menu" id="open-code-menu">
                </div>

                <div class="code-bg hidden" id="code-bg">
                    <div id="code-menu">
                        <div class="tab-menu">
                            <button id="html-tab" class="active">HTML</button>
                            <button id="css-tab">CSS</button>
                        </div>
                        <div class="editor">
                            <textarea id="html-preview" placeholder="HTML Preview"></textarea>
                            <textarea id="css-preview" placeholder="CSS Preview" class="hidden"></textarea>
                        </div>
                        <button id="download-html" class="active">Download HTML</button>
                        <button id="download-css" class="hidden">Download CSS</button>
                    </div>
                </div>



                <div class="important-box">

                    <div class="style-customer">
                        <img src="/Icon/art-icon.png" alt="">
                    </div>

                    <div class="setting">
                        <img src="/Icon/js.png" alt="">
                    </div>

                    <div class="style-customer">
                        <img src="/Icon/threejs.png" alt="">
                    </div>

                    <div class="other-menu">
                        <img src="/Icon/ellipsis-v-icon.png" alt="">

                        <!-- //otherMenu -->

                        <div class="other-setting">
                            <div class="group-f1 b-group-1">
                                <div class="o-s-title">
                                    <h1>View</h1>
                                </div>

                                <div class="flex-sb">
                                    <div class="text-sb">
                                        <h1>Top toolbar</h1>
                                        <p>Access all block and document tools in a single place</p>
                                    </div>

                                </div>

                                <div class="flex-sb">
                                    <div class="text-sb">
                                        <h1>Distraction free</h1>
                                        <p>Write with calmness</p>
                                    </div>

                                    <h1>Ctrl+Shift+\</h1>
                                </div>

                                <div class="flex-sb">
                                    <div class="text-sb">
                                        <h1>Spotlight mode</h1>
                                        <p>Focus on one block at a time</p>
                                    </div>
                                </div>
                            </div>

                            <div class="group-f2 b-group-1">
                                <div class="o-s-title">
                                    <h1>Editor</h1>
                                </div>

                                <div class="flex-sb">
                                    <h1>Visual editor</h1>


                                </div>
                                <div class="flex-sb">
                                    <h1>Code editor</h1>

                                    <h1>Ctrl+Shift+Alt+M</h1>
                                </div>
                            </div>


                            <div class="group-f3 b-group-1">
                                <div class="o-s-title">
                                    <h1>Plugins</h1>
                                </div>

                                <div class="flex-sb">
                                    <h1>Styles</h1>


                                </div>

                            </div>

                            <div class="group-f4 b-group-1">
                                <div class="o-s-title">
                                    <h1>Tools</h1>
                                </div>

                                <div class="flex-sb">
                                    <h1>Keyboard shortcuts</h1>

                                    <h1>Shift+Alt+H</h1>
                                </div>

                                <div class="flex-sb">
                                    <h1>Copy all blocks</h1>
                                </div>
                                <div class="flex-sb">
                                    <h1>Help</h1>


                                </div>

                                <div class="flex-sb">
                                    <div class="text-sb">
                                        <h1>Export</h1>
                                        <p>Download your theme with updated templates and styles.</p>
                                    </div>


                                </div>

                                <div class="flex-sb">
                                    <h1>Welcome Guide</h1>
                                </div>
                            </div>

                            <div class="group-f5">
                                <div class="flex-sb">
                                    <h1 class="m-0">Preferences</h1>
                                </div>
                            </div>
                        </div>

                        <!-- //otherMenu -->
                    </div>
                </div>



            </div>
        </div>


        <div class="show-html">
            <div class="menu-stackflow2">
                <div class="box-add">
                    <img src="/Icon/add.png" alt="">
                </div>

                <div class="box-add2">
                    <img src="/Icon/navigator.png" alt="">
                </div>

                <div class="box-add3">
                    <img src="/Icon/pages.png" alt="">
                </div>

                <div class="box-add4">
                    <img src="/Icon/image-file.png" alt="">
                </div>

                <div class="box-add5">
                    <img src="/Icon/database.png" alt="">
                </div>

                <div class="box-add6">
                    <img src="/Icon/laravel.png" alt="">
                </div>

                <div class="box-add7">
                    <img src="/Icon/css.png" alt="">
                </div>

                <div class="box-add8">
                    <img src="/Icon/js.png" alt="">
                </div>

                <div class="box-add9">
                    <img src="/Icon/threejs.png" alt="">
                </div>

            </div>

            <!-- //box-adding-html -->
            @include('W2.Elements.Element')




            <!-- //body-view-layout -->
            @include('W2.Other.layoutElement')


            <!-- //user-body-show -->
            @include('W2.HTML.Body-user')




            <!-- //styleMenu -->
            @include('W2.Styles.Style')


            <!-- //setting -->
        </div>
    </div>



    {{-- <script>
        function savePreviewContent() {
            const previewContent = document.getElementById('preview-content');

            // Ensure only the inner HTML is saved
            const htmlContent = previewContent.innerHTML;

            // Send AJAX request to save the HTML content
            fetch('/save-html-content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                    body: JSON.stringify({
                        html_content: htmlContent
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Layout saved successfully');
                    }
                })
                .catch(error => console.error('Error saving layout:', error));
        }
    </script> --}}
    <script>
        // ++++++ last updated savePreviewContent
        const projectId = {{ $project->id }};

        /* document.addEventListener('DOMContentLoaded', () => {
            fetch(`/project/${projectId}`)
                .then(response => response.json())
                .then(data => {
                    const previewContent = document.getElementById('preview-content');
                    const styleTag = document.getElementById('dynamic-styles') || document.createElement(
                        'style');

                    // Set up dynamic-styles tag
                    styleTag.id = 'dynamic-styles';
                    if (!styleTag.parentElement) {
                        document.head.appendChild(styleTag);
                    }

                    // Restore the HTML content
                    if (data.html_content) {
                        previewContent.innerHTML = data.html_content;
                    }

                    // Restore the CSS content
                    if (data.css_content) {
                        styleTag.innerHTML = data.css_content;
                    }
                })
                .catch(error => console.error('Error fetching project data:', error));
        }); */

        function savePreviewContent() {
            const previewContent = document.getElementById('preview-content');
            const styleTag = document.getElementById('dynamic-styles');

            if (!previewContent) {
                console.error('Preview content not found!');
                return;
            }

            // Get the inner HTML of previewContent
            const htmlContent = previewContent.innerHTML;

            // Get the CSS content from dynamic-styles
            const cssContent = styleTag ? styleTag.innerHTML : '';

            // Send AJAX request to save the HTML and CSS content
            fetch('/save-html-content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                    body: JSON.stringify({
                        html_content: htmlContent, // Save the preview content
                        css_content: cssContent, // Save the styles
                        project_id: projectId, // Include the project ID
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        displaySuccessMessage('Layout saved successfully!');
                    } else {
                        displayErrorMessage('An error occurred while saving the layout. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error saving layout:', error);
                    displayErrorMessage('An unexpected error occurred. Please check your connection and try again.');
                });
        }


        // Function to display a success message
        function displaySuccessMessage(message) {
            const successElement = document.querySelector('.success-message');
            const successText = successElement.querySelector('h1:nth-of-type(2)'); // Target second <h1> for dynamic message
            successText.innerText = message;
            successElement.classList.remove('none'); // Show success message

            // Hide the success message after 5 seconds
            setTimeout(() => {
                successElement.classList.add('none'); // Hide success message again
            }, 5000);
        }

        // Function to display an error message
        function displayErrorMessage(message) {
            const errorElement = document.querySelector('.error-message');
            errorElement.querySelector('.error-text').innerText = message;
            errorElement.classList.remove('none'); // Show error message

            // Hide the error message after 5 seconds
            setTimeout(() => {
                errorElement.classList.add('none'); // Hide error message again
            }, 5000);
        }
    </script>
@endsection
