document.addEventListener('DOMContentLoaded', function () {
    const previewContent = document.getElementById('preview-content');


    const selectionPanel = document.getElementById('selection-panel');
    const divBlockPanel = document.getElementById('div-block-panel');

    const classNameInput = document.getElementById('class-name-input');
    const addClassButton = document.getElementById('add-class-btn');


    function showSelectionMessage() {
        selectionPanel.classList.remove('none');
        divBlockPanel.classList.add('none');
    }

    function showDivBlock() {
        selectionPanel.classList.add('none');
        divBlockPanel.classList.remove('none');
    }






    addClassButton.addEventListener('click', function () {
        const newClass = classNameInput.value.trim();

        if (newClass && currentSelectedElement) {
            const oldClass = currentSelectedElement.classList[0];

            if (oldClass) {
                transferCssToNewClass(oldClass, newClass);
            }

            if (currentSelectedElement.classList.length > 0) {
                currentSelectedElement.classList.replace(currentSelectedElement.classList[0], newClass);
            } else {
                currentSelectedElement.classList.add(newClass);
            }

            saveClassToDatabase(currentSelectedElement.classList);
        }
    });


    function saveClassToDatabase(classList) {
        console.log("Class names saved to database:", classList);
    }


    document.addEventListener('keydown', function (e) {
        if (e.key === 'Delete' || e.key === 'Del') {
            if (currentSelectedElement && previewContent.contains(currentSelectedElement)) {
                const deletedElement = currentSelectedElement;
                const parent = deletedElement.parentNode;
                const nextSibling = deletedElement.nextSibling;
    
                deletedElement.remove();
    
                currentSelectedElement = null;
                classNameInput.value = '';
                hideDivBlock();
    
                trackChange({
                    do: () => {
                        if (parent.contains(deletedElement)) {
                            deletedElement.remove();
                        }
                    },
                    undo: () => {
                        if (nextSibling) {
                            parent.insertBefore(deletedElement, nextSibling);
                        } else {
                            parent.appendChild(deletedElement);
                        }
                    }
                });
            }
        }
    });
    
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undo();
        }
    if (e.ctrlKey && e.key === 'Z' && e.shiftKey) {
        e.preventDefault();
        redo();
    }
    });
    
    function hideDivBlock() {
        const divBlock = document.querySelector('.properties-panel');
        if (divBlock) divBlock.style.display = 'none';
    }


    document.getElementById('undoButton').addEventListener('click', undo);
    document.getElementById('redoButton').addEventListener('click', redo);


    const undoStack = [];
    const redoStack = [];

    function trackChange(action) {
        undoStack.push(action);
        redoStack.length = 0;
    }

    function undo() {
        if (undoStack.length === 0) return;

        const action = undoStack.pop();
        if (action.undo) {
            action.undo();
            redoStack.push({ ...action });
        }
    }

    function redo() {
        if (redoStack.length === 0) return;

        const action = redoStack.pop();
        if (action.do) action.do();
        undoStack.push(action);
    }


    previewContent.addEventListener('click', function (e) {

        const selectedElements = document.querySelectorAll('.selected');

        selectedElements.forEach(element => {
            element.classList.remove('selected');
        });


        e.target.classList.add('selected');

        showDivBlock();
        currentSelectedElement = e.target;
        const firstClass = currentSelectedElement.classList[0] || '';
        classNameInput.value = firstClass;


        loadElementData(currentSelectedElement);

        let lastCssProperty = null;


        const bxCols = document.querySelectorAll('.little-menu .bx-col');

        bxCols.forEach(bxCol => {
            bxCol.addEventListener('click', function () {
                const cssProperty = bxCol.getAttribute('add-css');

                if (cssProperty && currentSelectedElement) {
                    const firstClass = currentSelectedElement.classList[0];

                    if (lastCssProperty) {
                        removeCssPropertyFromClass(firstClass, lastCssProperty);
                    }

                    updateCssForClass(firstClass, cssProperty);

                    const columns = (cssProperty.match(/1fr/g) || []).length;
                    const rows = (cssProperty.match(/auto/g) || []).length;

                    currentSelectedElement.innerHTML = '';

                    let colNumber = 1;
                    for (let r = 0; r < rows; r++) {
                        for (let c = 0; c < columns; c++) {
                            const colDiv = document.createElement('div');
                            colDiv.classList.add(`col${colNumber}`, 'w2-engine-bx');
                            currentSelectedElement.appendChild(colDiv);
                            colNumber++;
                        }
                    }

                    lastCssProperty = cssProperty;

                    updateGridCounts();
                }
            });
        });




        if (e.target.tagName.match(/^H[1-6]$/)) {
            currentSelectedElement = e.target;

            const tagNumber = currentSelectedElement.tagName[1];

            updateTagCounts(`h${tagNumber}`);

            document.querySelector('.text-menu .input-number').value = currentSelectedElement.textContent;
        }




        if ([...currentSelectedElement.classList].some(className => className.startsWith('Grid'))) {
            document.querySelector('.little-menu').classList.remove('none');
        } else {
            document.querySelector('.little-menu').classList.add('none');
        }

        if ([...currentSelectedElement.classList].some(className => className.startsWith('Heading'))) {
            document.querySelector('.text-menu').classList.remove('none');
        } else {
            document.querySelector('.text-menu').classList.add('none');
        }

        const cssProperty = document.querySelectorAll('.hex-color')[0]?.getAttribute('add-css') || 'color';
        let currentColor = getComputedStyle(currentSelectedElement)[cssProperty];

        let hexColor = '';
        if (currentColor) {
            const rgb = currentColor.match(/\d+/g);
            if (rgb && rgb.length === 3) {
                const r = parseInt(rgb[0]);
                const g = parseInt(rgb[1]);
                const b = parseInt(rgb[2]);
                hexColor = rgbaToHex(r, g, b, 1);
            }
        }

        setupPickerForIndex(0);
        setupPickerForIndex(1);
        setupPickerForIndex(2);
        setupPickerForIndex(3);
        setupPickerForIndex(4);


        populateInputsFromSelectedElement();
        populateMarginPaddingValues(firstClass);
        updateGridCounts();



        clearActiveAccess();

        applyStoredActiveState(currentSelectedElement);
        loadElementData(currentSelectedElement);



        applyStoredActiveStates(classNameInput.value);

        updateButtonActiveStates();




        Object.entries(choiceDivMap).forEach(([choiceClass, { targetId, defaultText }]) => {
            const targetDiv = document.getElementById(targetId);
            targetDiv.textContent = selectedTextStore[firstClass]?.[choiceClass] || defaultText;
        });







        updateMenuVisibility();










        const boxShadowData = elementBoxShadowData.get(currentSelectedElement) || {
            insideBoxShadowList: [],
            outsideBoxShadowList: []
        };

        insideBoxShadowList.splice(0, insideBoxShadowList.length, ...boxShadowData.insideBoxShadowList);
        outsideBoxShadowList.splice(0, outsideBoxShadowList.length, ...boxShadowData.outsideBoxShadowList);

        refreshBoxShadowIndices(insideBoxShadowList, 'inside-box-shadow-list');
        refreshBoxShadowIndices(outsideBoxShadowList, 'outside-box-shadow-list');
        toggleBoxShadowLists();


        loadBoxShadowData();
        loadTextShadowData();

    });


    const buttonTypes = ['btn-s1', 'flex-btn', 'btn-a1', 'btn-s2', 'btn3', 'btn-s4', 'btn-s5', 'btn-s6', 'btn-s7',
        'btn-s8', 'btn-s9', 'btn-s10', 'btn-s11', 'btn-s12', 'btn-s13', 'btn-s14', 'btn-s15', 'btn-rd-type',];



    document.addEventListener('click', function (event) {
        const validClassNames = ['btn-s1', 'flex-btn', 'btn-a1', 'btn-s2', 'btn3', 'btn-s4', 'btn-s5', 'btn-s6', 'btn-s7',
            'btn-s8', 'btn-s9', 'btn-s10', 'btn-s11', 'btn-s12', 'btn-s13', 'btn-s14', 'btn-s15', 'btn-rd-type',
            'position-choice', 'text-choice1', 'text-choice2', 'clip-choice', 'blending-choice', 'align-choice1', 'align-choice2',
            'cursor-choice',];
        const hasValidClass = validClassNames.some(className => event.target.classList.contains(className));

        if (hasValidClass) {
            const cssRule = event.target.getAttribute('add-css');

            if (currentSelectedElement && cssRule) {
                const targetClass = classNameInput.value.trim() || firstClass;

                
                const cssProperties = cssRule.split(';').map(prop => prop.trim()).filter(prop => prop);

                cssProperties.forEach(propertyValuePair => {
                    if (propertyValuePair.startsWith("remove:")) {
                        const cssPropertyToRemove = propertyValuePair.split(':')[1].trim();
                        removeCssPropertyFromClass(targetClass, cssPropertyToRemove);

                        const correspondingInput = document.querySelector(`input[add-css="${cssPropertyToRemove}"]`);
                        if (correspondingInput) {
                            correspondingInput.value = '';
                        }
                    } else {
                        const [cssProperty, cssValue] = propertyValuePair.split(':').map(item => item.trim());
                        if (cssProperty && cssValue) {
                            updateCssForClass(targetClass, cssProperty, cssValue);

                            const correspondingInput = document.querySelector(`input[add-css="${cssProperty}"]`);
                            if (correspondingInput) {
                                correspondingInput.value = cssValue;
                            }
                        }
                    }
                });

                event.target.classList.add('clicked');
            }
        }
    });

    function activateFirstButton(group, btnType) {
        if (group.closest('.square-six-points')) return;

        const firstButton = group.querySelector(`.${btnType}`);
        if (firstButton) firstButton.classList.add('active');
    }

    function handleButtonClick(button, btnType, index) {
        button.addEventListener('click', function () {
            const group = this.closest('.buttons4');
            const prevButton = group.querySelector(`.${btnType}.active`);
            const newButton = this;

            group.querySelectorAll(`.${btnType}`).forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

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
                if (button.closest('.square-six-points')) return;

                button.classList.toggle('active', index === activeIndex);
            });
        });
    }

    function updateButtonActiveStates() {
        if (!currentSelectedElement || !(currentSelectedElement instanceof Element)) {
            console.warn('No valid selected element found.');
            return;
        }

        const computedStyles = getComputedStyle(currentSelectedElement);

        document.querySelectorAll('.buttons4').forEach(group => {
            let foundMatch = false;

            group.querySelectorAll('button').forEach(button => {
                const addCss = button.getAttribute('add-css')?.trim();

                if (addCss) {
                    const cssProperties = addCss.split(';').map(prop => prop.trim()).filter(prop => prop);

                    const isActive = cssProperties.every(propertyValuePair => {
                        const [property, value] = propertyValuePair.split(':').map(item => item.trim());
                        return computedStyles[property] === value;
                    });

                    if (isActive) {
                        button.classList.add('active');
                        foundMatch = true;
                    } else {
                        button.classList.remove('active');
                    }
                }
            });

            if (!foundMatch) {
                const firstButton = group.querySelector('button');
                if (firstButton) {
                    firstButton.classList.add('active');
                }
            }
        });
    }


    buttonTypes.forEach(btnType => {
        document.querySelectorAll('.buttons4').forEach(group => {
            activateFirstButton(group, btnType);
        });

        document.querySelectorAll(`.${btnType}`).forEach((button, index) => {
            if (button.closest('.square-six-points')) return;

            handleButtonClick(button, btnType, index);
        });
    });


    const selectedTextStore = {};

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

    Object.entries(choiceDivMap).forEach(([choiceClass, { targetId }]) => {
        document.querySelectorAll(`.position-add .${choiceClass}`).forEach(choice => {
            choice.addEventListener("click", function () {
                document.getElementById(targetId).textContent = this.textContent;

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

    activateFlexAccess(["f1-points"]);

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

    function clearActiveAccess() {
        document.querySelectorAll('.square-six-points .flex-btn .active').forEach(activeEl => {
            activeEl.classList.remove('active');
        });
    }



    function updateFlexAccessBasedOnWeights() {
        const currentXText = document.getElementById('currentWeight-a1').textContent;
        const currentYText = document.getElementById('currentWeight-a2').textContent;

        clearActiveAccess();
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
            const matchingPointId = Object.keys(pointTextMap).find(pointId => {
                const text = pointTextMap[pointId];
                return text.xText === currentXText && text.yText === currentYText;
            });

            if (matchingPointId) {
                activePoints = [matchingPointId];
            }
        }

        activateFlexAccess(activePoints);
        if (currentSelectedElement) {
            storeActiveState(currentSelectedElement, activePoints);
        }
    }

    document.querySelectorAll('.position-add h1').forEach(option => {
        option.addEventListener('click', function () {
            const parentContainer = this.closest('.position-add');
            const newText = this.textContent;

            if (parentContainer.classList.contains('n2')) {
                document.getElementById('currentWeight-a1').textContent = newText;
            } else if (parentContainer.classList.contains('n3')) {
                document.getElementById('currentWeight-a2').textContent = newText;
            }

            updateFlexAccessBasedOnWeights();
        });
    });

    function storeActiveState(element, activePoints) {
        if (!element) return;
        element.dataset.activePoints = JSON.stringify(activePoints);
    }

    function applyStoredActiveState(element) {
        if (!element) return;
        const activePoints = JSON.parse(element.dataset.activePoints || "[]");
        activateFlexAccess(activePoints);
    }




    const inputs = document.querySelectorAll('.input-number');

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const cssProperty = input.getAttribute('add-css');
            let value = input.value.trim();

            if (currentSelectedElement) {
                const firstClass = currentSelectedElement.classList[0] || '';
                const newClass = classNameInput.value.trim();
                const targetClass = newClass || firstClass;

                const unitMapping = {
                    width: 'widthInput2',
                    height: 'heightInput',
                    'min-width': 'minWidthInput',
                    'max-width': 'maxWidthInput',
                    'min-height': 'minHeightInput',
                    'max-height': 'maxHeightInput',
                    'font-size': 'fontSizeInput',
                    'line-height': 'lineHeightInput',
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

                const elementId = firstClass;
                elementUnits[elementId] = elementUnits[elementId] || {};

                if (value === '') {
                    removeCssPropertyFromClass(targetClass, cssProperty);
                    delete elementUnits[elementId][`${cssProperty}Value`];
                    delete elementUnits[elementId][`${cssProperty}Unit`];
                } else {
                    if (/^\d+$/.test(value)) {
                        value = `${value}${unit}`;
                    }

                    elementUnits[elementId][`${cssProperty}Value`] = parseFloat(value);
                    elementUnits[elementId][`${cssProperty}Unit`] = unit;

                    updateCssForClass(targetClass, cssProperty, value);
                }
            }
        });
    });





    let currentSelectedElement = null;

    const inputMappings = {
        widthInput2: 'width',
        heightInput: 'height',
        minWidthInput: 'min-width',
        maxWidthInput: 'max-width',
        minHeightInput: 'min-height',
        maxHeightInput: 'max-height',
        fontSizeInput: 'font-size',
        lineHeightInput: 'line-height',
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


    let selectedUnits = {

    };

    function updateSelectedElementStyle() {
        if (currentSelectedElement) {
            const newClass = classNameInput.value.trim();
            const elementId = currentSelectedElement.classList[0] || currentSelectedElement.id;

            for (const [inputId, cssProperty] of Object.entries(inputMappings)) {
                const inputElement = document.querySelector(`input[add-css="${cssProperty}"]`);
                const inputValue = inputElement.value || '';
                const unit = selectedUnits[inputId] || 'px';

                elementUnits[elementId] = elementUnits[elementId] || {};
                elementUnits[elementId][`${cssProperty}Value`] = inputValue;
                elementUnits[elementId][`${cssProperty}Unit`] = unit;

                if (unit === 'auto') {
                    inputElement.value = 'auto';
                    updateCssForClass(newClass, cssProperty, 'auto');
                } else if (inputValue) {
                    updateCssForClass(newClass, cssProperty, `${inputValue}${unit}`);
                }
            }
        }
    }


    document.querySelectorAll('.select-layout').forEach(unitSelector => {

        unitSelector.addEventListener('click', function (e) {
            if (e.target && e.target.hasAttribute('value')) {
                const selectedUnit = e.target.getAttribute('value');
                const targetInputId = unitSelector.getAttribute('data-unit-for');


                selectedUnits[targetInputId] = selectedUnit;


                unitSelector.querySelectorAll('div').forEach(div => div.classList.remove('selected'));
                e.target.classList.add('selected');

                updateSelectedElementStyle();
            }
        });
    });





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
                    let storedValue = elementUnits[elementId]?.[`${cssProperty}Value`];
                    let storedUnit = elementUnits[elementId]?.[`${cssProperty}Unit`] ||
                        (inputId === 'opacityInput' ? '%' : 'px');

                    const hasUserModified = elementUnits[elementId]?.hasOwnProperty(`${cssProperty}Value`);
                    let value = hasUserModified
                        ? storedValue
                        : parseFloat(computedStyle[cssProperty]) || '';

                    if (inputId === 'opacityInput') {
                        value = hasUserModified ? storedValue : Math.round(parseFloat(computedStyle.opacity || 1) * 100);
                        storedUnit = '%';
                    }

                    const displayUnit = storedUnit === 'auto' ? '-' : storedUnit;

                    inputElement.value = value;
                    document.querySelector(`.select-layout[data-unit-for="${inputId}"] span`).innerText = displayUnit;
                    selectedUnits[inputId] = storedUnit;
                }
            });

        }
    }



    const unitSelectors = document.querySelectorAll('.select-layout');


    unitSelectors.forEach(unitSelector => {
        const unitItems = unitSelector.querySelectorAll('div');

        const selectedUnitDisplay = document.createElement('span');
        selectedUnitDisplay.innerText = 'PX';
        unitSelector.insertBefore(selectedUnitDisplay, unitItems[0]);

        unitItems.forEach(item => {
            item.style.display = 'none';
        });

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
                selectedUnitDisplay.innerText = selectedValue === 'auto' ? '-' : selectedValue;
                selectedUnitDisplay.setAttribute('value', this.getAttribute('value'));

                unitItems.forEach(innerItem => {
                    innerItem.style.display = 'none';
                });


                unitSelector.classList.remove('menu-open');
            });
        });
    });


    function createCustomUnitSelector(units, defaultUnit, dataUnitFor) {
        const unitSelector = document.createElement('div');
        unitSelector.className = 'select-layout remove-span-unit';
        unitSelector.setAttribute('data-unit-for', dataUnitFor);

        const selectedUnitDisplay = document.createElement('span');
        selectedUnitDisplay.innerText = defaultUnit.toUpperCase();
        unitSelector.appendChild(selectedUnitDisplay);

        units.forEach(unit => {
            const unitItem = document.createElement('div');
            unitItem.innerText = unit.toUpperCase();
            unitItem.setAttribute('value', unit);
            unitSelector.appendChild(unitItem);

            unitItem.style.display = 'none';
        });

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

    const opacityUnitSelector = createCustomUnitSelector(['%'], '%', 'opacityInput');

    const positionElementContainer = document.querySelector('#opacity-container .flex-sb.position-element');

    positionElementContainer.appendChild(opacityUnitSelector);





    function removeCssPropertyFromClass(className, cssProperty) {
        const styleTag = document.getElementById('dynamic-styles');
        if (!styleTag) return;

        let styles = styleTag.innerHTML;
        const regex = new RegExp(`\\.${className}\\s*{[^}]*}`, 'g');
        const match = styles.match(regex);

        if (match) {
            let existingStyleBlock = match[0];
            const updatedStyleBlock = existingStyleBlock.replace(new RegExp(`${cssProperty}:\\s*[^;]+;?`, 'g'), '');
            styles = styles.replace(existingStyleBlock, updatedStyleBlock);
            styleTag.innerHTML = styles;

            updatePreviews();
        }
    }

    function updateCssForClass(className, cssProperty, newValue) {
        let styleTag = document.getElementById('dynamic-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-styles';
            document.head.appendChild(styleTag);
        }

        let styles = styleTag.innerHTML;
        const regex = new RegExp(`\\.${className}\\s*{([^}]*)}`, 'g');
        const match = styles.match(regex);

        let oldValue = '';
        let updatedStyles = '';

        if (match) {
            let existingStyle = match[0];
            const propertyRegex = new RegExp(`${cssProperty}\\s*:\\s*([^;]+);`, 'g');
            const propertyMatch = existingStyle.match(propertyRegex);

            if (propertyMatch) {
                oldValue = propertyMatch[0].split(':')[1].trim().replace(';', '');
                if (newValue !== null) {
                    existingStyle = existingStyle.replace(propertyRegex, `${cssProperty}: ${newValue};`);
                } else {
                    return removeCssPropertyFromClass(className, cssProperty);
                }
            } else if (newValue !== null) {
                existingStyle = existingStyle.replace('}', `  ${cssProperty}: ${newValue}; }`);
            }

            updatedStyles = styles.replace(regex, existingStyle);
        } else if (newValue !== null) {
            updatedStyles = styles + `.${className} { ${cssProperty}: ${newValue}; }`;
        }

        styleTag.innerHTML = updatedStyles;

        updatePreviews();

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

    function transferCssToNewClass(oldClass, newClass) {
        let styleTag = document.getElementById('dynamic-styles');
        if (styleTag) {
            let styles = styleTag.innerHTML;

            const oldClassRegex = new RegExp(`\\.${oldClass}\\s*{[^}]*}`, 'g');
            const match = styles.match(oldClassRegex);

            if (match) {
                const oldClassStyles = match[0].replace(`.${oldClass}`, `.${newClass}`);
                styles = styles.replace(oldClassRegex, '');
                styles += oldClassStyles;
            }

            styleTag.innerHTML = styles;
        }
    }




    const displayButtons = document.querySelectorAll('.btn-s1');
    const flexMenu = document.querySelector('.flex-menu');
    const gridMenu = document.querySelector('.grid-menu');

    function updateMenuVisibility() {
        if (currentSelectedElement) {
            const elementStyle = window.getComputedStyle(currentSelectedElement);
            const displayProperty = elementStyle.getPropertyValue('display');

            flexMenu.classList.toggle('none', displayProperty !== 'flex');

            gridMenu.classList.toggle('none', displayProperty !== 'grid');
        }
    }

    function updateCSSRule(className, property, value) {
        let styleTag = document.getElementById('dynamic-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-styles';
            document.head.appendChild(styleTag);
        }

        const sheet = styleTag.sheet;
        const rule = `.${className} { ${property}: ${value}; }`;

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

                    updateMenuVisibility();
                }
            }

            displayButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });


    function updateGridCounts() {
        if (currentSelectedElement) {
            const firstClass = currentSelectedElement.classList[0];
            const gridStyles = window.getComputedStyle(currentSelectedElement);

            const columnTemplate = gridStyles.getPropertyValue('grid-template-columns');
            const rowTemplate = gridStyles.getPropertyValue('grid-template-rows');

            const columnCount = columnTemplate.split(' ').filter(Boolean).length || 0;
            const rowCount = rowTemplate.split(' ').filter(Boolean).length || 0;
            document.querySelectorAll('.count.column h1').forEach((columnCountElement) => {
                columnCountElement.innerText = columnCount;
            });

            document.querySelectorAll('.count.row h1').forEach((rowCountElement) => {
                rowCountElement.innerText = rowCount;
            });
        }
    }


    let nextColNumber = 5;

    function updateGridTemplate(property, increment) {
        if (!currentSelectedElement) return;

        const firstClass = currentSelectedElement.classList[0];
        let template = getComputedStyle(currentSelectedElement).getPropertyValue(property).trim().split(/\s+/);
        const isColumn = property === 'grid-template-columns';

        const columnCount = getComputedStyle(currentSelectedElement).getPropertyValue('grid-template-columns').trim().split(/\s+/).length;
        const rowCount = getComputedStyle(currentSelectedElement).getPropertyValue('grid-template-rows').trim().split(/\s+/).length;

        if (increment) {
            template.push(isColumn ? '1fr' : 'auto');

            if (isColumn) {
                for (let row = 0; row < rowCount; row++) {
                    let newColDiv = document.createElement('div');
                    newColDiv.classList.add(`col${nextColNumber++}`, 'w2-engine-bx');
                    currentSelectedElement.appendChild(newColDiv);
                }
            } else {
                for (let col = 0; col < columnCount; col++) {
                    let newRowDiv = document.createElement('div');
                    newRowDiv.classList.add(`col${nextColNumber++}`, 'w2-engine-bx');
                    currentSelectedElement.appendChild(newRowDiv);
                }
            }
        } else if (template.length > 1) {
            template.pop();

            if (isColumn) {
                for (let row = 0; row < rowCount; row++) {
                    const lastColDiv = currentSelectedElement.querySelector(`.col${nextColNumber - 1}`);
                    if (lastColDiv) lastColDiv.remove();
                    nextColNumber--;
                }
            } else {
                for (let col = 0; col < columnCount; col++) {
                    const lastRowDiv = currentSelectedElement.querySelector(`.col${nextColNumber - 1}`);
                    if (lastRowDiv) lastRowDiv.remove();
                    nextColNumber--;
                }
            }
        }

        const updatedTemplate = template.map(value => isColumn ? '1fr' : 'auto').join(' ');
        updateCssForClass(firstClass, property, updatedTemplate);

        updateGridCounts();
    }


    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', handleGridButtonClick);
    });


    function handleGridButtonClick(e) {
        const button = e.currentTarget;
        const isIncrement = button.querySelector('img').getAttribute('src').includes('add.png');
        const cssProperty = button.getAttribute('add-css');
        updateGridTemplate(cssProperty, isIncrement);
    }




    function updateTagCounts(selectedTag) {
        const counts = document.querySelectorAll('.padding-menu .count');

        counts.forEach(count => {
            const tagNumber = count.querySelector('h1').textContent;
            if (parseInt(tagNumber) === parseInt(selectedTag[1])) {
                count.classList.add('active');
            } else {
                count.classList.remove('active');
            }
        });
    }

    document.querySelector('.text-menu').addEventListener('click', function (event) {
        const target = event.target.closest('.count');
        if (target && currentSelectedElement) {
            document.querySelectorAll('.text-menu .count').forEach(count => count.classList.remove('active'));

            target.classList.add('active');
            const tagNumber = target.querySelector('h1').innerText;
            const newTagName = `h${tagNumber}`;

            const newTagElement = document.createElement(newTagName);
            newTagElement.className = currentSelectedElement.className.replace(/w2-engine-text\d+/, `w2-engine-text${tagNumber}`);
            newTagElement.textContent = currentSelectedElement.textContent;

            currentSelectedElement.replaceWith(newTagElement);
            currentSelectedElement = newTagElement;
        }
    });




    document.querySelector('.text-menu .input-number').addEventListener('input', function (event) {
        if (currentSelectedElement) {
            currentSelectedElement.textContent = event.target.value;
        }
    });



    const elementStyles = {};




    document.querySelectorAll('.m-top, .m-right, .m-bottom, .m-left, .p-top, .p-right, .p-bottom, .p-left').forEach(element => {
        let initialY, initialValue;
        let isDragging = false;

        element.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            initialY = e.clientY;
            initialValue = parseInt(element.innerText, 10) || 0;

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

            element.innerText = newValue;

            if (newValue > 0) {
                element.style.textShadow = '0px 0px 6px #ff5d00, 0px 0px 2px #ff9900, 0px 0px 1px #ffc100, 0px 0px 8px #ff5d00';
            } else {
                element.style.removeProperty('text-shadow');
            }

            const cssProperty = element.classList.contains('m-top') ? 'margin-top' :
                element.classList.contains('m-right') ? 'margin-right' :
                    element.classList.contains('m-bottom') ? 'margin-bottom' :
                        element.classList.contains('m-left') ? 'margin-left' :
                            element.classList.contains('p-top') ? 'padding-top' :
                                element.classList.contains('p-right') ? 'padding-right' :
                                    element.classList.contains('p-bottom') ? 'padding-bottom' :
                                        'padding-left';

            if (currentSelectedElement) {
                const firstClass = currentSelectedElement.classList[0];
                if (firstClass) {
                    if (newValue > 0) {
                        updateCssForClass(firstClass, cssProperty, `${newValue}px`);
                    } else {
                        removeCssPropertyFromClass(firstClass, cssProperty);
                    }

                    if (!elementStyles[firstClass]) {
                        elementStyles[firstClass] = { margin: {}, padding: {} };
                    }

                    if (cssProperty.startsWith('margin')) {
                        elementStyles[firstClass].margin[cssProperty] = newValue;
                    } else {
                        elementStyles[firstClass].padding[cssProperty] = newValue;
                    }
                }
            }

            if (element.bgElement) {
                if (cssProperty.startsWith('margin')) {
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
                    if (cssProperty === 'padding-top' || cssProperty === 'padding-bottom') {
                        element.bgElement.style.height = `${newValue}px`;
                    } else {
                        element.bgElement.style.width = `${newValue}px`;
                    }
                }
            }
        }

        function createArrow(element, targetElement) {

            const isMargin = element.className.startsWith('m-');

            targetElement.style.position = 'relative';

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
                element.bgElement.remove();
                element.bgElement = null;
            }
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', stopDrag);
        }
    });



    function populateMarginPaddingValues(className) {
        const element = document.querySelector(`.${className}`);
        const styles = elementStyles[className] || { margin: {}, padding: {} };
        const computedStyles = element ? window.getComputedStyle(element) : null;

        function getStyleValue(type, side) {
            let value = styles[type][`${type}-${side}`] || (computedStyles ? computedStyles.getPropertyValue(`${type}-${side}`) : '0px');
            return String(value).replace('px', '');
        }

        function applyTextShadow(element, value) {
            if (value > 0) {
                element.style.textShadow = '0px 0px 6px #ff5d00, 0px 0px 2px #ff9900, 0px 0px 1px #ffc100, 0px 0px 8px #ff5d00';
            } else {
                element.style.textShadow = 'none';
            }
        }

        document.querySelector('.m-top').innerText = getStyleValue('margin', 'top');
        applyTextShadow(document.querySelector('.m-top'), getStyleValue('margin', 'top'));

        document.querySelector('.m-right').innerText = getStyleValue('margin', 'right');
        applyTextShadow(document.querySelector('.m-right'), getStyleValue('margin', 'right'));

        document.querySelector('.m-bottom').innerText = getStyleValue('margin', 'bottom');
        applyTextShadow(document.querySelector('.m-bottom'), getStyleValue('margin', 'bottom'));

        document.querySelector('.m-left').innerText = getStyleValue('margin', 'left');
        applyTextShadow(document.querySelector('.m-left'), getStyleValue('margin', 'left'));

        document.querySelector('.p-top').innerText = getStyleValue('padding', 'top');
        applyTextShadow(document.querySelector('.p-top'), getStyleValue('padding', 'top'));

        document.querySelector('.p-right').innerText = getStyleValue('padding', 'right');
        applyTextShadow(document.querySelector('.p-right'), getStyleValue('padding', 'right'));

        document.querySelector('.p-bottom').innerText = getStyleValue('padding', 'bottom');
        applyTextShadow(document.querySelector('.p-bottom'), getStyleValue('padding', 'bottom'));

        document.querySelector('.p-left').innerText = getStyleValue('padding', 'left');
        applyTextShadow(document.querySelector('.p-left'), getStyleValue('padding', 'left'));

    }




    function resetPanelIfNoSelection() {
        const selectedElements = previewContent.querySelectorAll('.selected');
        if (selectedElements.length === 0) {
            showSelectionMessage();
        }
    }

    resetPanelIfNoSelection();







    document.addEventListener('mouseover', function (e) {

        const validClassNames = ['position-choice', 'text-choice1', 'text-choice2', 'clip-choice', 'align-choice1', 'align-choice2', 'blending-choice', 'cursor-choice',];

        const hasValidClass = validClassNames.some(className => e.target.classList.contains(className));

        if (hasValidClass) {
            const cssRule = e.target.getAttribute('add-css');

            if (currentSelectedElement && cssRule) {
                const targetClass = classNameInput.value.trim() || firstClass;

                const [cssProperty, cssValue] = cssRule.split(':');
                updateCssForClass(targetClass, cssProperty.trim(), cssValue.trim());
            }
        }

        if (previewContent.contains(e.target)) {
            if (!e.target.classList.contains('selected')) {
                e.target.classList.add('hovering');
            }

            addTagNameToElement(e.target, false);
        }
    });


    document.addEventListener('mouseout', function (e) {

        const validClassNames = ['position-choice', 'text-choice1', 'text-choice2', 'clip-choice', 'align-choice1', 'align-choice2', 'blending-choice', 'cursor-choice',];

        const hasValidClass = validClassNames.some(className => e.target.classList.contains(className));

        if (hasValidClass && !e.target.classList.contains('clicked')) {
            const cssRule = e.target.getAttribute('add-css');

            if (currentSelectedElement && cssRule) {
                const targetClass = classNameInput.value.trim() || firstClass;

                const cssProperty = cssRule.split(':')[0].trim();
                removeCssPropertyFromClass(targetClass, cssProperty);
            }
        }

        if (previewContent.contains(e.target)) {
            e.target.classList.remove('hovering');
            if (e.target.classList.contains('selected')) {
                e.target.classList.remove('hovering');
            }

            if (nameHoverDisplay) {
                nameHoverDisplay.textContent = '';
            }
        }
    });

    const nameHoverDisplay = document.querySelector('.name-hover-select');

    function addTagNameToElement(element) {
        const firstClassName = element.classList[0];

        if (firstClassName && nameHoverDisplay) {
            const truncatedClassName = firstClassName.length > 15
                ? firstClassName.substring(0, 9) + "..."
                : firstClassName;

            nameHoverDisplay.textContent = truncatedClassName;
        }
    }


    function handleSectionClick(sectionClass, classMappings) {
        const sectionDivs = document.querySelectorAll(`.${sectionClass} div`);
        const targetTexts = document.querySelectorAll('.flex-align p');
        sectionDivs.forEach(div => {
            div.addEventListener('click', function () {
                sectionDivs.forEach(d => d.classList.remove(`activate-${sectionClass}`));
                div.classList.add(`activate-${sectionClass}`);

                targetTexts.forEach(p => p.classList.remove('radius-shadow'));

                const targetText = classMappings.find(mapping => div.classList.contains(mapping.divClass)).text;

                targetTexts.forEach(p => {
                    if (p.textContent.trim() === targetText) {
                        p.classList.add('radius-shadow');
                    }
                });
            });
        });
    }

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

    handleSectionClick('square-radius', radiusMappings);
    handleSectionClick('square-border', borderMappings);



    const backgroundStyleDiv = document.querySelector('.background-style');
    const backgroundMenu = document.querySelector('.background-menu');

    const previewContentData = {};
    const elementCounters = {};



    let forimaCounter = 1;
    const forimaData = {};

    function getOrCreateElementId(element) {
        if (!element.id) {
            element.id = `element-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        }
        return element.id;
    }

    function createNewBackgroundDiv() {
        if (!currentSelectedElement) {
            displayErrorMessage("Please select an element in previewContent first.");
            return;
        }

        const elementId = getOrCreateElementId(currentSelectedElement);

        if (!elementCounters[elementId]) {
            elementCounters[elementId] = 0;
        }

        if (elementCounters[elementId] >= 4) {
            displayErrorMessage("You can create only up to 4 custom HTML elements for this item.");
            return;
        }

        const uniqueClass = `forima${forimaCounter}`;
        forimaCounter++;

        const newDiv = document.createElement('div');
        newDiv.classList.add('flex-sb-align', uniqueClass, 'm-b-20', 'b-2');
        newDiv.innerHTML = `
        <p>Background & Image</p>
        <div class="flex-align gap10">
            <img class="small-img garbage-icon remove-event" src="/Icon/garbage.png" alt="Delete">
        </div>
    `;

        forimaData[uniqueClass] = {
            backgroundImage: 'url(https://d3e54v103j8qbb.cloudfront.net/img/background-image.svg)',
            activeButton: 'bg-setting1'
        };

        newDiv.addEventListener('click', (event) => {
            event.stopPropagation();
            backgroundMenu.classList.remove('none2');
            setActiveBackgroundState(uniqueClass);
        });

        backgroundStyleDiv.parentNode.insertBefore(newDiv, backgroundStyleDiv.nextSibling);

        elementCounters[elementId]++;

        const garbageIcon = newDiv.querySelector('.garbage-icon');
        garbageIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteCustomHTML(newDiv, elementId);
            delete forimaData[uniqueClass];
        });
    }

    function setActiveBackgroundState(uniqueClass) {
        const { backgroundImage, activeButton } = forimaData[uniqueClass];

        document.querySelectorAll('.bg-btn').forEach((btn) => btn.classList.remove('active'));
        document.querySelector(`.${activeButton}`).classList.add('active');

        const firstClass = currentSelectedElement.classList[0];
        if (firstClass) {
            updateCssForClass(firstClass, 'background-image', backgroundImage);
        }
    }

    function deleteCustomHTML(customDiv, elementId) {
        const firstClass = currentSelectedElement.classList[0];

        previewContentData[elementId] = previewContentData[elementId].filter(
            (entry) => entry.div !== customDiv
        );

        const combinedCss = previewContentData[elementId]
            .map((entry) => entry.css.join(', '))
            .filter(Boolean)
            .join(', ');

        updateCssForClass(firstClass, 'background-image', combinedCss);

        customDiv.remove();

        elementCounters[elementId]--;
    }

    function loadElementData(element) {
        const elementId = getOrCreateElementId(element);

        Object.values(previewContentData).flat().forEach(div => {
            div.classList.add('none-important');
        });

        if (previewContentData[elementId]) {
            previewContentData[elementId].forEach(div => div.classList.remove('none-important'));
        } else {
            console.log("No data stored for this element.");
        }
    }

    backgroundStyleDiv.addEventListener('click', (event) => {
        event.stopPropagation();
        createNewBackgroundDiv();
    });


    const bgSetting1 = document.querySelector('.bg-setting1');
    const bgSetting2 = document.querySelector('.bg-setting2');
    const bgSetting3 = document.querySelector('.bg-setting3');
    const bgSetting4 = document.querySelector('.bg-setting4');


    const backgroundImage = document.querySelector('.background-image');
    const linearGredient = document.querySelector('.linear-gredient');
    const radialGredient = document.querySelector('.radial-gredient');
    const backgroundColor = document.querySelector('.background-color');
    function toggleNone(target) {
        backgroundImage.classList.add('none2');
        linearGredient.classList.add('none2');
        radialGredient.classList.add('none2');
        backgroundColor.classList.add('none2');

        target.classList.remove('none2');
    }

    bgSetting1.addEventListener('click', () => toggleNone(backgroundImage));
    bgSetting2.addEventListener('click', () => toggleNone(linearGredient));
    bgSetting3.addEventListener('click', () => toggleNone(radialGredient));
    bgSetting4.addEventListener('click', () => toggleNone(backgroundColor));

    const state = {};

    document.querySelectorAll('.bg-btn').forEach((btn) => {
        btn.addEventListener('click', function () {
            if (!currentSelectedElement) {
                displayErrorMessage("Please select an element to apply styles.");
                return;
            }

            const elementId = getOrCreateElementId(currentSelectedElement);
            if (!state[elementId]) {
                state[elementId] = { activeButton: null, bgSetting: null };
            }

            const firstClass = currentSelectedElement.classList[0];
            if (!firstClass) {
                displayErrorMessage("The selected element has no class to apply styles to.");
                return;
            }

            removeCssPropertyFromClass(firstClass, 'background-image');

            const newCss = btn.getAttribute('add-css');
            updateCssForClass(firstClass, 'background-image', newCss);

            const group = btn.closest('.buttons4');
            group.querySelectorAll('.bg-btn').forEach((btn) => btn.classList.remove('active'));
            btn.classList.add('active');

            state[elementId].activeButton = newCss;
            state[elementId].bgSetting = btn.classList[1];

            const parentForima = currentSelectedElement.closest(`.${firstClass}`);
            if (parentForima) {
                const pElement = parentForima.querySelector('p');
                if (pElement) {
                    pElement.innerText = {
                        'bg-setting1': 'Image & Gradient',
                        'bg-setting2': 'Linear Gradient',
                        'bg-setting3': 'Radial Gradient',
                        'bg-setting4': 'Solid Color',
                    }[btn.classList[1]] || 'Unknown Setting';
                }
            }
        });
    });

    const bgSettings = {
        '.bg-setting1': backgroundImage,
        '.bg-setting2': linearGredient,
        '.bg-setting3': radialGredient,
        '.bg-setting4': backgroundColor,
    };

    Object.entries(bgSettings).forEach(([selector, target]) => {
        document.querySelector(selector).addEventListener('click', () => {
            if (!currentSelectedElement) {
                displayErrorMessage("Please select an element.");
                return;
            }

            const elementId = getOrCreateElementId(currentSelectedElement);
            if (!state[elementId]) {
                state[elementId] = { activeButton: null, bgSetting: null };
            }

            toggleNone(target);
            state[elementId].bgSetting = selector;
        });
    });

    function restoreState(forima) {
        const elementId = getOrCreateElementId(forima);

        if (state[elementId]) {
            const activeCss = state[elementId].activeButton;
            if (activeCss) {
                const button = forima.querySelector(`.bg-btn[add-css="${activeCss}"]`);
                if (button) button.classList.add('active');
            }

            const setting = state[elementId].bgSetting;
            if (setting) toggleNone(document.querySelector(setting));
        }
    }

    document.querySelectorAll('.forima').forEach((forima) => {
        forima.addEventListener('click', () => {
            currentSelectedElement = forima;

            if (currentSelectedElement) saveState(currentSelectedElement);

            restoreState(forima);
        });
    });

    function saveState(forima) {
        const elementId = getOrCreateElementId(forima);
        if (!state[elementId]) {
            state[elementId] = { activeButton: null, bgSetting: null };
        }

        const activeButton = forima.querySelector('.bg-btn.active');
        if (activeButton) {
            state[elementId].activeButton = activeButton.getAttribute('add-css');
        }
    }









    /* +++++++++++++++++++++++++++++++++ Background Setting  ++++++++++++++++++++++++++++++++++++ */








    const outsideBoxShadowList = [];
    const insideBoxShadowList = [];
    let currentSelectedShadowIndex = 0;
    let isManagingInside = false;
    const elementBoxShadowData = new Map();


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
        customContentHTML.dataset.index = newIndex;
        customContentHTML.innerHTML = `
        <div class="flex-sb-align m-tb-10 gap10 b-2">
            <div class="flex-col gap10">
                <p>Box Shadow ${newIndex + 1}</p>
                <p class="box-shadow-value" style="color: white;">0px 0px 0px #000000</p>
            </div>
            
            <img class="small-img delete-box-shadow" src="/Icon/garbage.png" alt="">
        </div>
    `;

        function updateShadowDisplay() {
            const shadow = targetList[customContentHTML.dataset.index];
            const inset = shadow.inset ? 'inset ' : '';
            customContentHTML.querySelector('.box-shadow-value').textContent =
                `${inset}${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
        }

        customContentHTML.addEventListener('click', () => {
            selectBoxShadow(parseInt(customContentHTML.dataset.index, 10), isManagingInside);
        });

        customContentHTML.querySelector('.delete-box-shadow').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteBoxShadow(parseInt(customContentHTML.dataset.index, 10), isManagingInside);
            customContentHTML.remove();
            refreshBoxShadowIndices(targetList, containerId);
        });

        boxShadowListContainer.appendChild(customContentHTML);
        updateShadowDisplay();
        selectBoxShadow(newIndex, isManagingInside);

        saveBoxShadowData();
    });

    function saveBoxShadowData() {
        if (!currentSelectedElement) return;

        elementBoxShadowData.set(currentSelectedElement, {
            insideBoxShadowList: [...insideBoxShadowList],
            outsideBoxShadowList: [...outsideBoxShadowList]
        });
    }


    function selectBoxShadow(index, isInside) {
        const targetList = isInside ? insideBoxShadowList : outsideBoxShadowList;
        const selectedShadow = targetList[index];

        if (!selectedShadow) return;
        currentSelectedShadowIndex = index;
        isManagingInside = isInside;

        document.getElementById('horizontal-offset').value = selectedShadow.horizontal;
        document.getElementById('vertical-offset').value = selectedShadow.vertical;
        document.getElementById('blur-radius').value = selectedShadow.blur;
        document.getElementById('shadow-color').value = selectedShadow.color;
    }

    function refreshBoxShadowIndices(targetList, containerId) {
        const container = document.getElementById(containerId);
        Array.from(container.children).forEach((item, index) => {
            item.dataset.index = index;
            item.querySelector('p:first-child').textContent = `Box Shadow ${index + 1}`;
        });
        updateBoxShadowCSS();
    }


    function deleteBoxShadow(index, isInside) {
        const targetList = isInside ? insideBoxShadowList : outsideBoxShadowList;
        targetList.splice(index, 1);

        const containerId = isInside ? 'inside-box-shadow-list' : 'outside-box-shadow-list';
        const boxShadowItems = document.getElementById(containerId).children;
        if (boxShadowItems[index]) boxShadowItems[index].remove();

        updateBoxShadowCSS();
    }

    function updateBoxShadowCSS() {
        const outsideBoxShadowString = outsideBoxShadowList
            .map(shadow => `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`)
            .join(', ');

        const insideBoxShadowString = insideBoxShadowList
            .map(shadow => `inset ${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`)
            .join(', ');

        const finalBoxShadow = [outsideBoxShadowString, insideBoxShadowString]
            .filter(Boolean)
            .join(', ');

        if (currentSelectedElement) {
            const firstClass = currentSelectedElement.classList[0] || '';
            if (firstClass && finalBoxShadow) {
                updateCssForClass(firstClass, 'box-shadow', finalBoxShadow);
            }
        }
    }

    document.querySelectorAll('[add-css^="box-shadow"]').forEach((input) => {
        input.addEventListener('input', () => {
            const addCssValue = input.getAttribute('add-css').replace(/\d+$/, '');

            if (addCssValue === 'box-shadow') {
                const targetList = isManagingInside ? insideBoxShadowList : outsideBoxShadowList;
                const currentShadow = targetList[currentSelectedShadowIndex];

                if (!currentShadow) return;

                if (input.id === 'horizontal-offset') currentShadow.horizontal = parseInt(input.value, 10) || 0;
                if (input.id === 'vertical-offset') currentShadow.vertical = parseInt(input.value, 10) || 0;
                if (input.id === 'blur-radius') currentShadow.blur = parseInt(input.value, 10) || 0;
                if (input.id === 'shadow-color') currentShadow.color = input.value || '#000000';

                updateBoxShadowCSS();
                updateShadowDisplay(currentSelectedShadowIndex, targetList);
                saveBoxShadowData();
            }
        });
    });

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


    document.querySelectorAll('.boxShadow-btn div').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.boxShadow-btn .active').classList.remove('active');
            btn.classList.add('active');

            isManagingInside = btn.classList.contains('btn-bx-inside');
            toggleBoxShadowLists();
        });
    });

    function toggleBoxShadowLists() {
        document.getElementById('outside-box-shadow-list').style.display = isManagingInside ? 'none' : 'block';
        document.getElementById('inside-box-shadow-list').style.display = isManagingInside ? 'block' : 'none';
    }



    function loadBoxShadowData() {
        if (!currentSelectedElement) return;

        const boxShadowData = elementBoxShadowData.get(currentSelectedElement);

        insideBoxShadowList.splice(0, insideBoxShadowList.length);
        outsideBoxShadowList.splice(0, outsideBoxShadowList.length);

        if (boxShadowData) {
            insideBoxShadowList.push(...boxShadowData.insideBoxShadowList);
            outsideBoxShadowList.push(...boxShadowData.outsideBoxShadowList);
        }

        refreshBoxShadowUI();
    }

    function refreshBoxShadowUI() {
        const insideContainer = document.getElementById('inside-box-shadow-list');
        const outsideContainer = document.getElementById('outside-box-shadow-list');
        insideContainer.innerHTML = '';
        outsideContainer.innerHTML = '';

        insideBoxShadowList.forEach((shadow, index) => {
            addBoxShadowToUI(insideContainer, shadow, index, true);
        });

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



    const textShadowList = [];
    let currentSelectedTextShadowIndex = 0;
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
        customContentHTML.dataset.index = newIndex; 
        customContentHTML.innerHTML = `
            <div class="flex-sb-align m-tb-10 gap10 b-2">
                <div class="flex-col gap10">
                    <p>Text Shadow ${newIndex + 1}</p>
                    <p class="text-shadow-value" style="color: white;">0px 0px 0px #000000</p>
                </div>
                
                <img class="small-img delete-text-shadow" src="/Icon/garbage.png" alt="Delete">
            </div>
        `;

        function updateShadowDisplay2() {
            const shadow = textShadowList[customContentHTML.dataset.index];
            customContentHTML.querySelector('.text-shadow-value').textContent =
                `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
        }

        customContentHTML.addEventListener('click', () => {
            selectTextShadow(parseInt(customContentHTML.dataset.index, 10));
        });

        customContentHTML.querySelector('.delete-text-shadow').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTextShadow(parseInt(customContentHTML.dataset.index, 10));
            customContentHTML.remove();
            refreshTextShadowIndices();
        });

        textShadowListContainer.appendChild(customContentHTML);
        updateShadowDisplay2();
        selectTextShadow(newIndex);
        saveTextShadowData();
    });

    function selectTextShadow(index) {
        currentSelectedTextShadowIndex = index;

        const items = document.querySelectorAll('.text-shadow-item');
        items.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active-shadow');
            } else {
                item.classList.remove('active-shadow');
            }
        });

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
            const addCssValue = input.getAttribute('add-css').replace(/\d+$/, '');

            if (addCssValue === 'text-shadow') {
                const currentShadow = textShadowList[currentSelectedTextShadowIndex];

                if (!currentShadow) return;

                if (input.id === 'horizontal-offset2') currentShadow.horizontal = parseInt(input.value, 10) || 0;
                if (input.id === 'vertical-offset2') currentShadow.vertical = parseInt(input.value, 10) || 0;
                if (input.id === 'blur-radius2') currentShadow.blur = parseInt(input.value, 10) || 0;
                if (input.id === 'shadow-color') currentShadow.color = input.value || '#000000';

                updateTextShadowCSS();
                updateShadowDisplay2(currentSelectedTextShadowIndex);
                saveTextShadowData();
            }
        });
    });

    function updateTextShadowCSS() {
        const textShadowString = textShadowList
            .map(shadow => `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`)
            .join(', ');

        if (currentSelectedElement) {
            const firstClass = currentSelectedElement.classList[0] || '';
            if (firstClass) {
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

    document.querySelector('.boxShadow').addEventListener('click', () => {
        document.querySelector('.boxShadow').classList.add('activate-shadow');
        document.querySelector('.textShadow').classList.remove('activate-shadow');

        document.querySelector('.boxShadow-setting').classList.remove('none');
        document.querySelector('.textShadow-setting').classList.add('none');
    });

    document.querySelector('.textShadow').addEventListener('click', () => {
        document.querySelector('.textShadow').classList.add('activate-shadow');
        document.querySelector('.boxShadow').classList.remove('activate-shadow');

        document.querySelector('.textShadow-setting').classList.remove('none');
        document.querySelector('.boxShadow-setting').classList.add('none');
    });



    const elementTextShadowData = new Map();

    function saveTextShadowData() {
        if (!currentSelectedElement) return;
        elementTextShadowData.set(currentSelectedElement, [...textShadowList]);
    }

    function loadTextShadowData() {
        if (!currentSelectedElement) return;

        const savedTextShadowData = elementTextShadowData.get(currentSelectedElement);

        textShadowList.splice(0, textShadowList.length);

        if (savedTextShadowData) {
            textShadowList.push(...savedTextShadowData);
        }

        refreshTextShadowUI();
    }

    function refreshTextShadowUI() {
        const container = document.getElementById('text-shadow-list');
        container.innerHTML = '';

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







    document.querySelectorAll('.bx-col').forEach(function (element) {
        element.setAttribute('draggable', true);

        element.addEventListener('dragstart', function (e) {
            let dragElementType = this.getAttribute('drag-element');
            e.dataTransfer.setData('element-type', dragElementType);
        });
    });

    let dropArea = document.getElementById('preview-content');

    dropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const target = e.target.closest('[data-id]');
        if (target) {
            target.classList.add('drop-target');
        }
    });

    dropArea.addEventListener('dragleave', function (e) {
        const target = e.target.closest('[data-id]');
        if (target) {
            target.classList.remove('drop-target');
        }
    });



    dropArea.addEventListener('drop', function (e) {
        e.preventDefault();

        const elementType = e.dataTransfer.getData('element-type');
        const draggedElementId = e.dataTransfer.getData('dragged-element-id');
        const target = e.target.closest('[data-id]'); 

        const dropTargets = document.querySelectorAll('.drop-target');
        dropTargets.forEach(target => target.classList.remove('drop-target'));

        if (!target && elementType === 'list-item') {
            displayErrorMessage("List items can only be added inside a <ul>.");
            return;
        }

        if (draggedElementId) {
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

                moveElement();
                trackChange({
                    do: moveElement,
                    undo: undoMove,
                });
            }
        } else if (elementType) {
            const newElement = createNewElement(elementType);

            if (newElement) {
                assignUniqueId(newElement);
                const parent = target ? target.parentElement : dropArea;

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
            element.setAttribute('contenteditable', 'true');
            element.setAttribute('spellcheck', 'true'); 
            element.classList.add('editing');

            element.style.outline = 'none';
            element.style.border = '1.5px solid #218cff';
            element.style.whiteSpace = 'pre-wrap';
            element.focus();

            element.querySelectorAll('.tag-name-display, .tag-name-display-hover').forEach(tag => tag.remove());

            element.addEventListener('blur', () => {
                element.removeAttribute('contenteditable');
                element.removeAttribute('spellcheck');
                element.removeAttribute('data-gramm_editor');
                element.classList.remove('editing');

                element.style.border = '';
                element.style.outline = '';
                element.style.whiteSpace = '';

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

                for (let i = 1; i <= 4; i++) {
                    let colDiv = document.createElement('div');

                    colDiv.classList.add(`col${i}`, 'w2-engine-bx');

                    newElement.appendChild(colDiv);
                }

                nextColNumber = 5;
                document.querySelector('.little-menu').classList.remove('none');
                break;
            case 'list':
                UlCounter++; 
                newElement = document.createElement('ul');
                newElement.classList.add(`ul${UlCounter}`, 'w2-engine-list');
                newElement.setAttribute('data-li-counter', '3');

                for (let i = 1; i <= 3; i++) {
                    const liDiv = document.createElement('li');
                    liDiv.classList.add(`li-item${i}`, 'w2-engine-li');
                    newElement.appendChild(liDiv);
                }

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
                const parentUl = dropArea.querySelector('ul');

                if (parentUl) {
                    let currentLiCounter = parseInt(parentUl.getAttribute('data-li-counter'), 10);

                    if (isNaN(currentLiCounter)) {
                        currentLiCounter = 3;
                    }

                    const nextLiIndex = currentLiCounter + 1;

                    newElement = document.createElement('li');
                    newElement.classList.add(`li-item${nextLiIndex}`, 'w2-engine-li');
                    parentUl.appendChild(newElement);

                    parentUl.setAttribute('data-li-counter', nextLiIndex);
                } else {
                    displayErrorMessage("List items can only be added inside a <ul> with class 'w2-engine-list'.");
                    return null;
                }
                break;
            case 'heading':
                HeadingCounter++;
                newElement = document.createElement('h1');
                newElement.classList.add(`Heading${HeadingCounter}`, 'w2-engine-text1');
                newElement.textContent = 'Heading';
                makeElementEditableInPlace(newElement);
                document.querySelector('.text-menu').classList.remove('none');
                break;
            case 'paragraph':
                ParagraphCounter++;
                newElement = document.createElement('p');
                newElement.classList.add(`Paragraph${ParagraphCounter}`);
                makeElementEditableInPlace(newElement);
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

        return newElement;
    }

    function displayErrorMessage(message) {
        const errorElement = document.querySelector('.error-message');
        errorElement.querySelector('.error-text').innerText = message;
        errorElement.classList.remove('none');

        setTimeout(() => {
            errorElement.classList.add('none');
        }, 5000);
    }


    function removeW2EngineFromParent(element) {
        const parent = element.parentElement;
        if (parent && parent.classList.contains('w2-engine')) {
            console.log(`Removing w2-engine class from parent`, parent);
            parent.classList.remove('w2-engine');
        } else {
            console.log(`No w2-engine class found in parent:`, parent);
        }
    }

    function assignW2EngineToChild(element) {
        const parent = element.parentElement;

        if (parent && parent.classList.contains('w2-engine')) {
            console.log('Removing w2-engine from parent and adding to child:', element);
            parent.classList.remove('w2-engine');
        }

        element.classList.add('w2-engine');
        console.log('Assigned w2-engine to:', element);
    }


    const colorPickers = {
        'hex-color1': { hue: 0, saturation: 100, brightness: 50, opacity: 1, huePosition: 0, colorPosX: 0, colorPosY: 0 },
        'hex-color2': { hue: 0, saturation: 100, brightness: 50, opacity: 1, huePosition: 0, colorPosX: 0, colorPosY: 0 },
        'hex-color3': { hue: 0, saturation: 100, brightness: 50, opacity: 1, huePosition: 0, colorPosX: 0, colorPosY: 0 },
        'hex-color4': { hue: 0, saturation: 100, brightness: 50, opacity: 1, huePosition: 0, colorPosX: 0, colorPosY: 0 },
        'hex-color5': { hue: 0, saturation: 100, brightness: 50, opacity: 1, huePosition: 0, colorPosX: 0, colorPosY: 0 },
    };

    function hslToHex(h, s, l, a) {
        const rgb = hslToRgb(h, s, l);

        const hex = rgbaToHex(rgb[0], rgb[1], rgb[2], a);
        return hex;
    }


    function rgbaToHex(r, g, b, a) {
        const hex = (c) => c.toString(16).padStart(2, '0');
        return `#${hex(r)}${hex(g)}${hex(b)}${hex(Math.round(a * 255))}`;
    }

    function hslToRgb(h, s, l) {
        let r, g, b;

        if (s === 0) {
            r = g = b = l;
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


    function hexToHSL(hex) {
        if (hex.length === 4 || hex.length === 5) {
            hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` + (hex[4] ? `${hex[4]}${hex[4]}` : '');
        }

        let r = parseInt(hex.substring(1, 3), 16) / 255;
        let g = parseInt(hex.substring(3, 5), 16) / 255;
        let b = parseInt(hex.substring(5, 7), 16) / 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
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

    const hueBars = document.querySelectorAll('.hue-slider .slider-bar');
    const hueCircles = document.querySelectorAll('.hue-slider .slider-circle');
    const colorDisplays = document.querySelectorAll('.color-display');
    const colorCircles = document.querySelectorAll('.color-display-circle');
    const opacityBars = document.querySelectorAll('.opacity-slider .slider-bar');
    const opacityCircles = document.querySelectorAll('.opacity-slider .slider-circle');


    hueCircles.forEach((hueCircle, index) => {
        const pickerClass = `hex-color${index + 1}`;

        hueCircle.addEventListener('mousedown', function (e) {
            let onMove = function (event) {
                let hueBarRect = hueBars[index].getBoundingClientRect();
                let x = Math.min(hueBarRect.width, Math.max(0, event.clientX - hueBarRect.left));


                hueCircle.style.left = `${x}px`;
                colorPickers[pickerClass].huePosition = x;
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

    opacityCircles.forEach((opacityCircle, index) => {
        const pickerClass = `hex-color${index + 1}`;

        opacityCircle.addEventListener('mousedown', function (e) {
            let onMove = function (event) {
                let opacityBarRect = opacityBars[index].getBoundingClientRect();

                let x = Math.min(opacityBarRect.width, Math.max(0, event.clientX - opacityBarRect.left));

                let leftPosition = x;
                opacityCircle.style.left = `${leftPosition}px`;

                colorPickers[pickerClass].opacity = x / opacityBarRect.width;

                updateColor(pickerClass);
            };

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', onMove);
            }, { once: true });
        });
    });

    function updateColor(pickerClass) {
        if (!colorPickers[pickerClass]) {
            console.error(`No color data found for pickerClass: ${pickerClass}`);
            return;
        }

        const { hue, saturation, brightness, opacity } = colorPickers[pickerClass];
        const hexColor = hslToHex(hue / 360, saturation / 100, brightness / 100, opacity);

        if (!currentSelectedElement) return;

        const firstClass = currentSelectedElement.classList[0];
        if (!firstClass) return;

        const inputElements = document.querySelectorAll(`.${pickerClass}`);
        let cssProperty = 'color';
        if (inputElements.length > 0) {
            cssProperty = inputElements[0].getAttribute('add-css') || 'color';
        }

        let oldColor = '';
        let styleTag = document.getElementById('dynamic-styles');
        if (styleTag) {
            for (let i = 0; i < styleTag.sheet.cssRules.length; i++) {
                const rule = styleTag.sheet.cssRules[i];
                if (rule.selectorText === `.${currentSelectedElement.classList[0]}`) {
                    const computedColor = rule.style[cssProperty];
                    if (computedColor) {
                        oldColor = rgbaToHex(
                            ...computedColor
                                .match(/\d+(\.\d+)?/g)
                                .slice(0, 3) 
                                .map(Number),
                            parseFloat(computedColor.match(/[\d.]+(?=\))/)?.[0] || 1)
                        );
                    }
                    break;
                }
            }
        }

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

            inputElements.forEach(input => (input.value = color));
        };

        applyColor(hexColor);

        trackChange({
            do: () => applyColor(hexColor),
            undo: () => applyColor(oldColor || ''),
        });

        updateHexInput(hexColor, pickerClass);
        updateCirclesAndDisplay(hue, saturation, brightness, pickerClass);
    }
    function updateHexInput(hex, pickerClass) {
        document.querySelectorAll(`.${pickerClass}`).forEach(input => {
            input.value = hex;
        });
    }

    function setupPickerForIndex(index) {
        const pickerClass = `hex-color${index + 1}`;
        const cssProperty = document.querySelector(`.${pickerClass}`)?.getAttribute('add-css') || '';
        let hexColor = '';
        let opacity = 1;

        if (cssProperty && currentSelectedElement) {
            const currentColor = getComputedStyle(currentSelectedElement)[cssProperty];

            if (currentColor) {
                const rgba = currentColor.match(/\d+(\.\d+)?/g);
                if (rgba && rgba.length >= 3) {
                    const [r, g, b] = rgba.slice(0, 3).map(Number);
                    opacity = rgba[3] ? parseFloat(rgba[3]) : 1;

                    hexColor = rgbaToHex(r, g, b, opacity);
                    const { h, s, l } = hexToHSL(hexColor);

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


    Object.keys(colorPickers).forEach(pickerClass => {
        document.querySelectorAll(`.${pickerClass}`).forEach(input => {

            input.addEventListener('input', function () {
                const hexValue = this.value;
                const hsl = hexToHSL(hexValue);
                const state = colorPickers[pickerClass];
                state.hue = hsl.h;
                state.saturation = hsl.s;
                state.brightness = hsl.l;
                state.opacity = state.opacity || 1;

                const cssProperty = this.getAttribute('add-css') || 'color';
                if (currentSelectedElement) {
                    const firstClass = currentSelectedElement.classList[0];
                    if (firstClass) {
                        let styleTag = document.getElementById('dynamic-styles');
                        if (!styleTag) {
                            styleTag = document.createElement('style');
                            styleTag.id = 'dynamic-styles';
                            document.head.appendChild(styleTag);
                        }

                        const rules = Array.from(styleTag.sheet.cssRules);
                        const existingRuleIndex = rules.findIndex(r => r.selectorText === `.${firstClass}`);
                        if (existingRuleIndex > -1) {
                            styleTag.sheet.deleteRule(existingRuleIndex);
                        }

                        const rule = `.${firstClass} { ${cssProperty}: ${hexValue}; }`;
                        styleTag.sheet.insertRule(rule, styleTag.sheet.cssRules.length);
                    }
                }
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
                const opacityPosition = pickerData.opacity * opacityBar.getBoundingClientRect().width;
                opacityCircle.style.left = `${opacityPosition}px`;
            }
        }
    }




    document.querySelectorAll('.color-picker').forEach(colorPicker => {
        const pickerId = colorPicker.getAttribute('data-picker-id');
        const colorBox = colorPicker.querySelector('.color-box');
        const pickerUI = colorPicker.querySelector(`#picker-ui-${pickerId}`);
        const backdrop = document.querySelector(`.backdrop[data-picker-id="${pickerId}"]`);

        if (colorBox && pickerUI && backdrop) {
            colorBox.addEventListener('click', function (event) {
                pickerUI.classList.toggle('visible');
                backdrop.classList.toggle('visible');

                event.stopPropagation();
            });

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


    let closeBackgroundMenu = document.querySelector('.close-background-menu');

    closeBackgroundMenu.onclick = function () {
        backgroundMenu.classList.add('none2')
    }



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

            const elBlock = document.createElement('div');
            elBlock.classList.add('main-navigator');
            elBlock.setAttribute('draggable', 'true');
            elBlock.dataset.targetId = el.dataset.id;
            elBlock.innerHTML = `
            <div class="flex-align gap5">
                <img class="small-img" src="${iconSrc}" alt="${el.tagName}">
                <p class="f-s-13">${firstClassName}</p>
            </div>
        `;

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

            buildNavigator(el, elBlock);
        });
    }

    function updateNavigator() {
        const bodyBlock = document.querySelector('.preview-body');

        if (bodyBlock) {
            const existingMain = bodyBlock.parentElement.querySelector('.main-navigator');
            if (existingMain) existingMain.remove();

            const mainBlock = document.createElement('div');
            mainBlock.classList.add('main-navigator');
            bodyBlock.parentElement.appendChild(mainBlock);

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
        event.preventDefault();
        const targetNavigator = event.target.closest('.main-navigator');

        if (targetNavigator && targetNavigator !== draggedNavigatorElement) {
            const targetRect = targetNavigator.getBoundingClientRect();
            const dropPosition = event.clientY - targetRect.top;

            if (dropPosition > targetRect.height / 4 && dropPosition < (3 * targetRect.height) / 4) {
                targetNavigator.classList.add('drag-over-inside');
                targetNavigator.classList.remove('drag-over-outside');
            } else {
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
                    targetDomElement.parentElement.insertBefore(draggedDomElement, targetDomElement);
                } else if (dropPosition > (3 * targetRect.height) / 4) {
                    targetDomElement.parentElement.insertBefore(draggedDomElement, targetDomElement.nextSibling);
                } else {
                    targetDomElement.appendChild(draggedDomElement);
                }
                updateNavigator();
            };

            const undoMove = () => {
                if (originalParent) {
                    originalParent.insertBefore(draggedDomElement, originalNextSibling);
                    updateNavigator();
                }
            };

            performMove();
            trackChange({
                do: performMove,
                undo: undoMove,
            });
        }

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
        const uniqueId = `element-${Date.now()}`;
        element.dataset.id = uniqueId;
    }


    function findPreviewElementByNavigator(navigatorElement) {
        const targetId = navigatorElement.dataset.targetId;
        return document.querySelector(`[data-id="${targetId}"]`);
    }

    function makeElementDroppable(element) {
        element.setAttribute('draggable', 'true');

        element.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('dragged-element-id', element.dataset.id);
            e.effectAllowed = 'move';
        });

        element.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        element.addEventListener('drop', function (e) {
            e.preventDefault();
            const draggedElementId = e.dataTransfer.getData('dragged-element-id');
            const draggedElement = document.querySelector(`[data-id="${draggedElementId}"]`);

            if (draggedElement && draggedElement !== element) {
                element.appendChild(draggedElement);
                updateNavigator();
            }
        });
    }
    const observer = new MutationObserver(updateNavigator);
    observer.observe(document.getElementById('preview-content'), {
        childList: true,
        subtree: true
    });

    updateNavigator();






    const uploadTrigger = document.getElementById('upload-trigger');
    const fileInput = document.getElementById('file-upload');

    uploadTrigger.addEventListener('click', () => {
        fileInput.click();
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

                document.querySelector('.menu-box-assets').classList.add('none');
            } else {
                alert('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred. Please try again.');
        }
    });


    const menuAllAssets = document.querySelector('.menu-all-assets');
    const boxAddingAssets = document.querySelector('.box-adding-assets');
    const allAssetsParagraph = boxAddingAssets.querySelector('.flex-sb-align p');
    const assetsGridBox = boxAddingAssets.querySelector('.assets-grid');
    const f1Assets2 = boxAddingAssets.querySelector('.f1-assets2');
    const menuAllAssetsImage = boxAddingAssets.querySelector('.open-menu-all-assets');
    const closeMenuAllAssets = document.querySelector('.menu-all-assets .close-menu-all-assets');

    function resetToDefault() {
        menuAllAssets.classList.add('none');
        allAssetsParagraph.classList.remove('none');
        assetsGridBox.classList.remove('none');
        f1Assets2.classList.remove('none');
        menuAllAssetsImage.classList.remove('none');

        const flexAlignDiv = boxAddingAssets.querySelector('.flex-align');
        if (flexAlignDiv) {
            flexAlignDiv.classList.remove('fix-flex');
        }
    }

    document.addEventListener('click', (event) => {
        const isClickInsideMenu = menuAllAssets.contains(event.target);
        const isClickInsideTrigger = menuAllAssetsImage.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideTrigger) {
            resetToDefault();
        }
    });

    menuAllAssetsImage.addEventListener('click', () => {
        menuAllAssets.classList.remove('none');

        allAssetsParagraph.classList.add('none');
        assetsGridBox.classList.add('none');
        f1Assets2.classList.add('none');
        menuAllAssetsImage.classList.add('none');

        const flexAlignDiv = boxAddingAssets.querySelector('.flex-align');
        if (flexAlignDiv) {
            flexAlignDiv.classList.add('fix-flex');
        }
    });

    closeMenuAllAssets.addEventListener('click', () => {
        resetToDefault();
    });







});





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



