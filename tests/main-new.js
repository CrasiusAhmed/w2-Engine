document.addEventListener('DOMContentLoaded', function () {
    const previewContent = document.getElementById('preview-content');



    // Target previewContent which acts as the body of the builder
    const selectionPanel = document.getElementById('selection-panel');
    const divBlockPanel = document.getElementById('div-block-panel');

    const classNameInput = document.getElementById('class-name-input');
    const addClassButton = document.getElementById('add-class-btn');


    // Function to show the "Make a selection" panel
    function showSelectionMessage() {
        selectionPanel.classList.remove('none');
        divBlockPanel.classList.add('none');
    }

    // Function to show the "Div Block" panel
    function showDivBlock() {
        selectionPanel.classList.add('none');
        divBlockPanel.classList.remove('none');
    }







    /* ++++++++++++++++++++++++++++ Saving Data to Laravel +++++++++++++++++++++++++++++ */



    // Event listener for adding a new class
    addClassButton.addEventListener('click', function () {
        const newClass = classNameInput.value.trim();

        if (newClass && currentSelectedElement) {
            const oldClass = currentSelectedElement.classList[0]; // Get the first class name

            // If there is an old class, transfer the CSS to the new class
            if (oldClass) {
                transferCssToNewClass(oldClass, newClass);
            }

            // Replace the first class with the new class
            if (currentSelectedElement.classList.length > 0) {
                currentSelectedElement.classList.replace(currentSelectedElement.classList[0], newClass);
            } else {
                currentSelectedElement.classList.add(newClass); // Add the new class if no classes exist
            }

            // Optional: Trigger a save to the database if necessary
            saveClassToDatabase(currentSelectedElement.classList); // Example for saving the new class

        }
    });


    // Example function for saving class names to the database
    function saveClassToDatabase(classList) {
        // Your AJAX or form logic to save `classList` to the Laravel backend
        console.log("Class names saved to database:", classList);
    }






    /* ++++++++++++++++++++++++++++ Saving Data to Laravel +++++++++++++++++++++++++++++ */


















    /* ++++++++++++++++++++++++++++ Main PerviewContent Page +++++++++++++++++++++++++++++ */

    document.getElementById('undoButton').addEventListener('click', undo);
    document.getElementById('redoButton').addEventListener('click', redo);


    const undoStack = [];
    const redoStack = [];

    function trackChange(action) {
        undoStack.push(action); // Push action to undo stack
        redoStack.length = 0;   // Clear redo stack on new change
    }

    function undo() {
        if (undoStack.length === 0) return;

        const action = undoStack.pop(); // Get the last action
        if (action.undo) {
            action.undo(); // Perform the undo operation
            redoStack.push({ ...action }); // Push a **copy** of the action onto the redo stack
        }
    }

    function redo() {
        if (redoStack.length === 0) return;

        const action = redoStack.pop();
        if (action.do) action.do(); // Call the do function
        undoStack.push(action);
    }




    // Listen for clicks inside the preview content area
    previewContent.addEventListener('click', function (e) {
        /* const selectedElements = previewContent.querySelectorAll('.selected'); */

        const selectedElements = document.querySelectorAll('.selected');

        selectedElements.forEach(element => {
            element.classList.remove('selected');
        });


        e.target.classList.add('selected');

        showDivBlock();
        // Store the reference to the currently selected element
        currentSelectedElement = e.target;
        const firstClass = currentSelectedElement.classList[0] || '';
        classNameInput.value = firstClass;



        // Load any existing data for this element
        loadElementData(currentSelectedElement);

        let lastCssProperty = null; // Store the last applied cssProperty


        const bxCols = document.querySelectorAll('.little-menu .bx-col');

        bxCols.forEach(bxCol => {
            bxCol.addEventListener('click', function () {
                const cssProperty = bxCol.getAttribute('add-css');

                if (cssProperty && currentSelectedElement) {
                    const firstClass = currentSelectedElement.classList[0];

                    // Remove the previous cssProperty if it exists
                    if (lastCssProperty) {
                        removeCssPropertyFromClass(firstClass, lastCssProperty);
                    }

                    // Apply the new cssProperty
                    updateCssForClass(firstClass, cssProperty);

                    // Parse the cssProperty to get the columns and rows count
                    const columns = (cssProperty.match(/1fr/g) || []).length;
                    const rows = (cssProperty.match(/auto/g) || []).length;

                    // Clear existing columns
                    currentSelectedElement.innerHTML = '';

                    // Generate colDiv elements based on rows and columns
                    let colNumber = 1;
                    for (let r = 0; r < rows; r++) {
                        for (let c = 0; c < columns; c++) {
                            const colDiv = document.createElement('div');
                            colDiv.classList.add(`col${colNumber}`, 'w2-engine-bx');
                            currentSelectedElement.appendChild(colDiv);
                            colNumber++;
                        }
                    }

                    // Update lastCssProperty to the current one
                    lastCssProperty = cssProperty;

                    // Update counts based on the new grid-template-columns and grid-template-rows values
                    updateGridCounts();
                }
            });
        });






        if (e.target.tagName.match(/^H[1-6]$/)) { // Only proceed if it's an h1-h6 tag
            currentSelectedElement = e.target;

            // Get the tag number from the heading (1 for h1, 2 for h2, etc.)
            const tagNumber = currentSelectedElement.tagName[1];

            // Update active state in tag counts based on the tag number
            updateTagCounts(`h${tagNumber}`);

            // Set the input to the current text content of the selected heading
            document.querySelector('.text-menu .input-number').value = currentSelectedElement.textContent;
        }







        // Check if selected element is a grid type and show little-menu
        if ([...currentSelectedElement.classList].some(className => className.startsWith('Grid'))) {
            document.querySelector('.little-menu').classList.remove('none');
        } else {
            document.querySelector('.little-menu').classList.add('none'); // Hide if not a Grid
        }

        if ([...currentSelectedElement.classList].some(className => className.startsWith('Heading'))) {
            document.querySelector('.text-menu').classList.remove('none');
        } else {
            document.querySelector('.text-menu').classList.add('none'); // Hide if not a Grid
        }

        const cssProperty = document.querySelectorAll('.hex-color')[0]?.getAttribute('add-css') || 'color';
        let currentColor = getComputedStyle(currentSelectedElement)[cssProperty];

        // Validate the currentColor and convert to hex if valid
        let hexColor = '';
        if (currentColor) {
            // Convert to RGB (if necessary) before converting to hex
            const rgb = currentColor.match(/\d+/g); // Extract RGB values as an array of strings
            if (rgb && rgb.length === 3) {
                // Convert RGB values to numbers
                const r = parseInt(rgb[0]);
                const g = parseInt(rgb[1]);
                const b = parseInt(rgb[2]);
                hexColor = rgbaToHex(r, g, b, 1); // Assuming full opacity
            }
        }

        // Call setupPickerForIndex with different indices as needed
        setupPickerForIndex(0); // Sets up for `hex-color1`
        setupPickerForIndex(1); // Sets up for `hex-color2`
        setupPickerForIndex(2); // Sets up for `hex-color2`
        // Repeat as needed or loop for more indices


        // Populate input fields for width and height based on the selected element
        populateInputsFromSelectedElement(); // showing input value of curret element style
        // Populate the margin and padding values for the selected element
        populateMarginPaddingValues(firstClass);
        updateGridCounts();






        // Clear all active classes in square-six-points
        clearActiveAccess();

        // Apply the stored active state for the selected element
        applyStoredActiveState(currentSelectedElement);

        // Load data for the newly selected element
        loadElementData(currentSelectedElement);








        // Apply stored active states for `btn3`, `btn4`, and `btn5` buttons in the current `firstClass`
        /* ['btn-s1', 'flex-btn', 'btn-a1', 'btn-s2', 'btn3', 'btn-s4', 'btn-s5', 'btn-s6', 'btn-s7', 'btn-s8', 'btn-s9', 'btn-s10'].forEach(btnType => {
            const activeIndex = activeButtonIndexStore[`${firstClass}-${btnType}`] ?? 0;
            document.querySelectorAll(`.${btnType}`).forEach((button, index) => {
                button.classList.toggle('active', index === activeIndex);
            });
        }); */

        // Call this function with the appropriate `firstClass` value when needed
        applyStoredActiveStates(classNameInput.value);




        Object.entries(choiceDivMap).forEach(([choiceClass, { targetId, defaultText }]) => {
            const targetDiv = document.getElementById(targetId);
            targetDiv.textContent = selectedTextStore[firstClass]?.[choiceClass] || defaultText;
        });







        updateMenuVisibility(); // Check display property when selecting an element










        // Retrieve the box-shadow data for the selected element
        const boxShadowData = elementBoxShadowData.get(currentSelectedElement) || {
            insideBoxShadowList: [],
            outsideBoxShadowList: []
        };

        // Update the lists for the selected element
        insideBoxShadowList.splice(0, insideBoxShadowList.length, ...boxShadowData.insideBoxShadowList);
        outsideBoxShadowList.splice(0, outsideBoxShadowList.length, ...boxShadowData.outsideBoxShadowList);

        // Refresh the displayed shadow items
        refreshBoxShadowIndices(insideBoxShadowList, 'inside-box-shadow-list');
        refreshBoxShadowIndices(outsideBoxShadowList, 'outside-box-shadow-list');
        toggleBoxShadowLists();


        // Update box-shadow lists based on the newly selected element
        loadBoxShadowData();
        loadTextShadowData();

    });






    /* ++++++++++++++++++++++++++++ Main PerviewContent Page +++++++++++++++++++++++++++++ */















    /* ++++++++++++++++++++++++++++ For Button Store Active +++++++++++++++++++++++++++++ */




    const buttonTypes = ['btn-s1', 'flex-btn', 'btn-a1', 'btn-s2', 'btn3', 'btn-s4', 'btn-s5', 'btn-s6', 'btn-s7', 
                        'btn-s8', 'btn-s9', 'btn-s10', 'btn-s11', 'btn-s12', 'btn-s13', 'btn-s14', 'btn-s15'];



    document.addEventListener('click', function (event) {
        // Define the class names you want to check for
        const validClassNames = ['btn-s1', 'flex-btn', 'btn-a1', 'btn-s2', 'btn3', 'btn-s4', 'btn-s5', 'btn-s6', 'btn-s7',
            'btn-s8', 'btn-s9', 'btn-s10', 'btn-s11', 'btn-s12', 'btn-s13', 'btn-s14', 'btn-s15',
            'position-choice', 'text-choice1', 'text-choice2', 'clip-choice', 'blending-choice', 'align-choice1', 'align-choice2',
            'cursor-choice',];

        // Check if the clicked element contains any of the valid class names
        const hasValidClass = validClassNames.some(className => event.target.classList.contains(className));

        // Proceed only if the element has one of the valid class names
        if (hasValidClass) {
            const cssRule = event.target.getAttribute('add-css'); // Get the CSS rule from the 'add-css' attribute

            if (currentSelectedElement && cssRule) {
                const targetClass = classNameInput.value.trim() || firstClass; // Use the selected element's class

                // Split the cssRule into multiple properties if they exist (handle multiple "property: value" pairs)
                const cssProperties = cssRule.split(';').map(prop => prop.trim()).filter(prop => prop);

                cssProperties.forEach(propertyValuePair => {
                    // Check if it's a remove action (e.g., "remove: overflow")
                    if (propertyValuePair.startsWith("remove:")) {
                        const cssPropertyToRemove = propertyValuePair.split(':')[1].trim();
                        removeCssPropertyFromClass(targetClass, cssPropertyToRemove);

                        // Optionally clear the corresponding input field
                        const correspondingInput = document.querySelector(`input[add-css="${cssPropertyToRemove}"]`);
                        if (correspondingInput) {
                            correspondingInput.value = '';
                        }
                    } else {
                        // Apply the regular CSS rule (e.g., "position: absolute")
                        const [cssProperty, cssValue] = propertyValuePair.split(':').map(item => item.trim());
                        if (cssProperty && cssValue) {
                            updateCssForClass(targetClass, cssProperty, cssValue);

                            // Optional: Update the corresponding input field for real-time feedback
                            const correspondingInput = document.querySelector(`input[add-css="${cssProperty}"]`);
                            if (correspondingInput) {
                                correspondingInput.value = cssValue;
                            }
                        }
                    }
                });

                // Mark the element as clicked
                event.target.classList.add('clicked');
            }
        }
    });

    function activateFirstButton(group, btnType) {
        // Skip if the group is within .square-six-points
        if (group.closest('.square-six-points')) return;

        const firstButton = group.querySelector(`.${btnType}`);
        if (firstButton) firstButton.classList.add('active');
    }

    function handleButtonClick(button, btnType, index) {
        button.addEventListener('click', function () {
            const group = this.closest('.buttons4');
            const prevButton = group.querySelector(`.${btnType}.active`);
            const newButton = this;

            // Remove 'active' from all buttons in the group
            group.querySelectorAll(`.${btnType}`).forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Track the button state change for undo/redo
            trackChange({
                do: () => {
                    if (newButton) newButton.classList.add('active');
                    if (prevButton) prevButton.classList.remove('active');
                },
                undo: () => {
                    if (prevButton) prevButton.classList.add('active');
                    if (newButton) newButton.classList.remove('active');
                },
            });

            // Update active button index store
            const firstClass = classNameInput.value;
            if (firstClass) {
                activeButtonIndexStore[`${firstClass}-${btnType}`] = index;
            }
        });
    }
    function applyStoredActiveStates(firstClass) {
        buttonTypes.forEach(btnType => {
            const activeIndex = activeButtonIndexStore[`${firstClass}-${btnType}`] ?? 0;

            document.querySelectorAll(`.${btnType}`).forEach((button, index) => {
                // Skip buttons inside .square-six-points
                if (button.closest('.square-six-points')) return;

                button.classList.toggle('active', index === activeIndex);
            });
        });
    }


    buttonTypes.forEach(btnType => {
        // Loop through all .buttons4 groups
        document.querySelectorAll('.buttons4').forEach(group => {
            activateFirstButton(group, btnType);
        });

        // Loop through all buttons of the given btnType
        document.querySelectorAll(`.${btnType}`).forEach((button, index) => {
            // Skip buttons inside .square-six-points
            if (button.closest('.square-six-points')) return;

            handleButtonClick(button, btnType, index);
        });
    });





    /* ++++++++++++++++++++++++++++ For Button Store Active +++++++++++++++++++++++++++++ */





















    /* ++++++++++++++++++++++++++++ Position-Choice Text Change and Store Selection +++++++++++++++++++++++++++++ */



    // Object to store selected texts for each first class
    const selectedTextStore = {};

    // Choice mapping with target div IDs and default texts
    const choiceDivMap = {
        "position-choice": { targetId: "currentWeight1", defaultText: "Static" },
        "text-choice1": { targetId: "currentWeight2", defaultText: "Arial" },
        "text-choice2": { targetId: "currentWeight3", defaultText: "400 - Normal" },
        "clip-choice": { targetId: "currentWeight4", defaultText: "None" },
        "align-choice1": { targetId: "currentWeight-a1", defaultText: "Left" },
        "align-choice2": { targetId: "currentWeight-a2", defaultText: "Bottom" },
        "blending-choice": { targetId: "currentWeight5", defaultText: "Normal" },
        "cursor-choice": { targetId: "currentWeight6", defaultText: "Auto" },
    };

    // Add click event listeners to choices and store selections
    Object.entries(choiceDivMap).forEach(([choiceClass, { targetId }]) => {
        document.querySelectorAll(`.position-add .${choiceClass}`).forEach(choice => {
            choice.addEventListener("click", function () {
                document.getElementById(targetId).textContent = this.textContent;

                // Store the selected text for the current element's first class
                const firstClass = currentSelectedElement?.classList[0];
                if (firstClass) {
                    selectedTextStore[firstClass] = {
                        ...selectedTextStore[firstClass],
                        [choiceClass]: this.textContent
                    };
                }
            });
        });
    });



    /* ++++++++++++++++++++++++++++ Position-Choice Text Change and Store Selection +++++++++++++++++++++++++++++ */










    // Define mapping between f-point elements and desired text content
    const pointTextMap = {
        "f1-points": { xText: "Left", yText: "Top" },
        "f2-points": { xText: "Center", yText: "Top" },
        "f3-points": { xText: "Right", yText: "Top" },
        "f4-points": { xText: "Left", yText: "Center" },
        "f5-points": { xText: "Center", yText: "Center" },
        "f6-points": { xText: "Right", yText: "Center" },
        "f7-points": { xText: "Left", yText: "Bottom" },
        "f8-points": { xText: "Center", yText: "Bottom" },
        "f9-points": { xText: "Right", yText: "Bottom" }
    };

    // Set default active state
    const defaultPoint = document.querySelector(".f1-points");
    if (defaultPoint) {
        activateFlexAccess(["f1-points"]);
        console.log("Default active state set for f1-points");
    } else {
        console.warn("Default active state could not be set; f1-points not found.");
    }


    // Utility to activate specific f*-access points
    function activateFlexAccess(pointIds) {
        pointIds.forEach(pointId => {
            const flexPoint = document.querySelector(`.${pointId}`);
            if (flexPoint) {
                const accessDiv = flexPoint.querySelector('div');
                if (accessDiv) {
                    accessDiv.classList.add('active');
                }
            }
        });
    }

    // Function to clear all active states within .square-six-points
    function clearActiveAccess() {
        document.querySelectorAll('.square-six-points .flex-btn .active').forEach(activeEl => {
            activeEl.classList.remove('active');
        });
    }



    // Function to update f*-access based on current X and Y text weights
    function updateFlexAccessBasedOnWeights() {
        const currentXText = document.getElementById('currentWeight-a1').textContent;
        const currentYText = document.getElementById('currentWeight-a2').textContent;


        // Clear all active states first
        clearActiveAccess();

        // Determine the active points based on weights
        let activePoints = [];
        if (currentXText === "Stretch") {
            if (currentYText === "Top") {
                activePoints = ["f1-points", "f2-points", "f3-points"];
            } else if (currentYText === "Center") {
                activePoints = ["f4-points", "f5-points", "f6-points"];
            } else if (currentYText === "Bottom") {
                activePoints = ["f7-points", "f8-points", "f9-points"];
            } else if (["Space Between", "Space Around"].includes(currentYText)) {
                activePoints = ["f1-points", "f2-points", "f3-points", "f4-points", "f5-points", "f6-points", "f7-points", "f8-points", "f9-points"];
            }
        } else if (currentXText === "Baseline") {
            if (currentYText === "Top") {
                activePoints = ["f1-points"];
            } else if (currentYText === "Center") {
                activePoints = ["f4-points"];
            } else if (currentYText === "Bottom") {
                activePoints = ["f7-points"];
            } else if (["Space Between", "Space Around"].includes(currentYText)) {
                activePoints = ["f1-points", "f4-points", "f7-points"];
            }
        } else if (["Space Between", "Space Around"].includes(currentYText)) {
            if (currentXText === "Left") {
                activePoints = ["f1-points", "f4-points", "f7-points"];
            } else if (currentXText === "Center") {
                activePoints = ["f2-points", "f5-points", "f8-points"];
            } else if (currentXText === "Right") {
                activePoints = ["f3-points", "f6-points", "f9-points"];
            } else if (currentXText === "Stretch") {
                activePoints = ["f1-points", "f2-points", "f3-points", "f4-points", "f5-points", "f6-points", "f7-points", "f8-points", "f9-points"];
            } else if (currentXText === "Baseline") {
                activePoints = ["f1-points", "f4-points", "f7-points"];
            }
        } else {
            // Default behavior for non-Stretch, non-Baseline, non-Space values
            const matchingPointId = Object.keys(pointTextMap).find(pointId => {
                const text = pointTextMap[pointId];
                return text.xText === currentXText && text.yText === currentYText;
            });

            if (matchingPointId) {
                activePoints = [matchingPointId];
            }
        }

        // Activate the determined points
        activateFlexAccess(activePoints);

        // Store the active state for the current element
        if (currentSelectedElement) {
            storeActiveState(currentSelectedElement, activePoints);
        }
    }

    // Event listener for position-add options
    document.querySelectorAll('.position-add h1').forEach(option => {
        option.addEventListener('click', function () {
            const parentContainer = this.closest('.position-add');
            const newText = this.textContent;

            if (parentContainer.classList.contains('n2')) {
                // Update X-axis
                document.getElementById('currentWeight-a1').textContent = newText;
            } else if (parentContainer.classList.contains('n3')) {
                // Update Y-axis
                document.getElementById('currentWeight-a2').textContent = newText;
            }

            // Update f*-access based on the new weights
            updateFlexAccessBasedOnWeights();
        });
    });

    // Function to store the active state
    function storeActiveState(element, activePoints) {
        if (!element) return;
        element.dataset.activePoints = JSON.stringify(activePoints); // Store as JSON array in the dataset
    }

    // Function to retrieve and apply the stored active state
    function applyStoredActiveState(element) {
        if (!element) return;
        const activePoints = JSON.parse(element.dataset.activePoints || "[]");
        activateFlexAccess(activePoints);
    }






















    /* ++++++++++++++++++++++++++++ Input Value And Set Unit +++++++++++++++++++++++++++++ */


    const inputs = document.querySelectorAll('.input-number');


    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const cssProperty = input.getAttribute('add-css');
            let value = input.value.trim();

            if (currentSelectedElement) {
                let firstClass = currentSelectedElement.classList[0] || '';
                const newClass = classNameInput.value.trim();
                if (newClass && !currentSelectedElement.classList.contains(newClass)) {
                    currentSelectedElement.classList.add(newClass);
                }
                const targetClass = newClass || firstClass;

                const unitMapping = {
                    width: 'widthInput',
                    height: 'heightInput',
                    'min-width': 'minWidthInput',
                    'max-width': 'maxWidthInput',
                    'min-height': 'minHeightInput',
                    'max-height': 'maxHeightInput',
                    'border-radius': 'borderRadiusInput',
                    'border-top-left-radius': 'borderTopLeftRadiusInput',
                    'border-top-right-radius': 'borderTopRightRadiusInput',
                    'border-bottom-left-radius': 'borderBottomLeftRadiusInput',
                    'border-bottom-right-radius': 'borderBottomRightRadiusInput',
                    'border-width': 'borderWidthInput',
                    'border-top-width': 'borderTopWidthInput',
                    'border-right-width': 'borderRightWidthInput',
                    'border-bottom-width': 'borderBottomWidthInput',
                    'border-left-width': 'borderLeftWidthInput',
                    'gap': 'gapInput',
                    'row-gap': 'rowGapInput',
                    'column-gap': 'columnGapInput',
                    'padding': 'paddingInput',
                    'padding-top': 'paddingTopInput',
                    'padding-right': 'paddingRightInput',
                    'padding-bottom': 'paddingBottomInput',
                    'padding-left': 'paddingLeftInput',
                    'margin': 'marginInput',
                    'margin-top': 'marginTopInput',
                    'margin-right': 'marginRightInput',
                    'margin-bottom': 'marginBottomInput',
                    'margin-left': 'marginLeftInput',
                    'top': 'topDataInput',
                    'right': 'rightDataInput',
                    'bottom': 'bottomDataInput',
                    'left': 'leftDataInput',
                    'opacity': 'opacityInput',
                };

                const unitId = unitMapping[cssProperty];
                const unitSelector = document.querySelector(`.select-layout[data-unit-for="${unitId}"] span`);
                let unit = unitSelector ? unitSelector.innerText.toLowerCase() : '';
                unit = unit || 'px';

                // Check if the value is empty ++___________+++++++++++++++last update
                if (value === '') {
                    // Remove the CSS property for the target class
                    removeCssPropertyFromClass(targetClass, cssProperty);

                    // Clear stored values in elementUnits
                    const elementId = firstClass;
                    if (elementUnits[elementId]) {
                        delete elementUnits[elementId][`${cssProperty}Value`];
                        delete elementUnits[elementId][`${cssProperty}Unit`];
                    }
                } else {
                    // Add unit to value if it is numeric
                    if (/^\d+$/.test(value)) {
                        value = `${value}${unit}`;
                    }

                    // Store the current value and unit in elementUnits for restoration
                    const elementId = firstClass;
                    if (!elementUnits[elementId]) elementUnits[elementId] = {};
                    elementUnits[elementId][`${cssProperty}Value`] = parseFloat(value);
                    elementUnits[elementId][`${cssProperty}Unit`] = unit;

                    if (cssProperty === 'text-shadow1' || cssProperty === 'text-shadow2' || cssProperty === 'text-shadow3' || 
                        cssProperty === 'box-shadow1' || cssProperty === 'box-shadow2' || cssProperty === 'box-shadow3') 
                    return;
                    
                    // Update the CSS property for the target class
                    updateCssForClass(targetClass, cssProperty, value);
                }

            }
        });
    });
















    /* -------------------------- SelectedElement for adding value ---------------------- */

    // \/\/\/\/\/\/\/\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\//\\/\/\/\/\/\/\/\/\/\\//\/\/\/\/ last updated for fix problem of inputMappings


    let currentSelectedElement = null;

    const inputMappings = {
        widthInput: 'width',
        heightInput: 'height',
        minWidthInput: 'min-width',
        maxWidthInput: 'max-width',
        minHeightInput: 'min-height',
        maxHeightInput: 'max-height',
        borderWidthInput: 'border-width',
        borderTopWidthInput: 'border-top-width',
        borderRightWidthInput: 'border-right-width',
        borderBottomWidthInput: 'border-bottom-width',
        borderLeftWidthInput: 'border-left-width',
        borderRadiusInput: 'border-radius',
        borderTopLeftRadiusInput: 'border-top-left-radius',
        borderTopRightRadiusInput: 'border-top-right-radius',
        borderBottomLeftRadiusInput: 'border-bottom-left-radius',
        borderBottomRightRadiusInput: 'border-bottom-right-radius',
        gapInput: 'gap',
        rowGapInput: 'row-gap',
        columnGapInput: 'column-gap',
        paddingInput: 'padding',
        paddingTopInput: 'padding-top',
        paddingRightInput: 'padding-right',
        paddingBottomInput: 'padding-bottom',
        paddingLeftInput: 'padding-left',
        marginInput: 'margin',
        marginTopInput: 'margin-top',
        marginRightInput: 'margin-right',
        marginBottomInput: 'margin-bottom',
        marginLeftInput: 'margin-left',
        topDataInput: 'top',
        rightDataInput: 'right',
        bottomDataInput: 'bottom',
        leftDataInput: 'left',
        opacityInput: 'opacity',
        boxShadowInput1: 'box-shadow',
        boxShadowInput2: 'box-shadow2',
        boxShadowInput3: 'box-shadow3',
        textShadowInput1: 'text-shadow1',
        textShadowInput2: 'text-shadow2',
        textShadowInput3: 'text-shadow3',
    };


    // as deffult for inputs
    // Default units for inputs
    let selectedUnits = {

    };

    function updateSelectedElementStyle() {
        if (currentSelectedElement) {
            const newClass = classNameInput.value.trim();
            const elementId = currentSelectedElement.classList[0] || currentSelectedElement.id;

            for (const [inputId, cssProperty] of Object.entries(inputMappings)) {
                const inputElement = document.querySelector(`input[add-css="${cssProperty}"]`);
                const inputValue = inputElement.value || '';
                const unit = selectedUnits[inputId] || 'px'; // Use per-input unit

                // Ensure elementUnits tracks per-property values and units independently
                elementUnits[elementId] = elementUnits[elementId] || {};
                elementUnits[elementId][`${cssProperty}Value`] = inputValue;
                elementUnits[elementId][`${cssProperty}Unit`] = unit;

                if (unit === 'auto') {
                    inputElement.value = 'auto';
                    updateCssForClass(newClass, cssProperty, 'auto');
                } else if (inputValue) {
                    updateCssForClass(newClass, cssProperty, `${inputValue}${unit}`);
                } else {
                    removeCssPropertyFromClass(newClass, cssProperty);
                }
            }
        }
    }





    // Listen for unit selection clicks
    document.querySelectorAll('.select-layout').forEach(unitSelector => {

        // Event listener for the unit selector itself
        unitSelector.addEventListener('click', function (e) {
            if (e.target && e.target.hasAttribute('value')) {
                const selectedUnit = e.target.getAttribute('value');
                const targetInputId = unitSelector.getAttribute('data-unit-for');



                // Update the selected unit for the specific input
                selectedUnits[targetInputId] = selectedUnit;


                // Optionally, highlight the selected unit visually
                unitSelector.querySelectorAll('div').forEach(div => div.classList.remove('selected'));
                e.target.classList.add('selected');

                // Call your function to update the styles (you can implement this as needed)
                updateSelectedElementStyle();
            }
        });
    });




















    /* -------------------------- store data and value ---------------------- */


    // \/\/\/\/\/\/\/\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\//\\/\/\/\/\/\/\/\/\/\\//\/\/\/\/ last updated for fix problem of inputMappings and opacityInput



    // Object to store the active button index for each element in previewContent
    const activeButtonIndexStore = {};
    const elementUnits = {};

    function populateInputsFromSelectedElement() {
        if (currentSelectedElement) {
            const computedStyle = window.getComputedStyle(currentSelectedElement);
            const elementId = currentSelectedElement.classList[0] || currentSelectedElement.id;

            Object.keys(inputMappings).forEach(inputId => {
                const cssProperty = inputMappings[inputId];
                const inputElement = document.querySelector(`input[add-css="${cssProperty}"]`);

                if (inputElement) {
                    // Retrieve stored value and unit from elementUnits
                    let storedValue = elementUnits[elementId]?.[`${cssProperty}Value`];
                    let storedUnit = elementUnits[elementId]?.[`${cssProperty}Unit`] ||
                        (inputId === 'opacityInput' ? '%' : 'px'); // Default to '%' for opacity

                    // Use the stored value if available, otherwise fallback to computed style only if explicitly modified
                    const hasUserModified = elementUnits[elementId]?.hasOwnProperty(`${cssProperty}Value`);
                    let value = hasUserModified
                        ? storedValue
                        : parseFloat(computedStyle[cssProperty]) || '';

                    // Special handling for opacityInput
                    if (inputId === 'opacityInput') {
                        // Scale opacity value to percentage
                        value = hasUserModified ? storedValue : Math.round(parseFloat(computedStyle.opacity || 1) * 100);
                        storedUnit = '%'; // Ensure unit is '%'
                    }

                    // Avoid applying inherited/default styles unless explicitly modified
                    if (!hasUserModified && !inputElement.value) {
                        return; // Skip updating this input if not explicitly modified
                    }

                    // Check if the stored unit is 'auto' and update the display accordingly
                    const displayUnit = storedUnit === 'auto' ? '-' : storedUnit;

                    // Update the input value and unit display
                    inputElement.value = value;
                    document.querySelector(`.select-layout[data-unit-for="${inputId}"] span`).innerText = displayUnit;
                    selectedUnits[inputId] = storedUnit;
                }
            });
        }
    }

















    /* -------------------------- set unitSelector for change px and others ---------------------- */





    // Get all unit selectors that have a data-unit-for attribute (both width and height)
    const unitSelectors = document.querySelectorAll('.select-layout');


    unitSelectors.forEach(unitSelector => {
        const unitItems = unitSelector.querySelectorAll('div'); // All the unit options

        const selectedUnitDisplay = document.createElement('span');
        selectedUnitDisplay.innerText = 'PX'; // Default to 'px'
        unitSelector.insertBefore(selectedUnitDisplay, unitItems[0]);


        // Initially hide the unit options (except the display element)
        unitItems.forEach(item => {
            item.style.display = 'none'; // Hide all unit options initially
        });

        // Add click event listener to toggle the menu
        selectedUnitDisplay.addEventListener('click', function () {
            const isMenuOpen = unitItems[0].style.display === 'block'; // Check if the menu is open

            // Toggle visibility of the unit options
            unitItems.forEach(item => {
                item.style.display = isMenuOpen ? 'none' : 'block'; // Show or hide the menu
            });

            // Toggle class for background when menu is open
            unitSelector.classList.toggle('menu-open', !isMenuOpen);
        });

        unitItems.forEach(item => {
            item.addEventListener('click', function () {

                const selectedValue = this.innerText.toLowerCase(); // Get the selected unit
                selectedUnitDisplay.innerText = selectedValue === 'auto' ? '-' : selectedValue; // Set '-' for auto
                selectedUnitDisplay.setAttribute('value', this.getAttribute('value')); // Update the value attribute

                unitItems.forEach(innerItem => {
                    innerItem.style.display = 'none'; // Hide all units after selection
                });


                unitSelector.classList.remove('menu-open');
            });
        });
    });


    // custom unitSelector

    function createCustomUnitSelector(units, defaultUnit, dataUnitFor) {
        const unitSelector = document.createElement('div');
        unitSelector.className = 'select-layout remove-span-unit';
        unitSelector.setAttribute('data-unit-for', dataUnitFor);

        // Create the selected unit display element
        const selectedUnitDisplay = document.createElement('span');
        selectedUnitDisplay.innerText = defaultUnit.toUpperCase();
        unitSelector.appendChild(selectedUnitDisplay);

        // Add the unit options
        units.forEach(unit => {
            const unitItem = document.createElement('div');
            unitItem.innerText = unit.toUpperCase();
            unitItem.setAttribute('value', unit);
            unitSelector.appendChild(unitItem);

            // Initially hide the unit options
            unitItem.style.display = 'none';
        });

        // Add event listeners for the dropdown behavior
        const unitItems = unitSelector.querySelectorAll('div');
        selectedUnitDisplay.addEventListener('click', function () {
            const isMenuOpen = unitItems[0].style.display === 'block';
            unitItems.forEach(item => {
                item.style.display = isMenuOpen ? 'none' : 'block';
            });
            unitSelector.classList.toggle('menu-open', !isMenuOpen);
        });

        unitItems.forEach(item => {
            item.addEventListener('click', function () {
                const selectedValue = this.innerText.toLowerCase();
                selectedUnitDisplay.innerText = selectedValue.toUpperCase();
                selectedUnitDisplay.setAttribute('value', selectedValue);

                unitItems.forEach(innerItem => {
                    innerItem.style.display = 'none';
                });

                unitSelector.classList.remove('menu-open');
            });
        });

        return unitSelector;
    }

    // Dynamically create a select-layout with % only for opacity
    const opacityUnitSelector = createCustomUnitSelector(['%'], '%', 'opacityInput');

    // Find the container where you want to append the select-layout
    const positionElementContainer = document.querySelector('#opacity-container .flex-sb.position-element');

    // Append the select-layout after the input inside the .flex-sb.position-element container
    positionElementContainer.appendChild(opacityUnitSelector);





















    // ----------------------- CSS Style Start -------------------------



    function removeCssPropertyFromClass(className, cssProperty) {
        let styleTag = document.getElementById('dynamic-styles');
        if (!styleTag) return; // Exit if no dynamic styles are found

        let styles = styleTag.innerHTML;
        const regex = new RegExp(`\\.${className}\\s*{[^}]*}`, 'g');
        const match = styles.match(regex);

        if (match) {
            let existingStyleBlock = match[0];

            // Remove the specific CSS property from the class's style block
            const updatedStyleBlock = existingStyleBlock.replace(new RegExp(`${cssProperty}:\\s*[^;]+;?`, 'g'), '');

            // Update the entire style tag
            styles = styles.replace(existingStyleBlock, updatedStyleBlock);

            styleTag.innerHTML = styles;
        }
    }

    function updateCssForClass(className, cssProperty, newValue) {
        let styleTag = document.getElementById('dynamic-styles');

        // Ensure the <style> tag exists
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-styles';
            document.head.appendChild(styleTag);
        }

        let styles = styleTag.innerHTML;
        const regex = new RegExp(`\\.${className}\\s*{([^}]*)}`, 'g');
        const match = styles.match(regex);

        let oldValue = ''; // Initialize oldValue
        let updatedStyles = '';

        if (match) {
            // Extract existing styles for the class
            let existingStyle = match[0];
            const propertyRegex = new RegExp(`${cssProperty}\\s*:\\s*([^;]+);`, 'g');
            const propertyMatch = existingStyle.match(propertyRegex);

            if (propertyMatch) {
                oldValue = propertyMatch[0].split(':')[1].trim().replace(';', ''); // Extract old value
                if (newValue !== null) {
                    existingStyle = existingStyle.replace(propertyRegex, `${cssProperty}: ${newValue};`);
                } else {
                    // Remove property if newValue is null
                    return removeCssPropertyFromClass(className, cssProperty);
                }
            } else if (newValue !== null) {
                existingStyle = existingStyle.replace('}', `  ${cssProperty}: ${newValue}; }`);
            }

            updatedStyles = styles.replace(regex, existingStyle);
        } else if (newValue !== null) {
            // If the class doesn't exist, add it as a new style block
            updatedStyles = styles + `.${className} { ${cssProperty}: ${newValue}; }`;
        }

        // Apply the updated styles
        styleTag.innerHTML = updatedStyles;

        // Track the change with undo/redo
        trackChange({
            do: () => updateCssForClass(className, cssProperty, newValue),
            undo: () => {
                if (oldValue) {
                    updateCssForClass(className, cssProperty, oldValue);
                } else {
                    removeCssPropertyFromClass(className, cssProperty);
                }
            },
        });
    }

    // Transfer CSS from the old class to the new class
    function transferCssToNewClass(oldClass, newClass) {
        let styleTag = document.getElementById('dynamic-styles');
        if (styleTag) {
            let styles = styleTag.innerHTML;

            // Regex to find the old class styles
            const oldClassRegex = new RegExp(`\\.${oldClass}\\s*{[^}]*}`, 'g');
            const match = styles.match(oldClassRegex);

            if (match) {
                // Transfer styles from old class to new class
                const oldClassStyles = match[0].replace(`.${oldClass}`, `.${newClass}`);
                styles = styles.replace(oldClassRegex, ''); // Remove old class styles
                styles += oldClassStyles; // Add the styles to the new class
            }

            styleTag.innerHTML = styles;
        }
    }


    // ----------------------- CSS Style Start -------------------------








    /* ++++++++++++++++++++++++++++ Input Value And Set Unit +++++++++++++++++++++++++++++ */

























    /* ++++++++++++++++++++++++++++ When Element is Flex +++++++++++++++++++++++++++++ */

    /* +++++++ Update it if you get problem */




    const displayButtons = document.querySelectorAll('.btn-s1');
    const flexMenu = document.querySelector('.flex-menu');
    const gridMenu = document.querySelector('.grid-menu');

    // Function to update visibility for menus based on the display property
    function updateMenuVisibility() {
        if (currentSelectedElement) {
            const elementStyle = window.getComputedStyle(currentSelectedElement);
            const displayProperty = elementStyle.getPropertyValue('display');

            // Handle flex-menu visibility
            flexMenu.classList.toggle('none', displayProperty !== 'flex');

            // Handle grid-menu visibility
            gridMenu.classList.toggle('none', displayProperty !== 'grid');
        }
    }

    // Utility to update or add a CSS rule
    function updateCSSRule(className, property, value) {
        let styleTag = document.getElementById('dynamic-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-styles';
            document.head.appendChild(styleTag);
        }

        const sheet = styleTag.sheet;
        const rule = `.${className} { ${property}: ${value}; }`;

        // Replace existing rule or add a new one
        const index = Array.from(sheet.cssRules).findIndex(r => r.selectorText === `.${className}`);
        if (index > -1) {
            sheet.deleteRule(index);
        }
        sheet.insertRule(rule, sheet.cssRules.length);
    }

    displayButtons.forEach(button => {
        button.addEventListener('click', () => {
            const displayStyle = button.getAttribute('add-css').split(': ')[1].replace(';', '');

            if (currentSelectedElement) {
                const firstClass = currentSelectedElement.classList[0];
                if (firstClass) {
                    updateCSSRule(firstClass, 'display', displayStyle);

                    // Update menu visibility
                    updateMenuVisibility();
                }
            }

            // Highlight active button
            displayButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });


    /* ++++++++++++++++++++++++++++ When Element is Flex +++++++++++++++++++++++++++++ */































    /* ++++++++++++++++++++++++++++ Grid Setting for Choose +++++++++++++++++++++++++++++ */

    /* +++++++ Update it if you get problem updateGridCounts */


    function updateGridCounts() {
        if (currentSelectedElement) {
            const firstClass = currentSelectedElement.classList[0];
            const gridStyles = window.getComputedStyle(currentSelectedElement);

            // Get current grid-template-columns and grid-template-rows values
            const columnTemplate = gridStyles.getPropertyValue('grid-template-columns');
            const rowTemplate = gridStyles.getPropertyValue('grid-template-rows');

            // Calculate the counts based on the template values
            const columnCount = columnTemplate.split(' ').filter(Boolean).length || 0;
            const rowCount = rowTemplate.split(' ').filter(Boolean).length || 0;

            // Update the displayed counts for all matching elements
            document.querySelectorAll('.count.column h1').forEach((columnCountElement) => {
                columnCountElement.innerText = columnCount;
            });

            document.querySelectorAll('.count.row h1').forEach((rowCountElement) => {
                rowCountElement.innerText = rowCount;
            });
        }
    }


    // Function to update grid-template-columns or grid-template-rows
    let nextColNumber = 5;

    // Function to update grid-template-columns or grid-template-rows and add/remove colDivs
    function updateGridTemplate(property, increment) {
        if (!currentSelectedElement) return;

        const firstClass = currentSelectedElement.classList[0];
        let template = getComputedStyle(currentSelectedElement).getPropertyValue(property).trim().split(/\s+/);
        const isColumn = property === 'grid-template-columns';

        // Get current column and row counts
        const columnCount = getComputedStyle(currentSelectedElement).getPropertyValue('grid-template-columns').trim().split(/\s+/).length;
        const rowCount = getComputedStyle(currentSelectedElement).getPropertyValue('grid-template-rows').trim().split(/\s+/).length;

        if (increment) {
            // Increase template count for columns or rows
            template.push(isColumn ? '1fr' : 'auto');

            if (isColumn) {
                // Add a new column by appending a new `colDiv` for each row
                for (let row = 0; row < rowCount; row++) {
                    let newColDiv = document.createElement('div');
                    newColDiv.classList.add(`col${nextColNumber++}`, 'w2-engine-bx');
                    currentSelectedElement.appendChild(newColDiv);
                }
            } else {
                // Add a new row by creating a row’s worth of `colDiv`s
                for (let col = 0; col < columnCount; col++) {
                    let newRowDiv = document.createElement('div');
                    newRowDiv.classList.add(`col${nextColNumber++}`, 'w2-engine-bx');
                    currentSelectedElement.appendChild(newRowDiv);
                }
            }
        } else if (template.length > 1) { // Prevent removal if only one remains
            // Decrease template count for columns or rows
            template.pop();

            if (isColumn) {
                // Remove the last column by removing the last `colDiv` in each row
                for (let row = 0; row < rowCount; row++) {
                    const lastColDiv = currentSelectedElement.querySelector(`.col${nextColNumber - 1}`);
                    if (lastColDiv) lastColDiv.remove();
                    nextColNumber--;
                }
            } else {
                // Remove the last row by removing the last set of `colDiv`s for that row
                for (let col = 0; col < columnCount; col++) {
                    const lastRowDiv = currentSelectedElement.querySelector(`.col${nextColNumber - 1}`);
                    if (lastRowDiv) lastRowDiv.remove();
                    nextColNumber--;
                }
            }
        }

        // Join the values as a string and update the class style
        const updatedTemplate = template.map(value => isColumn ? '1fr' : 'auto').join(' ');
        updateCssForClass(firstClass, property, updatedTemplate);

        // Update displayed counts
        updateGridCounts();
    }


    // Assign event listeners
    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', handleGridButtonClick);
    });


    // Function to handle button clicks
    function handleGridButtonClick(e) {
        const button = e.currentTarget;
        const isIncrement = button.querySelector('img').getAttribute('src').includes('add.png');
        const cssProperty = button.getAttribute('add-css');
        updateGridTemplate(cssProperty, isIncrement);
    }






    /* ++++++++++++++++++++++++++++ Grid Setting for Choose +++++++++++++++++++++++++++++ */

































    /* ++++++++++++++++++++++++++++ Heading Text Setting for Choose +++++++++++++++++++++++++++++ */




    function updateTagCounts(selectedTag) {
        const counts = document.querySelectorAll('.padding-menu .count');

        counts.forEach(count => {
            const tagNumber = count.querySelector('h1').textContent;
            if (parseInt(tagNumber) === parseInt(selectedTag[1])) { // Matches h1, h2, etc.
                count.classList.add('active');
            } else {
                count.classList.remove('active');
            }
        });
    }

    // Update the active state and tag + class name when a count number is clicked
    document.querySelector('.text-menu').addEventListener('click', function (event) {
        const target = event.target.closest('.count');
        if (target && currentSelectedElement) {
            // Remove active class from all counts
            document.querySelectorAll('.text-menu .count').forEach(count => count.classList.remove('active'));

            // Add active class to the selected count
            target.classList.add('active');

            // Get the selected tag number
            const tagNumber = target.querySelector('h1').innerText;
            const newTagName = `h${tagNumber}`;

            // Create a new element with the selected tag and the updated class name
            const newTagElement = document.createElement(newTagName);
            newTagElement.className = currentSelectedElement.className.replace(/w2-engine-text\d+/, `w2-engine-text${tagNumber}`);
            newTagElement.textContent = currentSelectedElement.textContent;

            // Replace the current selected element with the new tag element
            currentSelectedElement.replaceWith(newTagElement);
            currentSelectedElement = newTagElement;
        }
    });




    // Event listener for updating heading text content based on input
    document.querySelector('.text-menu .input-number').addEventListener('input', function (event) {
        if (currentSelectedElement) {
            currentSelectedElement.textContent = event.target.value;
        }
    });






    /* ++++++++++++++++++++++++++++ Heading Text Setting for Choose +++++++++++++++++++++++++++++ */
































    /* ++++++++++++++++++++++++++++ Increase Padding And Margin From B0x +++++++++++++++++++++++++++++ */




    const elementStyles = {};




    document.querySelectorAll('.m-top, .m-right, .m-bottom, .m-left, .p-top, .p-right, .p-bottom, .p-left').forEach(element => {
        let initialY, initialValue;
        let isDragging = false;
        let arrowElement;

        element.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            initialY = e.clientY;
            initialValue = parseInt(element.innerText, 10) || 0;

            // Create and display the directional arrow within the currentSelectedElement
            if (currentSelectedElement) {
                createArrow(element, currentSelectedElement);
            }

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', stopDrag);
        });

        function handleMouseMove(e) {
            if (!isDragging) return;

            const deltaY = initialY - e.clientY;
            const newValue = initialValue + Math.round(deltaY / 10);

            // Set the new value on the element
            element.innerText = newValue;

            // Apply text-shadow if the new value is greater than 0
            if (newValue > 0) {
                element.style.textShadow = '0px 0px 6px #ff5d00, 0px 0px 2px #ff9900, 0px 0px 1px #ffc100, 0px 0px 8px #ff5d00';
            } else {
                element.style.removeProperty('text-shadow');
            }

            // Determine the cssProperty based on the element class
            const cssProperty = element.classList.contains('m-top') ? 'margin-top' :
                element.classList.contains('m-right') ? 'margin-right' :
                    element.classList.contains('m-bottom') ? 'margin-bottom' :
                        element.classList.contains('m-left') ? 'margin-left' :
                            element.classList.contains('p-top') ? 'padding-top' :
                                element.classList.contains('p-right') ? 'padding-right' :
                                    element.classList.contains('p-bottom') ? 'padding-bottom' :
                                        'padding-left';

            // Apply or remove the CSS property based on the newValue
            if (currentSelectedElement) {
                const firstClass = currentSelectedElement.classList[0];
                if (firstClass) {
                    if (newValue > 0) {
                        updateCssForClass(firstClass, cssProperty, `${newValue}px`);
                    } else {
                        // Remove the CSS property if the value is 0
                        removeCssPropertyFromClass(firstClass, cssProperty);
                    }

                    // Update the elementStyles object
                    if (!elementStyles[firstClass]) {
                        elementStyles[firstClass] = { margin: {}, padding: {} };
                    }

                    // Update the corresponding margin or padding value in elementStyles
                    if (cssProperty.startsWith('margin')) {
                        elementStyles[firstClass].margin[cssProperty] = newValue;
                    } else {
                        elementStyles[firstClass].padding[cssProperty] = newValue;
                    }
                }
            }

            // Update the background element size dynamically
            if (element.bgElement) {
                // Dynamically update bgElement size based on cssProperty
                if (cssProperty.startsWith('margin')) {
                    // For margins, extend bgElement outside the element
                    if (cssProperty === 'margin-top') {
                        element.bgElement.style.height = `${newValue}px`;
                        element.bgElement.style.top = `-${newValue}px`;
                    } else if (cssProperty === 'margin-bottom') {
                        element.bgElement.style.height = `${newValue}px`;
                        element.bgElement.style.bottom = `-${newValue}px`;
                    } else if (cssProperty === 'margin-left') {
                        element.bgElement.style.width = `${newValue}px`;
                        element.bgElement.style.left = `-${newValue}px`;
                    } else if (cssProperty === 'margin-right') {
                        element.bgElement.style.width = `${newValue}px`;
                        element.bgElement.style.right = `-${newValue}px`;
                    }
                } else {
                    // For padding, keep bgElement inside the element
                    if (cssProperty === 'padding-top' || cssProperty === 'padding-bottom') {
                        element.bgElement.style.height = `${newValue}px`;
                    } else {
                        element.bgElement.style.width = `${newValue}px`;
                    }
                }
            }
        }

        function createArrow(element, targetElement) {


            // Set arrow color based on margin or padding
            const isMargin = element.className.startsWith('m-');

            // Position the target element to relative to contain the arrow element
            targetElement.style.position = 'relative';


            // Determine the cssProperty based on the element class
            const cssProperty = element.classList.contains('m-top') ? 'margin-top' :
                element.classList.contains('m-right') ? 'margin-right' :
                    element.classList.contains('m-bottom') ? 'margin-bottom' :
                        element.classList.contains('m-left') ? 'margin-left' :
                            element.classList.contains('p-top') ? 'padding-top' :
                                element.classList.contains('p-right') ? 'padding-right' :
                                    element.classList.contains('p-bottom') ? 'padding-bottom' :
                                        'padding-left';

            const bgElement = document.createElement('div');
            bgElement.className = `padding-margin-background ${isMargin ? 'margin-bg' : 'padding-bg'}`;
            bgElement.style.position = 'absolute';
            bgElement.style.backgroundColor = isMargin ? '#4b4b4b' : '#4b4b4b';

            // Initial position and size for padding and margin
            if (cssProperty === 'margin-top' || cssProperty === 'padding-top') {
                bgElement.style.top = '0';
                bgElement.style.left = '0';
                bgElement.style.width = '100%';
                bgElement.style.height = '0';
            } else if (cssProperty === 'margin-right' || cssProperty === 'padding-right') {
                bgElement.style.top = '0';
                bgElement.style.right = '0';
                bgElement.style.width = '0';
                bgElement.style.height = '100%';
            } else if (cssProperty === 'margin-bottom' || cssProperty === 'padding-bottom') {
                bgElement.style.bottom = '0';
                bgElement.style.left = '0';
                bgElement.style.width = '100%';
                bgElement.style.height = '0';
            } else if (cssProperty === 'margin-left' || cssProperty === 'padding-left') {
                bgElement.style.top = '0';
                bgElement.style.left = '0';
                bgElement.style.width = '0';
                bgElement.style.height = '100%';
            }

            targetElement.appendChild(bgElement);

            element.bgElement = bgElement;
        }

        function stopDrag() {
            isDragging = false;
            if (element.bgElement) {
                element.bgElement.remove(); // Remove the background when dragging stops
                element.bgElement = null; // Clear the reference
            }
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', stopDrag);
        }
    });





    /* -------------------------- Store Data Padding Margin ---------------------- */

    function populateMarginPaddingValues(className) {
        const element = document.querySelector(`.${className}`);
        const styles = elementStyles[className] || { margin: {}, padding: {} };

        // Check computed styles as a fallback if no stored values exist
        const computedStyles = element ? window.getComputedStyle(element) : null;

        // Function to get a value from stored styles or computed styles and remove "px"
        function getStyleValue(type, side) {
            let value = styles[type][`${type}-${side}`] || (computedStyles ? computedStyles.getPropertyValue(`${type}-${side}`) : '0px');
            return String(value).replace('px', '');  // Convert to string and remove 'px' suffix for display
        }

        // Helper function to update text-shadow based on value
        function applyTextShadow(element, value) {
            if (value > 0) {
                element.style.textShadow = '0px 0px 6px #ff5d00, 0px 0px 2px #ff9900, 0px 0px 1px #ffc100, 0px 0px 8px #ff5d00';
            } else {
                element.style.textShadow = 'none';
            }
        }

        // Update the margin inputs and apply text-shadow
        document.querySelector('.m-top').innerText = getStyleValue('margin', 'top');
        applyTextShadow(document.querySelector('.m-top'), getStyleValue('margin', 'top'));

        document.querySelector('.m-right').innerText = getStyleValue('margin', 'right');
        applyTextShadow(document.querySelector('.m-right'), getStyleValue('margin', 'right'));

        document.querySelector('.m-bottom').innerText = getStyleValue('margin', 'bottom');
        applyTextShadow(document.querySelector('.m-bottom'), getStyleValue('margin', 'bottom'));

        document.querySelector('.m-left').innerText = getStyleValue('margin', 'left');
        applyTextShadow(document.querySelector('.m-left'), getStyleValue('margin', 'left'));

        // Update the padding inputs and apply text-shadow
        document.querySelector('.p-top').innerText = getStyleValue('padding', 'top');
        applyTextShadow(document.querySelector('.p-top'), getStyleValue('padding', 'top'));

        document.querySelector('.p-right').innerText = getStyleValue('padding', 'right');
        applyTextShadow(document.querySelector('.p-right'), getStyleValue('padding', 'right'));

        document.querySelector('.p-bottom').innerText = getStyleValue('padding', 'bottom');
        applyTextShadow(document.querySelector('.p-bottom'), getStyleValue('padding', 'bottom'));

        document.querySelector('.p-left').innerText = getStyleValue('padding', 'left');
        applyTextShadow(document.querySelector('.p-left'), getStyleValue('padding', 'left'));

    }





    /* ++++++++++++++++++++++++++++ Increase Padding And Margin From B0x +++++++++++++++++++++++++++++ */
















































    // +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ Hover and Select




    // Reset panel if no element is selected
    function resetPanelIfNoSelection() {
        const selectedElements = previewContent.querySelectorAll('.selected');
        if (selectedElements.length === 0) {
            showSelectionMessage();
        }
    }

    // Initially show "Make a selection" message if no elements are selected
    resetPanelIfNoSelection();







    document.addEventListener('mouseover', function (e) {


        // Define the class names you want to check for
        const validClassNames = ['position-choice', 'text-choice1', 'text-choice2', 'clip-choice', 'align-choice1', 'align-choice2', 'blending-choice', 'cursor-choice',];

        // Check if the hovered element contains any of the valid class names
        const hasValidClass = validClassNames.some(className => e.target.classList.contains(className));

        if (hasValidClass) {
            const cssRule = e.target.getAttribute('add-css'); // Get the CSS rule from the 'add-css' attribute

            if (currentSelectedElement && cssRule) {
                const targetClass = classNameInput.value.trim() || firstClass; // Use the selected element's class

                // Apply the regular CSS rule (e.g., "position: absolute")
                const [cssProperty, cssValue] = cssRule.split(':');
                updateCssForClass(targetClass, cssProperty.trim(), cssValue.trim());
            }
        }

        // If the hover happens within previewContent
        if (previewContent.contains(e.target)) {
            // Skip if already selected
            if (!e.target.classList.contains('selected')) {
                e.target.classList.add('hovering');
            }

            // Show tag name temporarily on hover
            addTagNameToElement(e.target, false);
        }
    });


    document.addEventListener('mouseout', function (e) {

        // Define the class names you want to check for
        const validClassNames = ['position-choice', 'text-choice1', 'text-choice2', 'clip-choice', 'align-choice1', 'align-choice2', 'blending-choice', 'cursor-choice',];

        // Check if the hovered element contains any of the valid class names
        const hasValidClass = validClassNames.some(className => e.target.classList.contains(className));

        // Prevent removing CSS if the element was clicked
        if (hasValidClass && !e.target.classList.contains('clicked')) {
            const cssRule = e.target.getAttribute('add-css'); // Get the CSS rule from the 'add-css' attribute

            if (currentSelectedElement && cssRule) {
                const targetClass = classNameInput.value.trim() || firstClass; // Use the selected element's class

                // Remove the hover CSS property from the current selected element's class
                const cssProperty = cssRule.split(':')[0].trim();
                removeCssPropertyFromClass(targetClass, cssProperty);
            }
        }

        // If the hover happens within previewContent
        if (previewContent.contains(e.target)) {
            // Skip if element is selected (tag name should persist)
            e.target.classList.remove('hovering');
            if (e.target.classList.contains('selected')) {
                e.target.classList.remove('hovering');
            }

            // Remove the temporary tag name from hovered element
            if (nameHoverDisplay) {
                nameHoverDisplay.textContent = ''; // Clear the h1 element text
            }
        }
    });

    // Reference to the external h1 element where the class name should appear
    const nameHoverDisplay = document.querySelector('.name-hover-select');

    function addTagNameToElement(element) {
        const firstClassName = element.classList[0]; // Get the first class name

        if (firstClassName && nameHoverDisplay) {
            // Limit the class name display to 15 characters
            const truncatedClassName = firstClassName.length > 15
                ? firstClassName.substring(0, 9) + "..." // Show first 12 characters + "..."
                : firstClassName;

            // Update the external h1 element with the truncated class name
            nameHoverDisplay.textContent = truncatedClassName;
        }
    }




















    /* ++++++++++++++++++++++++++++ Choose Border and Border-Radius +++++++++++++++++++++++++++++ */






    // Function to handle click events for both border and radius sections
    function handleSectionClick(sectionClass, classMappings) {
        // Get div elements to add "activate" class
        const sectionDivs = document.querySelectorAll(`.${sectionClass} div`);
        // Get text elements for adding "radius-shadow"
        const targetTexts = document.querySelectorAll('.flex-align p');

        // Add click event listener to each div in the specified section
        sectionDivs.forEach(div => {
            div.addEventListener('click', function () {
                // Remove "activate" class from all divs in this section
                sectionDivs.forEach(d => d.classList.remove(`activate-${sectionClass}`));
                div.classList.add(`activate-${sectionClass}`);

                // Remove "radius-shadow" from all target <p> elements
                targetTexts.forEach(p => p.classList.remove('radius-shadow'));

                // Find the target text for the clicked div based on classMappings
                const targetText = classMappings.find(mapping => div.classList.contains(mapping.divClass)).text;

                // Add "radius-shadow" to the matching <p> element
                targetTexts.forEach(p => {
                    if (p.textContent.trim() === targetText) {
                        p.classList.add('radius-shadow');
                    }
                });
            });
        });
    }

    // Define mappings for classes and corresponding text for both sections
    const radiusMappings = [
        { divClass: 'top-left-radius', text: 'Radius-top-left' },
        { divClass: 'top-right-radius', text: 'Radius-top-right' },
        { divClass: 'bottom-left-radius', text: 'Radius-bottom-left' },
        { divClass: 'bottom-right-radius', text: 'Radius-bottom-right' },
        { divClass: 'center-radius', text: 'Radius' }
    ];

    const borderMappings = [
        { divClass: 'top-border', text: 'Border-top-width' },
        { divClass: 'right-border', text: 'Border-right-width' },
        { divClass: 'bottom-border', text: 'Border-bottom-width' },
        { divClass: 'left-border', text: 'Border-left-width' },
        { divClass: 'center-border', text: 'Border-width' }
    ];

    // Call the function for both radius and border sections
    handleSectionClick('square-radius', radiusMappings);
    handleSectionClick('square-border', borderMappings);





    /* ++++++++++++++++++++++++++++ Choose Border and Border-Radius +++++++++++++++++++++++++++++ */




    /* +++++++++++++++++++++++++++++++++++ Background Setting +++++++++++++++++++++++++++++++++++ */


    // Selectors for the main background-style div and the background menu
    const backgroundStyleDiv = document.querySelector('.background-style');
    const backgroundMenu = document.querySelector('.background-menu');

    // Object to store data for each selected element
    const previewContentData = {};

    // Custom HTML content to use inside each dynamically created div
    const customContentHTML = `
   <p>Image & Gradient</p>
   <div class="flex-align gap10">
       <img class="small-img" src="/Icon/add.png" alt="">
       <img class="small-img" src="/Icon/add.png" alt="">
   </div>
   `;



    // Function to create or retrieve a unique ID for an element
    function getOrCreateElementId(element) {
        if (!element.id) {
            element.id = `element-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        }
        return element.id;
    }

    // Function to create and store a new background div for the currentSelectedElement
    function createNewBackgroundDiv() {
        if (!currentSelectedElement) {
            alert("Please select an element in previewContent first.");
            return;
        }

        const elementId = getOrCreateElementId(currentSelectedElement);

        // Check if the HTML for this element already exists
        if (previewContentData[elementId]) {
            alert("HTML already created for this element.");
            return;
        }

        // Create a new background div
        const newDiv = document.createElement('div');
        newDiv.classList.add('flex-sb-align', 'm-b-20', 'b-2');
        newDiv.innerHTML = customContentHTML;

        // Insert the new div immediately after the backgroundStyleDiv in the DOM
        backgroundStyleDiv.parentNode.insertBefore(newDiv, backgroundStyleDiv.nextSibling);

        // Show the background menu
        backgroundMenu.classList.remove('none');

        // Store the new div for the currentSelectedElement
        previewContentData[elementId] = newDiv;

        // Add a click event to newDiv to show the background menu
        newDiv.addEventListener('click', (event) => {
            event.stopPropagation();
            backgroundMenu.classList.remove('none');
        });
    }

    // Function to load data for the selected element
    function loadElementData(element) {
        const elementId = getOrCreateElementId(element);

        // Hide all background divs initially
        Object.values(previewContentData).forEach(div => {
            div.classList.add('none-important');
        });

        // Show only the background div for the currently selected element
        if (previewContentData[elementId]) {
            previewContentData[elementId].classList.remove('none-important');
        } else {
            console.log("No data stored for this element.");
        }
    }


    // Utility function to create or retrieve a unique ID for an element
    function getOrCreateElementId(element) {
        if (!element.id) {
            element.id = `element-${Date.now()}`;
        }
        return element.id;
    }


    // Event listener for backgroundStyleDiv to create a new div on click
    backgroundStyleDiv.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents the body click handler from hiding backgroundMenu
        createNewBackgroundDiv();
    });









    /* +++++++++++++++++++++++++++++++++ Background Setting  ++++++++++++++++++++++++++++++++++++ */





    /* +++++++++++++++++++++++++++++++++ Box Shadow Setting  ++++++++++++++++++++++++++++++++++++ */




    const outsideBoxShadowList = [];
    const insideBoxShadowList = [];
    let currentSelectedShadowIndex = 0; // Tracks the currently selected box shadow
    let isManagingInside = false; // Tracks whether we're managing inside shadows
    // Store box-shadow data for each element
    const elementBoxShadowData = new Map();


    // Add a new box shadow
    document.querySelector('.box-shadow-create').addEventListener('click', () => {
        const newIndex = isManagingInside
            ? insideBoxShadowList.length
            : outsideBoxShadowList.length;

        const newBoxShadow = {
            horizontal: 0,
            vertical: 0,
            blur: 0,
            color: '#000000',
            inset: isManagingInside,
        };

        const targetList = isManagingInside ? insideBoxShadowList : outsideBoxShadowList;
        targetList.push(newBoxShadow);

        const containerId = isManagingInside ? 'inside-box-shadow-list' : 'outside-box-shadow-list';
        const boxShadowListContainer = document.getElementById(containerId);

        const customContentHTML = document.createElement('div');
        customContentHTML.className = 'box-shadow-item';
        customContentHTML.dataset.index = newIndex; // Use a data attribute to store the index
        customContentHTML.innerHTML = `
        <div class="flex-sb-align m-tb-10 gap10 b-2">
            <div class="flex-col gap10">
                <p>Box Shadow ${newIndex + 1}</p>
                <p class="box-shadow-value" style="color: white;">0px 0px 0px #000000</p>
            </div>
            
            <img class="small-img delete-box-shadow" src="/Icon/garbage.png" alt="">
        </div>
    `;

        // Update displayed shadow value dynamically
        function updateShadowDisplay() {
            const shadow = targetList[customContentHTML.dataset.index];
            const inset = shadow.inset ? 'inset ' : '';
            customContentHTML.querySelector('.box-shadow-value').textContent =
                `${inset}${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
        }

        // Handle selection
        customContentHTML.addEventListener('click', () => {
            selectBoxShadow(parseInt(customContentHTML.dataset.index, 10), isManagingInside);
        });

        // Handle deletion
        customContentHTML.querySelector('.delete-box-shadow').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteBoxShadow(parseInt(customContentHTML.dataset.index, 10), isManagingInside);
            customContentHTML.remove();
            refreshBoxShadowIndices(targetList, containerId); // Re-index remaining shadows
        });

        boxShadowListContainer.appendChild(customContentHTML);
        updateShadowDisplay();
        selectBoxShadow(newIndex, isManagingInside);

        saveBoxShadowData();
    });

    function saveBoxShadowData() {
        if (!currentSelectedElement) return;

        // Store the current shadow lists in the Map for the selected element
        elementBoxShadowData.set(currentSelectedElement, {
            insideBoxShadowList: [...insideBoxShadowList],
            outsideBoxShadowList: [...outsideBoxShadowList]
        });
    }


    // Select a shadow
    function selectBoxShadow(index, isInside) {
        const targetList = isInside ? insideBoxShadowList : outsideBoxShadowList;
        const selectedShadow = targetList[index];

        if (!selectedShadow) return; // Prevent error if shadow is undefined
        currentSelectedShadowIndex = index;
        isManagingInside = isInside;

        document.getElementById('horizontal-offset').value = selectedShadow.horizontal;
        document.getElementById('vertical-offset').value = selectedShadow.vertical;
        document.getElementById('blur-radius').value = selectedShadow.blur;
        document.getElementById('shadow-color').value = selectedShadow.color;
    }

    // Refresh indices and update displayed numbers
    function refreshBoxShadowIndices(targetList, containerId) {
        const container = document.getElementById(containerId);
        Array.from(container.children).forEach((item, index) => {
            item.dataset.index = index;
            item.querySelector('p:first-child').textContent = `Box Shadow ${index + 1}`;
        });
        updateBoxShadowCSS();
    }


    // Delete a shadow
    function deleteBoxShadow(index, isInside) {
        const targetList = isInside ? insideBoxShadowList : outsideBoxShadowList;
        targetList.splice(index, 1);

        const containerId = isInside ? 'inside-box-shadow-list' : 'outside-box-shadow-list';
        const boxShadowItems = document.getElementById(containerId).children;
        if (boxShadowItems[index]) boxShadowItems[index].remove();

        updateBoxShadowCSS();
    }

    /* function updateBoxShadowCSS() {
        const outsideBoxShadowString = outsideBoxShadowList.map(shadow => {
            return `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
        }).join(', ');

        const insideBoxShadowString = insideBoxShadowList.map(shadow => {
            return `inset ${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
        }).join(', ');

        const finalBoxShadow = [outsideBoxShadowString, insideBoxShadowString]
            .filter(Boolean)
            .join(', ');

        if (currentSelectedElement) {
            const firstClass = currentSelectedElement.classList[0] || '';
            if (firstClass) {
                // Update the box-shadow dynamically for the first class
                updateCssForClass(firstClass, 'box-shadow', finalBoxShadow);
            }
        }
    } */

    function updateBoxShadowCSS() {
        const outsideBoxShadowString = outsideBoxShadowList
            .map(shadow => `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`)
            .join(', ');

        const insideBoxShadowString = insideBoxShadowList
            .map(shadow => `inset ${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`)
            .join(', ');

        const finalBoxShadow = [outsideBoxShadowString, insideBoxShadowString]
            .filter(Boolean) // Remove empty strings
            .join(', ');

        if (currentSelectedElement) {
            const firstClass = currentSelectedElement.classList[0] || '';
            if (firstClass && finalBoxShadow) { // Update only if the shadow is not empty
                updateCssForClass(firstClass, 'box-shadow', finalBoxShadow);
            }
        }
    }
    
    // Synchronize inputs with shadow updates
    document.querySelectorAll('[add-css^="box-shadow"]').forEach((input) => {
        input.addEventListener('input', () => {
            // Remove numeric suffix from add-css value
            const addCssValue = input.getAttribute('add-css').replace(/\d+$/, '');

            if (addCssValue === 'box-shadow') {
                // Select the correct target list (inside or outside)
                const targetList = isManagingInside ? insideBoxShadowList : outsideBoxShadowList;
                const currentShadow = targetList[currentSelectedShadowIndex];

                if (!currentShadow) return; // Ensure valid shadow is selected

                // Update the shadow properties based on input
                if (input.id === 'horizontal-offset') currentShadow.horizontal = parseInt(input.value, 10) || 0;
                if (input.id === 'vertical-offset') currentShadow.vertical = parseInt(input.value, 10) || 0;
                if (input.id === 'blur-radius') currentShadow.blur = parseInt(input.value, 10) || 0;
                if (input.id === 'shadow-color') currentShadow.color = input.value || '#000000';

                // Update the shadow CSS and the displayed value
                updateBoxShadowCSS();
                updateShadowDisplay(currentSelectedShadowIndex, targetList);
                saveBoxShadowData();
            }
        });
    });
    // Update displayed shadow value dynamically
    function updateShadowDisplay(index, targetList) {
        const shadow = targetList[index];
        if (!shadow) return;

        const insetText = shadow.inset ? 'inset ' : '';
        const boxShadowValue = `${insetText}${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
        const boxShadowItem = document.querySelector(
            `#${isManagingInside ? 'inside-box-shadow-list' : 'outside-box-shadow-list'} .box-shadow-item[data-index="${index}"]`
        );

        if (boxShadowItem) {
            boxShadowItem.querySelector('.box-shadow-value').textContent = boxShadowValue;
        }
    }

    // Handle outside/inside toggle
    document.querySelectorAll('.boxShadow-btn div').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.boxShadow-btn .active').classList.remove('active');
            btn.classList.add('active');

            isManagingInside = btn.classList.contains('btn-bx-inside');
            toggleBoxShadowLists();
        });
    });

    // Toggle the display of shadow lists
    function toggleBoxShadowLists() {
        document.getElementById('outside-box-shadow-list').style.display = isManagingInside ? 'none' : 'block';
        document.getElementById('inside-box-shadow-list').style.display = isManagingInside ? 'block' : 'none';
    }






    // ========================= faghat color store mond
    function loadBoxShadowData() {
        if (!currentSelectedElement) return;

        const boxShadowData = elementBoxShadowData.get(currentSelectedElement);

        // Clear current lists
        insideBoxShadowList.splice(0, insideBoxShadowList.length);
        outsideBoxShadowList.splice(0, outsideBoxShadowList.length);

        if (boxShadowData) {
            // Load data into lists
            insideBoxShadowList.push(...boxShadowData.insideBoxShadowList);
            outsideBoxShadowList.push(...boxShadowData.outsideBoxShadowList);
        }

        // Refresh the UI to show the loaded box-shadow data
        refreshBoxShadowUI();
    }

    function refreshBoxShadowUI() {
        // Clear the containers
        const insideContainer = document.getElementById('inside-box-shadow-list');
        const outsideContainer = document.getElementById('outside-box-shadow-list');
        insideContainer.innerHTML = '';
        outsideContainer.innerHTML = '';

        // Repopulate inside shadows
        insideBoxShadowList.forEach((shadow, index) => {
            addBoxShadowToUI(insideContainer, shadow, index, true);
        });

        // Repopulate outside shadows
        outsideBoxShadowList.forEach((shadow, index) => {
            addBoxShadowToUI(outsideContainer, shadow, index, false);
        });
    }

    function addBoxShadowToUI(container, shadow, index, isInside) {
        const customContentHTML = document.createElement('div');
        customContentHTML.className = 'box-shadow-item';
        customContentHTML.dataset.index = index;

        const insetText = shadow.inset ? 'inset ' : '';
        const boxShadowValue = `${insetText}${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;

        customContentHTML.innerHTML = `
            <div class="flex-sb-align m-tb-10 gap10 b-2">
                <div class="flex-col gap10">
                    <p>Box Shadow ${index + 1}</p>
                    <p class="box-shadow-value" style="color: white;">${boxShadowValue}</p>
                </div>
                <img class="small-img delete-box-shadow" src="/Icon/garbage.png" alt="">
            </div>
        `;

        // Attach event listeners for selection and deletion
        customContentHTML.addEventListener('click', () => {
            selectBoxShadow(index, isInside);
        });

        customContentHTML.querySelector('.delete-box-shadow').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteBoxShadow(index, isInside);
            customContentHTML.remove();
            refreshBoxShadowIndices(
                isInside ? insideBoxShadowList : outsideBoxShadowList,
                isInside ? 'inside-box-shadow-list' : 'outside-box-shadow-list'
            );
        });

        container.appendChild(customContentHTML);
    }




    /* +++++++++++++++++++++++++++++++++ Box Shadow Setting  ++++++++++++++++++++++++++++++++++++ */





    /* +++++++++++++++++++++++++++++++++ text Shadow Setting  ++++++++++++++++++++++++++++++++++++ */



    const textShadowList = [];
    let currentSelectedTextShadowIndex = 0; // Tracks the currently selected text-shadow

    // Add a new text-shadow
    document.querySelector('.text-shadow-create').addEventListener('click', () => {
        const newIndex = textShadowList.length;

        const newTextShadow = {
            horizontal: 0,
            vertical: 0,
            blur: 0,
            color: '#000000',
        };

        textShadowList.push(newTextShadow);

        const textShadowListContainer = document.getElementById('text-shadow-list');

        const customContentHTML = document.createElement('div');
        customContentHTML.className = 'text-shadow-item';
        customContentHTML.dataset.index = newIndex; // Use a data attribute to store the index
        customContentHTML.innerHTML = `
            <div class="flex-sb-align m-tb-10 gap10 b-2">
                <div class="flex-col gap10">
                    <p>Text Shadow ${newIndex + 1}</p>
                    <p class="text-shadow-value" style="color: white;">0px 0px 0px #000000</p>
                </div>
                
                <img class="small-img delete-text-shadow" src="/Icon/garbage.png" alt="Delete">
            </div>
        `;

        // Update displayed shadow value dynamically
        function updateShadowDisplay2() {
            const shadow = textShadowList[customContentHTML.dataset.index];
            customContentHTML.querySelector('.text-shadow-value').textContent =
                `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
        }

        // Handle selection
        customContentHTML.addEventListener('click', () => {
            selectTextShadow(parseInt(customContentHTML.dataset.index, 10));
        });

        // Handle deletion
        customContentHTML.querySelector('.delete-text-shadow').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTextShadow(parseInt(customContentHTML.dataset.index, 10));
            customContentHTML.remove();
            refreshTextShadowIndices(); // Re-index remaining shadows
        });

        textShadowListContainer.appendChild(customContentHTML);
        updateShadowDisplay2();
        selectTextShadow(newIndex);
        saveTextShadowData();
    });

    function selectTextShadow(index) {
        currentSelectedTextShadowIndex = index;

        // Update the UI to reflect the selected shadow
        const items = document.querySelectorAll('.text-shadow-item');
        items.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active-shadow');
            } else {
                item.classList.remove('active-shadow');
            }
        });

        // Update the input fields to reflect the selected shadow
        const shadow = textShadowList[index];
        document.getElementById('horizontal-offset2').value = shadow.horizontal;
        document.getElementById('vertical-offset2').value = shadow.vertical;
        document.getElementById('blur-radius2').value = shadow.blur;
        document.getElementById('shadow-color2').value = shadow.color;
    }

    function refreshTextShadowIndices() {
        const container = document.getElementById('text-shadow-list');
        const items = container.querySelectorAll('.text-shadow-item');

        items.forEach((item, index) => {
            const shadow = textShadowList[index];
            const textShadowValue = `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
            item.querySelector('.text-shadow-value').textContent = textShadowValue;
            item.querySelector('p:first-child').textContent = `Text Shadow ${index + 1}`;
        });
    }


    function deleteTextShadow(index) {
        textShadowList.splice(index, 1);
        saveTextShadowData();
        updateTextShadowCSS();
    }

    document.querySelectorAll('[add-css^="text-shadow"]').forEach((input) => {
        input.addEventListener('input', () => {
            // Remove numeric suffix from add-css value
            const addCssValue = input.getAttribute('add-css').replace(/\d+$/, '');

            if (addCssValue === 'text-shadow') {
                const currentShadow = textShadowList[currentSelectedTextShadowIndex];

                if (!currentShadow) return; // Ensure valid shadow is selected

                // Update the shadow properties based on input
                if (input.id === 'horizontal-offset2') currentShadow.horizontal = parseInt(input.value, 10) || 0;
                if (input.id === 'vertical-offset2') currentShadow.vertical = parseInt(input.value, 10) || 0;
                if (input.id === 'blur-radius2') currentShadow.blur = parseInt(input.value, 10) || 0;
                if (input.id === 'shadow-color') currentShadow.color = input.value || '#000000';

                // Update the shadow CSS and the displayed value
                updateTextShadowCSS();
                updateShadowDisplay2(currentSelectedTextShadowIndex);
                saveTextShadowData();
            }
        });
    });

    // Function to dynamically update the text-shadow CSS for the current element
    function updateTextShadowCSS() {
        const textShadowString = textShadowList
            .map(shadow => `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`)
            .join(', ');

        if (currentSelectedElement) {
            const firstClass = currentSelectedElement.classList[0] || '';
            if (firstClass) {
                // Update the text-shadow dynamically for the first class
                updateCssForClass(firstClass, 'text-shadow', textShadowString);
            }
        }
    }

    function updateShadowDisplay2(index) {
        const shadow = textShadowList[index];
        if (!shadow) return;

        const textShadowValue = `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
        const textShadowItem = document.querySelector(
            `#text-shadow-list .text-shadow-item[data-index="${index}"]`
        );

        if (textShadowItem) {
            textShadowItem.querySelector('.text-shadow-value').textContent = textShadowValue;
        }
    }

    // Add event listeners for boxShadow and textShadow
    document.querySelector('.boxShadow').addEventListener('click', () => {
        // Add 'active' class to boxShadow, remove it from textShadow
        document.querySelector('.boxShadow').classList.add('activate-shadow');
        document.querySelector('.textShadow').classList.remove('activate-shadow');

        // Show boxShadow-setting, hide textShadow-setting
        document.querySelector('.boxShadow-setting').classList.remove('none');
        document.querySelector('.textShadow-setting').classList.add('none');
    });

    document.querySelector('.textShadow').addEventListener('click', () => {
        // Add 'active' class to textShadow, remove it from boxShadow
        document.querySelector('.textShadow').classList.add('activate-shadow');
        document.querySelector('.boxShadow').classList.remove('activate-shadow');

        // Show textShadow-setting, hide boxShadow-setting
        document.querySelector('.textShadow-setting').classList.remove('none');
        document.querySelector('.boxShadow-setting').classList.add('none');
    });




    // Store text-shadow data for each element// Tracks the currently selected text shadow
    const elementTextShadowData = new Map(); // Stores text-shadow data for elements

    function saveTextShadowData() {
        if (!currentSelectedElement) return;

        // Store the current text-shadow list in the Map for the selected element
        elementTextShadowData.set(currentSelectedElement, [...textShadowList]);
    }

    function loadTextShadowData() {
        if (!currentSelectedElement) return;

        const savedTextShadowData = elementTextShadowData.get(currentSelectedElement);

        // Clear the current text-shadow list
        textShadowList.splice(0, textShadowList.length);

        if (savedTextShadowData) {
            // Load data into the list
            textShadowList.push(...savedTextShadowData);
        }

        // Refresh the UI to display the loaded text-shadow data
        refreshTextShadowUI();
    }

    function refreshTextShadowUI() {
        const container = document.getElementById('text-shadow-list');
        container.innerHTML = '';

        // Repopulate the text-shadow items
        textShadowList.forEach((shadow, index) => {
            addTextShadowToUI(container, shadow, index);
        });
    }

    function addTextShadowToUI(container, shadow, index) {
        const customContentHTML = document.createElement('div');
        customContentHTML.className = 'text-shadow-item';
        customContentHTML.dataset.index = index;

        const textShadowValue = `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;

        customContentHTML.innerHTML = `
        <div class="flex-sb-align m-tb-10 gap10 b-2">
            <div class="flex-col gap10">
                <p>Text Shadow ${index + 1}</p>
                <p class="text-shadow-value" style="color: white;">${textShadowValue}</p>
            </div>
            <img class="small-img delete-text-shadow" src="/Icon/garbage.png" alt="Delete">
        </div>
    `;

        // Attach event listeners for selection and deletion
        customContentHTML.addEventListener('click', () => {
            selectTextShadow(index);
        });

        customContentHTML.querySelector('.delete-text-shadow').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTextShadow(index);
            customContentHTML.remove();
            refreshTextShadowIndices();
        });

        container.appendChild(customContentHTML);
    }




    /* +++++++++++++++++++++++++++++++++ text Shadow Setting  ++++++++++++++++++++++++++++++++++++ */




































    // +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ ADD Element








    // Add event listeners for the draggable elements
    document.querySelectorAll('.bx-col').forEach(function (element) {
        element.setAttribute('draggable', true);

        element.addEventListener('dragstart', function (e) {
            // Store the drag-element type (div, section, etc.) in dataTransfer
            let dragElementType = this.getAttribute('drag-element');
            e.dataTransfer.setData('element-type', dragElementType);
        });
    });

    // Enable the drop area (preview-content)
    let dropArea = document.getElementById('preview-content');

    // Prevent default behavior for dragover event
    dropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move'; // Visual feedback for movement

        const target = e.target.closest('[data-id]'); // Find nearest valid drop target
        if (target) {
            target.classList.add('drop-target'); // Add visual feedback
        }
    });

    dropArea.addEventListener('dragleave', function (e) {
        const target = e.target.closest('[data-id]');
        if (target) {
            target.classList.remove('drop-target'); // Remove visual feedback
        }
    });



    dropArea.addEventListener('drop', function (e) {
        e.preventDefault();

        // Get data from the drag event
        const elementType = e.dataTransfer.getData('element-type');
        const draggedElementId = e.dataTransfer.getData('dragged-element-id');
        const target = e.target.closest('[data-id]'); // Target element in dropArea

        // Remove visual feedback
        const dropTargets = document.querySelectorAll('.drop-target');
        dropTargets.forEach(target => target.classList.remove('drop-target'));

        if (!target && elementType === 'list-item') {
            displayErrorMessage("List items can only be added inside a <ul>.");
            return;
        }

        if (draggedElementId) {
            // Move an existing element
            const draggedElement = document.querySelector(`[data-id="${draggedElementId}"]`);

            if (draggedElement && target && target !== draggedElement) {
                const originalParent = draggedElement.parentElement;
                const originalNextSibling = draggedElement.nextSibling;

                const moveElement = () => {
                    if (target.dataset.id && target.tagName.toLowerCase() === 'div') {
                        target.appendChild(draggedElement);
                    } else {
                        target.parentElement.insertBefore(draggedElement, target.nextSibling);
                    }
                    updateNavigator();
                };

                const undoMove = () => {
                    if (originalParent) {
                        originalParent.insertBefore(draggedElement, originalNextSibling);
                        updateNavigator();
                    }
                };

                // Perform the move and track the change
                moveElement();
                trackChange({
                    do: moveElement,
                    undo: undoMove,
                });
            }
        } else if (elementType) {
            // Create a new element
            const newElement = createNewElement(elementType);

            if (newElement) {
                assignUniqueId(newElement);
                const parent = target ? target.parentElement : dropArea;
                const originalTarget = target;
                const originalNextSibling = target ? target.nextSibling : null;

                const addNewElement = () => {
                    if (elementType === 'list-item') {
                        const parentUl = e.target.closest('ul');
                        if (parentUl) {
                            parentUl.appendChild(newElement);
                        } else {
                            displayErrorMessage("List items can only be added inside a <ul>.");
                            return;
                        }
                    } else if (target) {
                        const targetRect = target.getBoundingClientRect();
                        const dropPosition = e.clientY - targetRect.top;

                        if (dropPosition < targetRect.height / 2) {
                            parent.insertBefore(newElement, target);
                        } else {
                            parent.insertBefore(newElement, target.nextSibling);
                        }
                    } else {
                        dropArea.appendChild(newElement);
                    }

                    makeElementDroppable(newElement);
                    if (['flex-column', 'flex', 'link-block', 'section', 'container', 'div'].includes(elementType)) {
                        assignW2EngineToChild(newElement);
                    } else if (['heading', 'paragraph', 'text', 'text-link'].includes(elementType)) {
                        removeW2EngineFromParent(newElement);
                    }

                    updateNavigator();
                };

                const removeNewElement = () => {
                    newElement.remove();
                    updateNavigator();
                };

                // Perform the creation and track the change
                addNewElement();
                trackChange({
                    do: addNewElement,
                    undo: removeNewElement,
                });
            }
        }
    });

    let FlexColumnCounter = 0;
    let FlexCounter = 0;
    let GridCounter = 0;
    let HeadingCounter = 0;
    let ParagraphCounter = 0;
    let TextLinkCounter = 0;
    let TextCounter = 0;
    let DivCounter = 0;
    let LinkBlockCounter = 0;
    let ContainerCounter = 0;
    let SectionCounter = 0;
    let ButtonCounter = 0;
    let UlCounter = 0;


    function makeElementEditableInPlace(element) {
        element.addEventListener('dblclick', () => {
            // Enable contenteditable and apply desired styles
            element.setAttribute('contenteditable', 'true');
            element.setAttribute('spellcheck', 'true'); // Enable spell check
            element.classList.add('editing'); // Add editing class if needed

            // Apply inline styling directly to maintain the look
            element.style.outline = 'none';
            element.style.border = '1.5px solid #218cff';
            element.style.whiteSpace = 'pre-wrap';

            // Focus the element to start editing immediately
            element.focus();

            // Optionally, remove any tag name display
            element.querySelectorAll('.tag-name-display, .tag-name-display-hover').forEach(tag => tag.remove());

            // Handle blur event to save changes
            element.addEventListener('blur', () => {
                // Remove contenteditable and reset styles
                element.removeAttribute('contenteditable');
                element.removeAttribute('spellcheck');
                element.removeAttribute('data-gramm_editor');
                element.classList.remove('editing'); // Remove editing class if added

                // Reset inline styling to remove edit border after finishing
                element.style.border = '';
                element.style.outline = '';
                element.style.whiteSpace = '';

                // Restore tag name display if needed
                addTagNameToElement(element, true);
            }, { once: true });
        });
    }

    function createNewElement(elementType) {
        let newElement;

        switch (elementType) {
            case 'flex-column':
                FlexColumnCounter++;
                newElement = document.createElement('div');
                newElement.classList.add(`Flex-Block${FlexColumnCounter}`, 'w2-engine-flex-col');
                break;
            case 'flex':
                FlexCounter++;
                newElement = document.createElement('div');
                newElement.classList.add(`Flex${FlexCounter}`, 'w2-engine-flex');
                break;
            case 'grid':
                GridCounter++;
                newElement = document.createElement('div');
                newElement.classList.add(`Grid${GridCounter}`, 'w2-engine-display2');

                // 2. Create 4 divs (columns) inside the grid
                for (let i = 1; i <= 4; i++) {
                    let colDiv = document.createElement('div');

                    // Add class 'col' to each column
                    colDiv.classList.add(`col${i}`, 'w2-engine-bx');

                    // 3. Append each column to the grid container (newElement)
                    newElement.appendChild(colDiv);
                }

                nextColNumber = 5;
                document.querySelector('.little-menu').classList.remove('none');
                break;
            case 'list':
                UlCounter++; // Increment the <ul> counter for the new <ul>
                newElement = document.createElement('ul');
                newElement.classList.add(`ul${UlCounter}`, 'w2-engine-list');
                newElement.setAttribute('data-li-counter', '3'); // Initialize the counter to 3 for the first 3 <li> elements

                // Automatically populate with initial list items
                for (let i = 1; i <= 3; i++) {
                    const liDiv = document.createElement('li');
                    liDiv.classList.add(`li-item${i}`, 'w2-engine-li');
                    newElement.appendChild(liDiv);
                }

                // Set up mutation observer to prevent non-li elements
                const observer = new MutationObserver((mutationsList) => {
                    for (const mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            mutation.addedNodes.forEach((node) => {
                                if (node.tagName !== 'LI') {
                                    node.remove();
                                    displayErrorMessage("Only <li> elements can be added inside <ul>.");
                                }
                            });
                        }
                    }
                });
                observer.observe(newElement, { childList: true });
                break;

            case 'list-item':
                // Get the nearest parent <ul> within the drop area
                const parentUl = dropArea.querySelector('ul'); // Ensure it checks the intended drop area for a valid <ul>

                if (parentUl) {
                    // Get the current counter for this specific <ul> (Each <ul> keeps its own counter)
                    let currentLiCounter = parseInt(parentUl.getAttribute('data-li-counter'), 10);

                    // If no counter is set (first <ul> being created), initialize to 3
                    if (isNaN(currentLiCounter)) {
                        currentLiCounter = 3; // Default to 3 if no counter is set
                    }

                    const nextLiIndex = currentLiCounter + 1;

                    // Create the new <li> element
                    newElement = document.createElement('li');
                    newElement.classList.add(`li-item${nextLiIndex}`, 'w2-engine-li');
                    parentUl.appendChild(newElement); // Append to the <ul>

                    // Update the counter for the <ul>
                    parentUl.setAttribute('data-li-counter', nextLiIndex); // Increment the counter for the next <li>
                } else {
                    // Show an error message to the user
                    displayErrorMessage("List items can only be added inside a <ul> with class 'w2-engine-list'.");
                    return null; // Abort creation
                }
                break;
            case 'heading':
                HeadingCounter++;
                newElement = document.createElement('h1');
                newElement.classList.add(`Heading${HeadingCounter}`, 'w2-engine-text1');
                newElement.textContent = 'Heading';
                makeElementEditableInPlace(newElement); // Make paragraph editable
                document.querySelector('.text-menu').classList.remove('none');
                break;
            case 'paragraph':
                ParagraphCounter++;
                newElement = document.createElement('p');
                newElement.classList.add(`Paragraph${ParagraphCounter}`);
                makeElementEditableInPlace(newElement); // Make paragraph editable
                newElement.textContent = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.';
                break;
            case 'text-link':
                TextLinkCounter++;
                newElement = document.createElement('a');
                newElement.href = "#";
                newElement.classList.add(`Link${TextLinkCounter}`, 'blue');
                newElement.textContent = 'Text Link';
                break;
            case 'text':
                TextCounter++;
                newElement = document.createElement('div');
                newElement.classList.add(`Text${TextCounter}`);
                newElement.textContent = 'Text In Block Of Line';
                break;
            case 'div':
                DivCounter++;
                newElement = document.createElement('div');
                newElement.classList.add(`Div${DivCounter}`, 'w2-engine');
                break;
            case 'link-block':
                LinkBlockCounter++;
                newElement = document.createElement('a');
                newElement.classList.add(`Link-Block${LinkBlockCounter}`, 'w2-engine');
                break;
            case 'container':
                ContainerCounter++;
                newElement = document.createElement('div');
                newElement.classList.add(`Container${ContainerCounter}`, 'w2-engine');
                break;
            case 'section':
                SectionCounter++;
                newElement = document.createElement('div');
                newElement.classList.add(`Section${SectionCounter}`, 'w2-engine');
                break;
            case 'button':
                ButtonCounter++;
                newElement = document.createElement('a');
                newElement.classList.add(`Button${ButtonCounter}`);
                newElement.textContent = 'Button';
                break;
            default:
                return null;
        }

        // Ensure new elements are draggable after a hold
        /* setupDraggableElement(newElement); */
        return newElement;
    }

    function displayErrorMessage(message) {
        const errorElement = document.querySelector('.error-message');
        errorElement.querySelector('.error-text').innerText = message;
        errorElement.classList.remove('none'); // Show error message

        // Hide the error after 5 seconds
        setTimeout(() => {
            errorElement.classList.add('none'); // Hide error message again
        }, 5000);
    }


    // Helper functions
    function removeW2EngineFromParent(element) {
        const parent = element.parentElement; // Now the parent will exist after the element is appended
        if (parent && parent.classList.contains('w2-engine')) {
            console.log(`Removing w2-engine class from parent`, parent);
            parent.classList.remove('w2-engine');
        } else {
            console.log(`No w2-engine class found in parent:`, parent);
        }
    }

    function assignW2EngineToChild(element) {
        const parent = element.parentElement;

        // If parent exists and has 'w2-engine', remove it and assign it to the new element
        if (parent && parent.classList.contains('w2-engine')) {
            console.log('Removing w2-engine from parent and adding to child:', element);
            parent.classList.remove('w2-engine');
        }

        element.classList.add('w2-engine'); // Add 'w2-engine' to the new child element
        console.log('Assigned w2-engine to:', element);
    }


























    // Define colorPickers object for each color picker input
    const colorPickers = {
        'hex-color1': { hue: 0, saturation: 100, brightness: 50, opacity: 1, huePosition: 0, colorPosX: 0, colorPosY: 0 },
        'hex-color2': { hue: 0, saturation: 100, brightness: 50, opacity: 1, huePosition: 0, colorPosX: 0, colorPosY: 0 },
        'hex-color3': { hue: 0, saturation: 100, brightness: 50, opacity: 1, huePosition: 0, colorPosX: 0, colorPosY: 0 },
        'hex-color4': { hue: 0, saturation: 100, brightness: 50, opacity: 1, huePosition: 0, colorPosX: 0, colorPosY: 0 },
        // Add more as needed
    };

    function hslToHex(h, s, l, a) {
        // Convert HSL to RGB first
        const rgb = hslToRgb(h, s, l);

        // Convert RGB to HEX, and add the alpha (opacity) value in HEX format
        const hex = rgbaToHex(rgb[0], rgb[1], rgb[2], a);
        return hex;
    }



    // Convert RGBA to HEX
    function rgbaToHex(r, g, b, a) {
        const hex = (c) => c.toString(16).padStart(2, '0');
        return `#${hex(r)}${hex(g)}${hex(b)}${hex(Math.round(a * 255))}`;
    }

    // HSL to RGB conversion function (same as before)
    function hslToRgb(h, s, l) {
        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    // Function to convert hex to HSL
    function hexToHSL(hex) {
        // Handle 3-character hex (e.g., #F00) and 4-character hex with alpha (e.g., #F00F)
        if (hex.length === 4 || hex.length === 5) {
            hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` + (hex[4] ? `${hex[4]}${hex[4]}` : '');
        }

        // Proceed with the rest of the function for both formats
        let r = parseInt(hex.substring(1, 3), 16) / 255;
        let g = parseInt(hex.substring(3, 5), 16) / 255;
        let b = parseInt(hex.substring(5, 7), 16) / 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: h * 360,
            s: s * 100,
            l: l * 100
        };
    }


    // Query selectors to target all instances of color display and related elements
    const hueBars = document.querySelectorAll('.hue-slider .slider-bar');
    const hueCircles = document.querySelectorAll('.hue-slider .slider-circle');
    const colorDisplays = document.querySelectorAll('.color-display');
    const colorCircles = document.querySelectorAll('.color-display-circle');
    const opacityBars = document.querySelectorAll('.opacity-slider .slider-bar');
    const opacityCircles = document.querySelectorAll('.opacity-slider .slider-circle');


    // Updated `hueCircles` event handler
    hueCircles.forEach((hueCircle, index) => {
        const pickerClass = `hex-color${index + 1}`;

        hueCircle.addEventListener('mousedown', function (e) {
            let onMove = function (event) {
                let hueBarRect = hueBars[index].getBoundingClientRect();
                let x = Math.min(hueBarRect.width, Math.max(0, event.clientX - hueBarRect.left));

                // Update hue circle's style and store position
                hueCircle.style.left = `${x}px`;
                colorPickers[pickerClass].huePosition = x;  // Store position in colorPickers

                let huePercent = x / hueBarRect.width;
                colorPickers[pickerClass].hue = huePercent * 360;

                updateColor(pickerClass);
            };

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', onMove);
            }, { once: true });
        });
    });


    // Draggable color display circles with pickerClass
    colorCircles.forEach((colorCircle, index) => {
        const pickerClass = `hex-color${index + 1}`;
        colorCircle.addEventListener('mousedown', function (e) {
            let onMove = function (event) {
                let displayRect = colorDisplays[index].getBoundingClientRect();
                let x = Math.min(displayRect.width, Math.max(0, event.clientX - displayRect.left));
                let y = Math.min(displayRect.height, Math.max(0, event.clientY - displayRect.top));

                colorCircle.style.left = `${x}px`;
                colorCircle.style.top = `${y}px`;

                colorPickers[pickerClass].saturation = (x / displayRect.width) * 100;
                colorPickers[pickerClass].brightness = 100 - (y / displayRect.height) * 100;

                updateColor(pickerClass);
            };

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', onMove);
            }, { once: true });
        });

        // Click-to-change color on color display
        colorDisplays[index].addEventListener('click', function (e) {
            let displayRect = colorDisplays[index].getBoundingClientRect();
            let x = Math.min(displayRect.width, Math.max(0, e.clientX - displayRect.left));
            let y = Math.min(displayRect.height, Math.max(0, e.clientY - displayRect.top));

            colorCircle.style.left = `${x}px`;
            colorCircle.style.top = `${y}px`;

            colorPickers[pickerClass].saturation = (x / displayRect.width) * 100;
            colorPickers[pickerClass].brightness = 100 - (y / displayRect.height) * 100;

            updateColor(pickerClass);
        });
    });

    // Opacity slider logic with pickerClass
    opacityCircles.forEach((opacityCircle, index) => {
        const pickerClass = `hex-color${index + 1}`;

        opacityCircle.addEventListener('mousedown', function (e) {
            let onMove = function (event) {
                let opacityBarRect = opacityBars[index].getBoundingClientRect();

                // Calculate x position from the left
                let x = Math.min(opacityBarRect.width, Math.max(0, event.clientX - opacityBarRect.left));

                // Update `left` property to simulate right-side behavior
                let leftPosition = x;
                opacityCircle.style.left = `${leftPosition}px`;

                // Calculate opacity based on the x position
                colorPickers[pickerClass].opacity = x / opacityBarRect.width;

                updateColor(pickerClass);
            };

            // Attach event listeners
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', onMove);
            }, { once: true });
        });
    });

    function updateColor(pickerClass) {
        // Ensure colorPickers contains a valid entry for the pickerClass
        if (!colorPickers[pickerClass]) {
            console.error(`No color data found for pickerClass: ${pickerClass}`);
            return;
        }

        const { hue, saturation, brightness, opacity } = colorPickers[pickerClass];
        const hexColor = hslToHex(hue / 360, saturation / 100, brightness / 100, opacity);

        if (!currentSelectedElement) return;

        // Get the first class of the current selected element
        const firstClass = currentSelectedElement.classList[0];
        if (!firstClass) return;

        // Get the CSS property to update
        const inputElements = document.querySelectorAll(`.${pickerClass}`);
        let cssProperty = 'color'; // Default property
        if (inputElements.length > 0) {
            cssProperty = inputElements[0].getAttribute('add-css') || 'color';
        }

        // Get the current value for undo/redo tracking
        let oldColor = '';
        let styleTag = document.getElementById('dynamic-styles');
        if (styleTag) {
            for (let i = 0; i < styleTag.sheet.cssRules.length; i++) {
                const rule = styleTag.sheet.cssRules[i];
                if (rule.selectorText === `.${currentSelectedElement.classList[0]}`) {
                    const computedColor = rule.style[cssProperty];
                    if (computedColor) {
                        // Convert RGBA or any other format to HEX
                        oldColor = rgbaToHex(
                            ...computedColor
                                .match(/\d+(\.\d+)?/g) // Extract RGBA components
                                .slice(0, 3) // Use R, G, B
                                .map(Number), // Convert to numbers
                            parseFloat(computedColor.match(/[\d.]+(?=\))/)?.[0] || 1) // Extract alpha
                        );
                    }
                    break;
                }
            }
        }

        // Define the update logic
        const applyColor = (color) => {
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'dynamic-styles';
                document.head.appendChild(styleTag);
            }

            let existingRule = null;
            for (let i = 0; i < styleTag.sheet.cssRules.length; i++) {
                if (styleTag.sheet.cssRules[i].selectorText === `.${firstClass}`) {
                    existingRule = styleTag.sheet.cssRules[i];
                    break;
                }
            }

            if (existingRule) {
                existingRule.style[cssProperty] = color;
            } else {
                styleTag.sheet.insertRule(
                    `.${firstClass} { ${cssProperty}: ${color}; }`,
                    styleTag.sheet.cssRules.length
                );
            }

            // Update the input value with the new color
            inputElements.forEach(input => (input.value = color));
        };

        // Apply the new color
        applyColor(hexColor);

        // Track undo/redo
        trackChange({
            do: () => applyColor(hexColor),
            undo: () => applyColor(oldColor || ''),
        });

        // Update the UI components
        updateHexInput(hexColor, pickerClass);
        updateCirclesAndDisplay(hue, saturation, brightness, pickerClass);
    }
    // Helper function to update a specific hex-color input field
    function updateHexInput(hex, pickerClass) {
        document.querySelectorAll(`.${pickerClass}`).forEach(input => {
            input.value = hex;
        });
    }

    // Get cssProperty based on pickerClass +++++++++++++++ Store Data
    function setupPickerForIndex(index) {
        const pickerClass = `hex-color${index + 1}`; // Dynamic class like `hex-color1`, `hex-color2`, etc.
        const cssProperty = document.querySelector(`.${pickerClass}`)?.getAttribute('add-css') || '';
        let hexColor = '';
        let opacity = 1; // Default opacity is 1

        if (cssProperty && currentSelectedElement) {
            const currentColor = getComputedStyle(currentSelectedElement)[cssProperty];

            if (currentColor) {
                // Extract RGB and opacity from rgba(r, g, b, a) format if present
                const rgba = currentColor.match(/\d+(\.\d+)?/g);
                if (rgba && rgba.length >= 3) {
                    const [r, g, b] = rgba.slice(0, 3).map(Number);
                    opacity = rgba[3] ? parseFloat(rgba[3]) : 1; // Set opacity if present

                    hexColor = rgbaToHex(r, g, b, opacity);
                    const { h, s, l } = hexToHSL(hexColor);

                    // Update colorPickers with opacity and other properties
                    colorPickers[pickerClass] = {
                        hue: h,
                        saturation: s,
                        brightness: l,
                        opacity: opacity,
                        huePosition: (h / 360) * 100,
                        colorPosX: s,
                        colorPosY: 100 - l
                    };
                }
            }
        }

        updateHexInput(hexColor || '', pickerClass);
        const { hue, saturation, brightness } = colorPickers[pickerClass];
        updateCirclesAndDisplay(hue, saturation, brightness, pickerClass);
    }


    // Event listener setup for each color picker
    Object.keys(colorPickers).forEach(pickerClass => {
        document.querySelectorAll(`.${pickerClass}`).forEach(input => {

            input.addEventListener('input', function () {
                const hexValue = this.value;
                const hsl = hexToHSL(hexValue);

                // Update color picker state
                const state = colorPickers[pickerClass];
                state.hue = hsl.h;
                state.saturation = hsl.s;
                state.brightness = hsl.l;
                // If opacity isn't part of the hex input, default it to 1
                state.opacity = state.opacity || 1;

                // Apply the hex color to the first class of the current selected element based on the add-css attribute
                const cssProperty = this.getAttribute('add-css') || 'color';
                if (currentSelectedElement) {
                    const firstClass = currentSelectedElement.classList[0];
                    if (firstClass) {
                        // Get or create a <style> tag for dynamic styles
                        let styleTag = document.getElementById('dynamic-styles');
                        if (!styleTag) {
                            styleTag = document.createElement('style');
                            styleTag.id = 'dynamic-styles';
                            document.head.appendChild(styleTag);
                        }

                        // Remove any existing rule for this class
                        const rules = Array.from(styleTag.sheet.cssRules);
                        const existingRuleIndex = rules.findIndex(r => r.selectorText === `.${firstClass}`);
                        if (existingRuleIndex > -1) {
                            styleTag.sheet.deleteRule(existingRuleIndex);
                        }

                        // Insert the new rule for the first class
                        const rule = `.${firstClass} { ${cssProperty}: ${hexValue}; }`;
                        styleTag.sheet.insertRule(rule, styleTag.sheet.cssRules.length);
                    }
                }

                // Update display circles and color based on new HSL values
                updateCirclesAndDisplay(state.hue, state.saturation, state.brightness, pickerClass);
            });
        });
    });

    function updateCirclesAndDisplay(hue, saturation, brightness, pickerClass) {
        const pickerData = colorPickers[pickerClass];
        const colorDisplay = document.querySelector(`.color-display[Z-id="${pickerClass}"]`);

        if (colorDisplay) {
            colorDisplay.style.background = `
                 linear-gradient(to bottom, rgba(0, 0, 0, 0), black),
                 linear-gradient(to right, white, hsl(${hue}, 100%, 50%))
             `;

            const hueCircle = document.querySelector(`#hue-circle[Z-id="${pickerClass}"]`);
            const colorCircle = document.querySelector(`#color-display-circle[Z-id="${pickerClass}"]`);
            const hueBar = document.querySelector(`#hue-bar[Z-id="${pickerClass}"]`);
            const opacityCircle = document.querySelector(`#opacity-circle[Z-id="${pickerClass}"]`);
            const opacityBar = document.querySelector(`#opacity-bar[Z-id="${pickerClass}"]`);

            if (hueCircle && colorCircle && hueBar) {
                pickerData.huePosition = (hue / 360) * hueBar.getBoundingClientRect().width;
                pickerData.colorPosX = (saturation / 100) * colorDisplay.getBoundingClientRect().width;
                pickerData.colorPosY = (1 - (brightness / 100)) * colorDisplay.getBoundingClientRect().height;

                hueCircle.style.left = `${pickerData.huePosition}px`;
                colorCircle.style.left = `${pickerData.colorPosX}px`;
                colorCircle.style.top = `${pickerData.colorPosY}px`;
            }

            if (opacityCircle && opacityBar) {
                const opacityPosition = pickerData.opacity * opacityBar.getBoundingClientRect().width; // Calculate from left
                opacityCircle.style.left = `${opacityPosition}px`; // Use `left` instead of `right`
            }
        }
    }




    document.querySelectorAll('.color-picker').forEach(colorPicker => {
        const pickerId = colorPicker.getAttribute('data-picker-id');
        const colorBox = colorPicker.querySelector('.color-box');
        const pickerUI = colorPicker.querySelector(`#picker-ui-${pickerId}`);
        const backdrop = document.querySelector(`.backdrop[data-picker-id="${pickerId}"]`);

        if (colorBox && pickerUI && backdrop) {
            // Toggle visibility when color box is clicked
            colorBox.addEventListener('click', function (event) {
                pickerUI.classList.toggle('visible');
                backdrop.classList.toggle('visible');

                // Prevent the click event from propagating to the document
                event.stopPropagation();
            });

            // Close picker UI and backdrop when clicking anywhere else
            document.addEventListener('click', function (event) {
                if (!colorPicker.contains(event.target)) {
                    pickerUI.classList.remove('visible');
                    backdrop.classList.remove('visible');
                }
            });
        }
    });






    let littleMenu = document.querySelector('.little-menu');
    let closeLittleMenu = document.querySelector('.close-little-menu');

    closeLittleMenu.onclick = function () {
        littleMenu.classList.add('none')
    }

    let textMenu = document.querySelector('.text-menu');
    let closeTextMenu = document.querySelector('.close-text-menu');

    closeTextMenu.onclick = function () {
        textMenu.classList.add('none')
    }
































    // +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ Navigator

    const navigatorDisplay = document.getElementById('navigator-display');

    function buildNavigator(element, container) {

        const elements = element.children;

        Array.from(elements).forEach(el => {
            const firstClassName = el.classList.length > 0 ? el.classList[0] : 'No class';

            let iconSrc = '/Icon/icons8-square-100 (1).png';
            if (el.tagName === 'DIV') {
                iconSrc = '/Icon/icons8-square-100 (1).png';
            }
            else if (el.classList.contains('Container')) {
                iconSrc = '/Icon/container.png';
            }
            else if (el.tagName === 'A') {
                iconSrc = '/Icon/link.png';
            }
            else if (el.tagName === 'H1') {
                iconSrc = '/Icon/h1.png';
            }
            else if (el.tagName === 'H2') {
                iconSrc = '/Icon/h2.png';
            }
            else if (el.tagName === 'H3') {
                iconSrc = '/Icon/h3.png';
            }
            else if (el.tagName === 'H4') {
                iconSrc = '/Icon/h4.png';
            }
            else if (el.tagName === 'H5') {
                iconSrc = '/Icon/h5.png';
            }
            else if (el.tagName === 'H6') {
                iconSrc = '/Icon/h6.png';
            }
            else if (el.tagName === 'section') {
                iconSrc = '/Icon/section-icon.png';
            } else if (el.tagName === 'P') {
                iconSrc = '/Icon/p.png';
            }

            // Create navigator entry
            const elBlock = document.createElement('div');
            elBlock.classList.add('main-navigator');
            elBlock.setAttribute('draggable', 'true'); // Enable drag-and-drop
            elBlock.dataset.targetId = el.dataset.id; // Map to previewContent element
            elBlock.innerHTML = `
            <div class="flex-align gap5">
                <img class="small-img" src="${iconSrc}" alt="${el.tagName}">
                <p class="f-s-13">${firstClassName}</p>
            </div>
        `;

            // Attach drag-and-drop event listeners
            elBlock.addEventListener('dragstart', onNavigatorDragStart);
            elBlock.addEventListener('dragover', onNavigatorDragOver);
            elBlock.addEventListener('dragleave', onNavigatorDragLeave);
            elBlock.addEventListener('drop', onNavigatorDrop);
            elBlock.addEventListener('dragend', onNavigatorDragEnd);

            container.appendChild(elBlock);

            if (el.children.length > 1) {
                const line = document.createElement('div');
                line.classList.add('navigator-line',);
                elBlock.querySelector('.flex-align').appendChild(line);
            }

            const flexAlign = elBlock.querySelector('.flex-align');

            if (flexAlign.children.length > 1) {
                elBlock.classList.add('main-navigator', 'm-l-10');
            }

            // Recursively build the navigator for child elements
            buildNavigator(el, elBlock);
        });
    }

    function updateNavigator() {
        const bodyBlock = document.querySelector('.preview-body');

        if (bodyBlock) {
            // Remove the existing navigator
            const existingMain = bodyBlock.parentElement.querySelector('.main-navigator');
            if (existingMain) existingMain.remove();

            // Create a new navigator container
            const mainBlock = document.createElement('div');
            mainBlock.classList.add('main-navigator');
            bodyBlock.parentElement.appendChild(mainBlock);

            // Build the navigator based on the updated preview content
            buildNavigator(dropArea, mainBlock);
        }
    }

    let draggedNavigatorElement = null;

    function onNavigatorDragStart(event) {
        draggedNavigatorElement = event.target;
        draggedNavigatorElement.classList.add('dragging');
        event.dataTransfer.effectAllowed = 'move';

        const draggedDomElement = findPreviewElementByNavigator(draggedNavigatorElement);
        if (draggedDomElement) {
            event.dataTransfer.setData('dragged-element-id', draggedDomElement.dataset.id);
        }
    }

    function onNavigatorDragOver(event) {
        event.preventDefault(); // Allow dropping
        const targetNavigator = event.target.closest('.main-navigator');

        if (targetNavigator && targetNavigator !== draggedNavigatorElement) {
            const targetRect = targetNavigator.getBoundingClientRect();
            const dropPosition = event.clientY - targetRect.top;

            // Inside drop
            if (dropPosition > targetRect.height / 4 && dropPosition < (3 * targetRect.height) / 4) {
                targetNavigator.classList.add('drag-over-inside');
                targetNavigator.classList.remove('drag-over-outside');
            } else {
                // Outside drop
                targetNavigator.classList.add('drag-over-outside');
                targetNavigator.classList.remove('drag-over-inside');
            }

        }
    }

    function onNavigatorDragLeave(event) {
        const targetElement = event.target.closest('.main-navigator');
        if (targetElement) {
            targetElement.classList.remove('drag-over');
        }
    }

    function onNavigatorDrop(event) {
        event.preventDefault();

        const targetNavigator = event.target.closest('.main-navigator');
        if (!targetNavigator || targetNavigator === draggedNavigatorElement) return;

        const draggedDomElement = findPreviewElementByNavigator(draggedNavigatorElement);
        const targetDomElement = findPreviewElementByNavigator(targetNavigator);

        if (draggedDomElement && targetDomElement) {
            const targetRect = targetNavigator.getBoundingClientRect();
            const dropPosition = event.clientY - targetRect.top;

            const originalParent = draggedDomElement.parentElement;
            const originalNextSibling = draggedDomElement.nextSibling;

            const performMove = () => {
                if (dropPosition < targetRect.height / 4) {
                    // Drop above target
                    targetDomElement.parentElement.insertBefore(draggedDomElement, targetDomElement);
                } else if (dropPosition > (3 * targetRect.height) / 4) {
                    // Drop below target
                    targetDomElement.parentElement.insertBefore(draggedDomElement, targetDomElement.nextSibling);
                } else {
                    // Drop inside target
                    targetDomElement.appendChild(draggedDomElement);
                }
                updateNavigator(); // Reflect changes in the navigator
            };

            const undoMove = () => {
                if (originalParent) {
                    originalParent.insertBefore(draggedDomElement, originalNextSibling);
                    updateNavigator(); // Reflect original state in the navigator
                }
            };

            // Perform the move and track the change
            performMove();
            trackChange({
                do: performMove,
                undo: undoMove,
            });
        }

        // Clean up
        document.querySelectorAll('.drag-over-outside, .drag-over-inside').forEach(el => el.classList.remove('drag-over-outside', 'drag-over-inside'));
        document.querySelectorAll('.drop-placeholder').forEach(el => el.remove());
        draggedNavigatorElement.classList.remove('dragging');
        draggedNavigatorElement = null;
    }
    function onNavigatorDragEnd() {
        document.querySelectorAll('.dragging, .drag-over').forEach(el => {
            el.classList.remove('dragging', 'drag-over');
        });
        draggedNavigatorElement = null;
    }

    function assignUniqueId(element) {
        const uniqueId = `element-${Date.now()}`; // Generate a unique ID based on timestamp
        element.dataset.id = uniqueId;
    }


    function findPreviewElementByNavigator(navigatorElement) {
        const targetId = navigatorElement.dataset.targetId;
        return document.querySelector(`[data-id="${targetId}"]`);
    }

    function makeElementDroppable(element) {
        element.setAttribute('draggable', 'true'); // Allow dragging

        element.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('dragged-element-id', element.dataset.id);
            e.effectAllowed = 'move';
        });

        element.addEventListener('dragover', function (e) {
            e.preventDefault(); // Allow dropping
        });

        element.addEventListener('drop', function (e) {
            e.preventDefault();
            const draggedElementId = e.dataTransfer.getData('dragged-element-id');
            const draggedElement = document.querySelector(`[data-id="${draggedElementId}"]`);

            if (draggedElement && draggedElement !== element) {
                element.appendChild(draggedElement); // Nest the dragged element
                updateNavigator(); // Sync changes with the navigator
            }
        });
    }
    // Observer to track changes in the preview content and update the navigator
    const observer = new MutationObserver(updateNavigator);
    observer.observe(document.getElementById('preview-content'), {
        childList: true,
        subtree: true
    });

    // Call this once initially to populate the navigator
    updateNavigator();



























    // +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ remove none and add it


    const bgSetting1 = document.querySelector('.bg-setting1');
    const bgSetting2 = document.querySelector('.bg-setting2');
    const bgSetting3 = document.querySelector('.bg-setting3');
    const bgSetting4 = document.querySelector('.bg-setting4');


    const backgroundImage = document.querySelector('.background-image');
    const linearGredient = document.querySelector('.linear-gredient');
    const radialGredient = document.querySelector('.radial-gredient');
    const backgroundColor = document.querySelector('.background-color');
    // Function to handle the visibility toggle
    function toggleNone(target) {
        // First, hide all sections
        backgroundImage.classList.add('none');
        linearGredient.classList.add('none');
        radialGredient.classList.add('none');
        backgroundColor.classList.add('none');

        // Then, remove the 'none' class from the target section
        target.classList.remove('none');
    }

    // Attach click event listeners
    bgSetting1.addEventListener('click', () => toggleNone(backgroundImage));
    bgSetting2.addEventListener('click', () => toggleNone(linearGredient));
    bgSetting3.addEventListener('click', () => toggleNone(radialGredient));
    bgSetting4.addEventListener('click', () => toggleNone(backgroundColor));


    document.querySelectorAll('.buttons4 .bg-btn').forEach(point => {
        point.addEventListener('click', function () {
            const group = this.closest('.buttons4');
            group.querySelectorAll(`.bg-btn`).forEach(btn => btn.classList.remove('active'));

            // Add 'active' to the clicked button
            this.classList.add('active');

        });
    });











































    // +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ this is for assets of image


    const uploadTrigger = document.getElementById('upload-trigger');
    const fileInput = document.getElementById('file-upload');

    uploadTrigger.addEventListener('click', () => {
        fileInput.click(); // Simulate click on hidden input
    });

    fileInput.addEventListener('change', async () => {
        const file = fileInput.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload-image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                // Dynamically add the new file to the assets grid
                const assetsGrid = document.querySelector('.assets-grid');
                const newFile = `
                    <div class="asset-item">
                        ${data.fileType === 'image'
                        ? `<img src="${data.fileUrl}" alt="${data.fileName}" class="asset-preview">`
                        : data.fileType === 'video'
                            ? `<video controls><source src="${data.fileUrl}" type="video/mp4"></video>`
                            : `<audio controls><source src="${data.fileUrl}" type="audio/mpeg"></audio>`
                    }
                    </div>
                `;
                assetsGrid.insertAdjacentHTML('beforeend', newFile);

                // Hide placeholder if it exists
                document.querySelector('.menu-box-assets').classList.add('none');
            } else {
                alert('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred. Please try again.');
        }
    });


    // Select the required elements
    const menuAllAssets = document.querySelector('.menu-all-assets');
    const boxAddingAssets = document.querySelector('.box-adding-assets');
    const allAssetsParagraph = boxAddingAssets.querySelector('.flex-sb-align p');
    const assetsGridBox = boxAddingAssets.querySelector('.assets-grid');
    const f1Assets2 = boxAddingAssets.querySelector('.f1-assets2');
    const menuAllAssetsImage = boxAddingAssets.querySelector('.open-menu-all-assets');
    const closeMenuAllAssets = document.querySelector('.menu-all-assets .close-menu-all-assets');

    // Function to reset to default state
    function resetToDefault() {
        // Hide the `.menu-all-assets` div
        menuAllAssets.classList.add('none');

        // Show elements inside `.box-adding-assets`
        allAssetsParagraph.classList.remove('none');
        assetsGridBox.classList.remove('none');
        f1Assets2.classList.remove('none');
        menuAllAssetsImage.classList.remove('none');

        // Remove active class from `.flex-align`
        const flexAlignDiv = boxAddingAssets.querySelector('.flex-align');
        if (flexAlignDiv) {
            flexAlignDiv.classList.remove('fix-flex');
        }
    }

    // When clicking outside, reset the menu
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = menuAllAssets.contains(event.target);
        const isClickInsideTrigger = menuAllAssetsImage.contains(event.target);

        // If the click is outside both `menu-all-assets` and the trigger, reset
        if (!isClickInsideMenu && !isClickInsideTrigger) {
            resetToDefault();
        }
    });

    // When clicking the `menu-all-assets` image, toggle the menu
    menuAllAssetsImage.addEventListener('click', () => {
        // Show the `menu-all-assets` div
        menuAllAssets.classList.remove('none');

        // Hide elements inside `.box-adding-assets`
        allAssetsParagraph.classList.add('none');
        assetsGridBox.classList.add('none');
        f1Assets2.classList.add('none');
        menuAllAssetsImage.classList.add('none');

        // Add the active class to `.flex-align`
        const flexAlignDiv = boxAddingAssets.querySelector('.flex-align');
        if (flexAlignDiv) {
            flexAlignDiv.classList.add('fix-flex');
        }
    });

    // When clicking the close button inside `.menu-all-assets`, reset everything
    closeMenuAllAssets.addEventListener('click', () => {
        resetToDefault();
    });







});


























