document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.flex-gap10').forEach(function(containerElement) {
        let rangeElement = containerElement.querySelector('.range');
        
        if (rangeElement) {
            let rangeInput = rangeElement.querySelector('.customRange');
            let circle = rangeElement.querySelector('.circle-range');
            let line = rangeElement.querySelector('.line-range');
            let h1ElementTopBottom = containerElement.querySelector('.padding-top-bottom');
            let h1ElementLeftRight = containerElement.querySelector('.padding-left-right');
            let unitSelect = containerElement.querySelector('.select-layout2');
            const previewContent = document.getElementById('preview-content');

            // Define the min and max values for each unit
            const unitLimits = {
                px: { min: 0, max: 300 },
                '%': { min: 0, max: 100 },
                em: { min: 0, max: 10 },
                rem: { min: 0, max: 10 },
                vw: { min: 0, max: 100 },
                vh: { min: 0, max: 100 }
            };

            // Update the circle position based on the input value
            function updateCirclePosition() {
                let value = rangeInput.value;
                let max = rangeInput.max;

                // Calculate the percentage of the input's value relative to its max value
                let percentage = value / max;

                // Calculate the position in pixels
                let position = percentage * line.clientWidth;

                // Update the position of the circle
                circle.style.left = position + 'px';
            }

            // Function to update padding-top and padding-bottom
            function updatePaddingTopBottom() {
                let value = rangeInput.value;
                let selectedUnit = unitSelect.value;
            
                // Update the h1 text for padding-top and padding-bottom
                if (h1ElementTopBottom) {
                    h1ElementTopBottom.textContent = value;
                }

                // Adjust padding-top and padding-bottom dynamically
                let styleElement = document.getElementById('dynamic-padding-style-top-bottom');
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.id = 'dynamic-padding-style-top-bottom';
                    document.head.appendChild(styleElement);
                }

                // Update padding-top and padding-bottom based on the input values
                styleElement.textContent = `
                    #preview-content {
                        padding-top: ${value}${selectedUnit};
                        padding-bottom: ${value}${selectedUnit};
                    }
                `;
            }

            // Function to update padding-left and padding-right
            function updatePaddingLeftRight() {
                let value = rangeInput.value;
                let selectedUnit = unitSelect.value;
            
                // Update the h1 text for padding-left and padding-right
                if (h1ElementLeftRight) {
                    h1ElementLeftRight.textContent = value;
                }

                // Adjust padding-left and padding-right dynamically
                let styleElement = document.getElementById('dynamic-padding-style-left-right');
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.id = 'dynamic-padding-style-left-right';
                    document.head.appendChild(styleElement);
                }

                // Update padding-left and padding-right based on the input values
                styleElement.textContent = `
                    #preview-content {
                        padding-left: ${value}${selectedUnit};
                        padding-right: ${value}${selectedUnit};
                    }
                `;
            }

            // Update the range input's min, max, and value based on the selected unit
            unitSelect.addEventListener('change', function () {
                let selectedUnit = unitSelect.value;
                rangeInput.min = unitLimits[selectedUnit].min;
                rangeInput.max = unitLimits[selectedUnit].max;
                rangeInput.value = unitLimits[selectedUnit].min; // Reset to min value
                updateCirclePosition();
                
                if (h1ElementTopBottom) {
                    updatePaddingTopBottom();
                }
                if (h1ElementLeftRight) {
                    updatePaddingLeftRight();
                }
            });

            // Add event listener to update the circle's position and padding when the range input changes
            rangeInput.addEventListener('input', function () {
                updateCirclePosition();
                
                if (h1ElementTopBottom) {
                    updatePaddingTopBottom();
                }
                if (h1ElementLeftRight) {
                    updatePaddingLeftRight();
                }
            });

            // Optional: Update position on click
            line.addEventListener('click', function (event) {
                let rect = line.getBoundingClientRect();
                let clickPosition = event.clientX - rect.left;

                // Update the range input value based on the click position
                let newValue = Math.round((clickPosition / line.clientWidth) * rangeInput.max);
                rangeInput.value = newValue;

                // Update the circle position and padding after setting the new value
                updateCirclePosition();
                
                if (h1ElementTopBottom) {
                    updatePaddingTopBottom();
                }
                if (h1ElementLeftRight) {
                    updatePaddingLeftRight();
                }
            });

            // Initial position when the page loads
            updateCirclePosition();
            
            if (h1ElementTopBottom) {
                updatePaddingTopBottom();
            }
            if (h1ElementLeftRight) {
                updatePaddingLeftRight();
            }
        }
    });
});