function toggleVisibilityBox(targetBox, targetButton) {
    const isActive = targetBox.classList.contains('active') && targetButton.classList.contains('active');

    boxAdding.classList.remove('active');
    boxNavigator.classList.remove('active');
    boxPages.classList.remove('active');
    boxAssets.classList.remove('active');
    boxDatabase.classList.remove('active');

    addElement1.classList.remove('active');
    addElement2.classList.remove('active');
    addElement3.classList.remove('active');
    addElement4.classList.remove('active');
    addElement5.classList.remove('active');

    if (!isActive) {
        targetBox.classList.add('active');
        targetButton.classList.add('active');
    }
}

addElement1.addEventListener('click', () => toggleVisibilityBox(boxAdding, addElement1));
addElement2.addEventListener('click', () => toggleVisibilityBox(boxNavigator, addElement2));
addElement3.addEventListener('click', () => toggleVisibilityBox(boxPages, addElement3));
addElement4.addEventListener('click', () => toggleVisibilityBox(boxAssets, addElement4));
addElement5.addEventListener('click', () => toggleVisibilityBox(boxDatabase, addElement5));




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
    if (!otherMenu.contains(event.target)) {
        otherMenu.classList.remove('active');
    }

    if (currentPositionAdd && !event.target.closest('.select')) {
        currentPositionAdd.classList.remove('show');
        currentPositionAdd = null; 
    }


    const backgroundMenu = document.querySelector('.background-menu');

    if (!backgroundMenu.contains(event.target) &&
        !event.target.closest('.background-style') &&
        !event.target.closest('.flex-sb-align')) {
        backgroundMenu.classList.add('none2');
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

let currentPositionAdd = null;

selectElements.forEach(function (select) {
    select.addEventListener('click', function (event) {
        const positionAdd = select.querySelector('.position-add');

        if (currentPositionAdd && currentPositionAdd !== positionAdd) {
            currentPositionAdd.classList.remove('show');
        }

        if (positionAdd.classList.contains('show')) {
            positionAdd.classList.remove('show');
        } else {
            positionAdd.classList.add('show');
        }

        currentPositionAdd = positionAdd;

        if (!event.target.classList.contains('position-choice') &&
            !event.target.classList.contains('text-choice1') &&
            !event.target.classList.contains('text-choice2') &&
            !event.target.classList.contains('clip-choice') &&
            !event.target.classList.contains('align-choice1') &&
            !event.target.classList.contains('align-choice2') &&
            !event.target.classList.contains('blending-choice') &&
            !event.target.classList.contains('cursor-choice')) {
            event.stopPropagation();
        }
    });
});


document.querySelectorAll('.description-css').forEach(descriptionCss => {
    const positionAdd = descriptionCss.closest('.position-add');

    const defaultParagraph = descriptionCss.querySelector('p:first-child');
    if (defaultParagraph) {
        defaultParagraph.classList.add('show');
    }

    positionAdd.querySelectorAll('.d-explain').forEach(choice => {
        choice.addEventListener('mouseenter', function () {
            descriptionCss.querySelectorAll('p').forEach(p => p.classList.remove('show'));

            const descriptionIndex = choice.getAttribute('data-description');
            const targetParagraph = descriptionCss.querySelector(`p:nth-child(${descriptionIndex})`);

            if (targetParagraph) {
                targetParagraph.classList.add('show');
            }
        });

        choice.addEventListener('mouseleave', function () {
            descriptionCss.querySelectorAll('p').forEach(p => p.classList.remove('show'));

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
function updatePreviewContentSize() {
    const width = previewContent.offsetWidth;
    const displayElement = document.getElementById('preview-size-display');

    displayElement.innerHTML = `${width} px`;
}


window.addEventListener('resize', updatePreviewContentSize);


const imgFull = document.getElementById('img-full');
const imgMedium = document.getElementById('img-medium');
const imgSmall = document.getElementById('img-small');

imgFull.addEventListener('click', function () {
    previewContent.style.width = '100%';
    previewContent.style.maxWidth = '';
    updatePreviewContentSize();
});

imgMedium.addEventListener('click', function () {
    previewContent.style.width = '55%';
    updatePreviewContentSize();

});

imgSmall.addEventListener('click', function () {
    previewContent.style.width = '22%';
    updatePreviewContentSize();

});

updatePreviewContentSize();




const codeBg = document.getElementById('code-bg');
const codeMenu = document.getElementById('code-menu');
const openCodeMenuButton = document.getElementById('open-code-menu');
const htmlTab = document.getElementById('html-tab');
const cssTab = document.getElementById('css-tab');
const downloadHtmlButton = document.getElementById('download-html');
const downloadCssButton = document.getElementById('download-css');
const htmlPreview = document.getElementById('html-preview');
const cssPreview = document.getElementById('css-preview');

let classCounters = {};

htmlTab.addEventListener('click', () => {
    htmlTab.classList.add('active');
    cssTab.classList.remove('active');
    htmlPreview.classList.remove('hidden');
    cssPreview.classList.add('hidden');
    downloadHtmlButton.classList.remove('hidden');
    downloadCssButton.classList.add('hidden');
});

cssTab.addEventListener('click', () => {
    cssTab.classList.add('active');
    htmlTab.classList.remove('active');
    cssPreview.classList.remove('hidden');
    htmlPreview.classList.add('hidden');
    downloadCssButton.classList.remove('hidden');
    downloadHtmlButton.classList.add('hidden');
});

downloadHtmlButton.addEventListener('click', () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${cleanHTML(previewContent.innerHTML)}
</body>
</html>`;
    downloadFile('index.html', htmlContent);
});

downloadCssButton.addEventListener('click', () => {
    const styleTag = document.getElementById('dynamic-styles');
    const rawCSS = styleTag ? styleTag.innerHTML : '';
    const formattedCSS = cleanCSS(rawCSS);

    downloadFile('style.css', formattedCSS);
});

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}


function createDiv() {
    updatePreviews();
}

const observer = new MutationObserver(() => {
    updatePreviews();
});

observer.observe(previewContent, { childList: true, attributes: true, subtree: true });

function cleanHTML(html) {
    const container = document.createElement('div');
    container.innerHTML = html;

    container.querySelectorAll('*').forEach((el) => {
        el.removeAttribute('id');
        el.removeAttribute('data-id');
        el.removeAttribute('draggable');
        el.classList.remove('selected', 'hovering');

        if (el.classList.length > 0) {
            el.className = el.classList[0];
        } else {
            el.removeAttribute('class');
        }
    });

    return container.innerHTML
        .replace(/></g, (match, offset, fullString) => {
            const before = fullString[offset - 1];
            const after = fullString[offset + match.length];
            if (before === '/' || after === '/') {
                return match;
            }
            return '>\n<';
        })
        .trim();
}

function cleanCSS(css) {
    return css
        .split('}')
        .map((rule) => {
            const [selector, properties] = rule.split('{');
            if (!selector || !properties) return '';

            const formattedProperties = properties
                .trim()
                .split(';')
                .filter((prop) => prop.trim())
                .map((prop) => `    ${prop.trim()};`)
                .join('\n');

            return `${selector.trim()} {\n${formattedProperties}\n}`;
        })
        .filter(Boolean)
        .join('\n\n')
        .trim();
}

function updatePreviews() {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${cleanHTML(previewContent.innerHTML)}
</body>
</html>`;
    htmlPreview.value = htmlContent;

    const styleTag = document.getElementById('dynamic-styles');
    const rawCSS = styleTag ? styleTag.innerHTML : '';
    cssPreview.value = cleanCSS(rawCSS);
}

openCodeMenuButton.addEventListener('click', () => {
    codeBg.classList.remove('hidden');
});

document.addEventListener('click', (event) => {
    if (!codeMenu.contains(event.target) && !openCodeMenuButton.contains(event.target)) {
        codeBg.classList.add('hidden');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    createDiv();
    updatePreviews();
});