/* ++++++++++++++++++++++++++++++++ Link +++++++++++++++++++++++++++++++++++++ */



let addElement1 = document.querySelector('.box-add');
let addElement2 = document.querySelector('.box-add2');
let addElement3 = document.querySelector('.box-add3');
let addElement4 = document.querySelector('.box-add4');
let addElement5 = document.querySelector('.box-add5');
let addElement6 = document.querySelector('.box-add6');
let addElement7 = document.querySelector('.box-add7');
let addElement8 = document.querySelector('.box-add8');
let addElement9 = document.querySelector('.box-add9');

let boxAdding = document.querySelector('.box-adding-html');
let boxNavigator = document.querySelector('.box-adding-navigator');
let boxPages = document.querySelector('.box-adding-pages');
let boxAssets = document.querySelector('.box-adding-assets');
let boxDatabase = document.querySelector('.box-adding-database');
let boxLaravel = document.querySelector('.box-adding-laravel');
let boxCss = document.querySelector('.box-adding-css');
let boxJs = document.querySelector('.box-adding-js');
let boxThreeJs = document.querySelector('.box-adding-threejs');





addElement1.onclick = function () {
    addElement1.classList.toggle('active')
    boxAdding.classList.toggle('active')
    updatePreviewContentSize(); // Update size after changing width
}