/* document.querySelectorAll('.range').forEach(function(rangeElement) {
    let rangeInput = rangeElement.querySelector('.customRange');
    let circle = rangeElement.querySelector('.circle-range');
    let line = rangeElement.querySelector('.line-range');
    
    function updateCirclePosition() {
        let value = rangeInput.value;
        let max = rangeInput.max;

        let percentage = value / max;

        // Calculate the position in pixels, ensuring the circle starts from the leftmost edge
        let position = percentage * line.clientWidth;

        // Update the position of the circle
        circle.style.left = position + 'px';
    }

    // Set the initial position based on the value
    updateCirclePosition();

    // Add event listener for changes
    rangeInput.addEventListener('input', updateCirclePosition);
    
    line.addEventListener('click', function (event) {
        let rect = line.getBoundingClientRect();
        let clickPosition = event.clientX - rect.left;
        
        let newValue = Math.round((clickPosition / line.clientWidth) * rangeInput.max);
        rangeInput.value = newValue;
        
        updateCirclePosition();
    });
}); */




document.addEventListener('DOMContentLoaded', function(){ 
    document.querySelectorAll('.flex-gap10').forEach(function(containerElement) {
        let rangeElement = containerElement.querySelector('.range');



        if(rangeElement) {
            let rangeInput = rangeElement.querySelector('.customRange');
            let circle = rangeElement.querySelector('.circle-range');
            let line = rangeElement.querySelector('.line-range');
            let h1ElementLeftRight = containerElement.querySelector('.padding-top-bottom');
            let h1ElementTopBottom = containerElement.querySelector('.padding-left-right');
            let unitSelect = containerElement.querySelector('.select-layout2');
            const previewContent = document.getElementById('preview-content');


            const unitLimits = {
                px: { min: 0, max: 300},
                '%': { min: 0, max: 100 },
                em: {min: 0, max: 10 },
                rem: { min: 0, max: 10 },
                vw: { min: 0, max: 100 },
                vh: { min: 0, max: 100 }
            };


            function updateCirclePosition() {
                let value = rangeInput.value;
                let max = rangeInput.max;


                let percentage = value / max;

                let position = percentage * line.clientWidth;

                circle.style.left = position + 'px';
            }


            function updatePaddingTopBottom() {
                let value = rangeInput.value;
                let selectedUnit = unitSelect.value;

                if (h1ElementTopBottom) {
                    h1ElementTopBottom.textContent = value;
                }

                let styleElement = document.getElementById('dynamic-padding-style-top-bottom');
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.id = 'dynamic-padding-style-top-bottom';
                    document.head.appendChild(styleElement);
                }

                styleElement.textContent = `
                    #preview-content {
                        padding-top: ${value}${selectedUnit};
                        padding-bottom: ${value}${selectedUnit};
                    }
                `;
            }

            function updatePaddingLeftRight() {
                let value = rangeInput.value;
                let selectedUnit = unitSelect.value;

                if (h1ElementLeftRight) {
                    h1ElementLeftRight.textContent = value;
                }

                let styleElement = document.getElementById('dynamic-padding-style-left-right');
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.id = 'dynamic-padding-style-left-right';
                    document.head.appendChild(styleElement);
                }

                styleElement.textContent = `
                    #preview-content {
                        padding-left: ${value}${selectedUnit};
                        padding-right: ${value}${selectedUnit};
                    }
                `;
            }


            unitSelect.addEventListener('change', function() {
                let selectedUnit = unitSelect.value;
                rangeInput.min = unitLimits[selectedUnit].min;
                rangeInput.max = unitLimits[selectedUnit].max;
                rangeInput.value = unitLimits[selectedUnit].min;
                updateCirclePosition();


                if(h1ElementTopBottom) {
                    updatePaddingTopBottom();
                }
                if (h1ElementLeftRight) {
                    updatePaddingLeftRight();
                }
            });

            
            line.addEventListener('click', function(event) {
                let rect = line.getBoundingClientRect();
                let circlePosition = event.clientX - rect.left;


                let newValue = Math.round((clickPosition / line.clientWidth) * rangeInput.max);
                rangeInput.value = newValue;


                updateCirclePosition();

                if (h1ElementTopBottom) {
                    updatePaddingTopBottom();
                }
                if(h1ElementLeftRight) {
                    updatePaddingLeftRight();
                }
            });


            updateCirclePosition();

            if (h1ElementLeftRight) {
                updatePaddingLeftRight();
            }
            if (h1ElementTopBottom) {
                updatePaddingTopBottom();
            }

        }
    });
});