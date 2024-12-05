<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}"> <!-- CSRF token for AJAX requests -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Website Builder</title>
</head>

<style>
    #tag-name-display {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px;
        font-size: 12px;
        border-radius: 3px;
        display: none;
        /* Hidden by default */
    }
</style>

<body> <!-- Unique class for website builder body -->




    <!-- Div to display the tag name and class name when hovering/selected -->





    <!-- Include the user's custom HTML here -->
    {{--     {!! $userHtml !!}

    <textarea id="layoutEditor" style="width:100%; height:200px;">
        {!! htmlspecialchars($userHtml) !!} <!-- Show user's custom HTML in the editor -->
    </textarea>

    <button id="saveLayoutButton">Save Layout</button>

    <script>
        document.getElementById('saveLayoutButton').addEventListener('click', function() {
            let htmlContent = document.getElementById('layoutEditor').value;

            fetch('/save-layout', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ html_content: htmlContent })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Layout saved successfully!');
                } else {
                    alert('Failed to save layout.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while saving the layout.');
            });
        });
    </script> --}}


</body>

</html>