addElement2.onclick = function () {
    addElement2.classList.toggle('active')
    boxNavigator.classList.toggle('active')
    updatePreviewContentSize(); // Update size after changing width
}
addElement3.onclick = function () {
    addElement3.classList.toggle('active')
    boxPages.classList.toggle('active')
    updatePreviewContentSize(); // Update size after changing width
}
addElement5.onclick = function () {
    addElement5.classList.toggle('active')
    boxDatabase.classList.toggle('active')
    updatePreviewContentSize(); // Update size after changing width
}

addElement4.onclick = function () {
    addElement4.classList.toggle('active')
    boxAssets.classList.toggle('active')
    updatePreviewContentSize(); // Update size after changing width
}




let layoutsBtn = document.querySelector('.layouts');
let elementsBtn = document.querySelector('.elements');

let addOption = document.querySelector('.menu-box-add');
let layoutOption = document.querySelector('.menu-box-layout');


layoutsBtn.onclick = function () {
    layoutsBtn.classList.add('active')
    elementsBtn.classList.remove('active')
    layoutOption.classList.add('active')
    addOption.classList.remove('active')

}
elementsBtn.onclick = function () {
    layoutsBtn.classList.remove('active')
    elementsBtn.classList.add('active')
    layoutOption.classList.remove('active')
    addOption.classList.add('active')
}

let otherMenu = document.querySelector('.other-menu');

otherMenu.onclick = function () {
    otherMenu.classList.toggle('active')
}

document.addEventListener('click', function (event) {
    // Check if the click was outside the otherMenu element
    if (!otherMenu.contains(event.target)) {
        otherMenu.classList.remove('active');
    }

    if (currentPositionAdd && !event.target.closest('.select')) {
        currentPositionAdd.classList.remove('show');
        currentPositionAdd = null;  // Reset the currentPositionAdd reference
    }


    const backgroundMenu = document.querySelector('.background-menu');

    if (!backgroundMenu.contains(event.target) &&
        !event.target.closest('.background-style') &&
        !event.target.closest('.flex-sb-align')) {
        backgroundMenu.classList.add('none'); // Add 'none' class to hide backgroundMenu
    }
});




let styleGroup2 = document.querySelector('.style-group2');
let styleGroup3 = document.querySelector('.style-group3');


let boxLayout = document.querySelector('.box-layout');
let boxSpacing = document.querySelector('.box-spacing');
let boxSize = document.querySelector('.box-size');
let boxPosition = document.querySelector('.box-position');
let boxTypography = document.querySelector('.box-typography');
let boxBackground = document.querySelector('.box-background');
let boxBorder = document.querySelector('.box-border');
let boxRadius = document.querySelector('.box-radius');
let boxShadows = document.querySelector('.box-shadows');
let boxOther = document.querySelector('.box-other');




let layout = document.querySelector('.layout');
let spacing = document.querySelector('.spacing');
let size = document.querySelector('.size');
let position = document.querySelector('.position');
let typography = document.querySelector('.typography');
let background = document.querySelector('.background');
let border = document.querySelector('.border');
let radius = document.querySelector('.radius');
let shadows = document.querySelector('.shadows');
let other = document.querySelector('.other');

let resetStyles = document.querySelectorAll('.reset-styles');

boxLayout.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    layout.classList.add('show')
}

boxSpacing.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    spacing.classList.add('show')
}

boxSize.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    size.classList.add('show')
}

boxPosition.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    position.classList.add('show')
}

boxTypography.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    typography.classList.add('show')
}

boxBackground.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    background.classList.add('show')
}

boxBorder.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    border.classList.add('show')
}


boxRadius.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    radius.classList.add('show')
}


boxShadows.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    shadows.classList.add('show')
}

boxOther.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    other.classList.add('show')
}



resetStyles.forEach(resetStyles => {
    resetStyles.onclick = function () {
        styleGroup2.classList.remove('none')
        styleGroup3.classList.remove('show')
        layout.classList.remove('show')
        spacing.classList.remove('show')
        size.classList.remove('show')
        position.classList.remove('show')
        shadows.classList.remove('show')
        typography.classList.remove('show')
        background.classList.remove('show')
        border.classList.remove('show')
        radius.classList.remove('show')
        other.classList.remove('show')
    }
});
























let Select1 = document.querySelector('.select1');

const positionText = document.getElementById('positionText');


const selectElements = document.querySelectorAll('.select');

// To track the currently open positionAdd
let currentPositionAdd = null;

// Loop through each select element and add an event listener
selectElements.forEach(function (select) {
    select.addEventListener('click', function (event) {
        const positionAdd = select.querySelector('.position-add');

        // Close any other open positionAdd if the user clicks another select
        if (currentPositionAdd && currentPositionAdd !== positionAdd) {
            currentPositionAdd.classList.remove('show');
        }

        // Toggle the 'show' class for the relevant 'position-add'
        if (positionAdd.classList.contains('show')) {
            positionAdd.classList.remove('show');  // Hide if already visible
        } else {
            positionAdd.classList.add('show');     // Show if hidden
        }

        // Update the currently open positionAdd
        currentPositionAdd = positionAdd;

        // Stop propagation only if necessary (e.g., to avoid closing the menu)
        if (!event.target.classList.contains('position-choice') &&
            !event.target.classList.contains('text-choice1') &&
            !event.target.classList.contains('text-choice2') &&
            !event.target.classList.contains('clip-choice') &&
            !event.target.classList.contains('align-choice1') &&
            !event.target.classList.contains('align-choice2') &&
            !event.target.classList.contains('blending-choice')&&
            !event.target.classList.contains('cursor-choice')) {
            event.stopPropagation(); // Keep this for toggling the menu without closing
        }
    });
});



// Select all instances of .description-css
document.querySelectorAll('.description-css').forEach(descriptionCss => {
    const positionAdd = descriptionCss.closest('.position-add'); // Find the related position-add container

    // Show the first paragraph as the default
    const defaultParagraph = descriptionCss.querySelector('p:first-child');
    if (defaultParagraph) {
        defaultParagraph.classList.add('show');
    }

    // Loop through each .clip-choice element within the position-add container
    positionAdd.querySelectorAll('.d-explain').forEach(choice => {
        choice.addEventListener('mouseenter', function () {
            // Remove "show" class from all paragraphs inside this descriptionCss
            descriptionCss.querySelectorAll('p').forEach(p => p.classList.remove('show'));

            // Get the paragraph matching data-description
            const descriptionIndex = choice.getAttribute('data-description');
            const targetParagraph = descriptionCss.querySelector(`p:nth-child(${descriptionIndex})`);

            // Show the matched paragraph if it exists
            if (targetParagraph) {
                targetParagraph.classList.add('show');
            }
        });

        choice.addEventListener('mouseleave', function () {
            // Hide all paragraphs by removing the "show" class from each paragraph
            descriptionCss.querySelectorAll('p').forEach(p => p.classList.remove('show'));

            // Re-show the first paragraph as a default state
            if (defaultParagraph) {
                defaultParagraph.classList.add('show');
            }
        });
    });
});




let classicSimple = document.querySelector('.classic-simple');



classicSimple.onclick = function () {
    classicSimple.classList.toggle('active')
}



const previewContent = document.getElementById('preview-content');
// Function to update the display with the width of previewContent
function updatePreviewContentSize() {
    const width = previewContent.offsetWidth; // Gets the width of previewContent element
    const displayElement = document.getElementById('preview-size-display');

    // Update the text content with the width of previewContent
    displayElement.innerHTML = `${width} px`;
}



























// +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++ Resized


// Update the width whenever the window is resized
window.addEventListener('resize', updatePreviewContentSize);


const imgFull = document.getElementById('img-full');
const imgMedium = document.getElementById('img-medium');
const imgSmall = document.getElementById('img-small');

// Set previewContent width to 100% when the first image is clicked
imgFull.addEventListener('click', function () {
    previewContent.style.width = '100%';
    previewContent.style.maxWidth = ''; // Reset max width
    updatePreviewContentSize(); // Update size after changing width
});

// Set previewContent width to 1050px and center it when the second image is clicked
imgMedium.addEventListener('click', function () {
    previewContent.style.width = '55%';
    updatePreviewContentSize(); // Update size after changing width

});

// Set previewContent width to 450px when the third image is clicked
imgSmall.addEventListener('click', function () {
    previewContent.style.width = '22%';
    updatePreviewContentSize(); // Update size after changing width

});

// Call the function when the page loads
updatePreviewContentSize();





























