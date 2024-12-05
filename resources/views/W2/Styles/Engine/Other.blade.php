<div class="other">
    <div class="backdrop" data-picker-id="4"></div>
    <div class="main close-f8-style m-b-20">
        <div class="flex-align gap10">
            <div class="reset-styles">
                <img class="small-img" src="/Icon/icons8-arrow-96.png" alt="">
            </div>
            <h1>Effect</h1>
        </div>
    </div>

    <div class="f8-style">

        <div class="flex-sb-align gap10 m-b-10">
            <p>Bleding</p>

            <div class="flex-sb-align select position-r">
                <div id="currentWeight5">Normal</div>

                <img class="small-img" src="/Icon/arrow-down.png" alt="">

                <div class="position-add simple-size">
                    <h1 class="blending-choice" add-css="mix-blend-mode: normal;">Normal</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: darken;">Darken</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: multiply;">Multiply</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: color-burn;">Color Burn</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: lighten;">Lighten</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: screen;">Screen</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: color-dodge;">Color Dodge</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: overlay;">Overlay</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: soft-light;">Soft Light</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: hard-light;">Hard Light</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: difference;">Difference</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: exclusion;">Exclusion</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: hue;">Hue</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: saturation;">Saturation</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: color;">Color</h1>
                    <h1 class="blending-choice" add-css="mix-blend-mode: luminosity;">Luminosity</h1>
                </div>
            </div>
        </div>

        <div class="flex gap10 m-b-10" id="opacity-container">
            <div class="flex-align gap10 width100">
                <img class="normal-img" src="/Icon/opacity.png" alt="">
                <p>Opacity</p>
            </div>


            <div class="flex-sb position-element">
                <input type="number" class="input-number width65" placeholder="Auto" add-css="opacity">

                {{-- <div class="select-layout remove-span-unit" data-unit-for="opacityInput">
                    <span>%</span>
                    <div value="%">%</div>
                </div> --}}

                {{-- <div class="select-layout remove-span-unit" data-unit-for="rotateInput">
                    <span>DEG</span>
                    <div value="DEG">DEG</div>
                </div> --}}
            </div>
        </div>

        <div class="flex-sb-align gap10 m-b-10">
            <p>Cursor</p>



            <div class="flex-sb-align select position-r">
                <div id="currentWeight6">Auto</div>

                <img class="small-img" src="/Icon/arrow-down.png" alt="">

                <div class="position-add simple-size">
                    <h1 class="cursor-choice" add-css="cursor: auto;">Auto</h1>
                    <h1 class="cursor-choice" add-css="cursor: none;">None</h1>
                    <h1 class="cursor-choice" add-css="cursor: pointer;">Pointer</h1>
                    <h1 class="cursor-choice" add-css="cursor: grab;">Grab</h1>
                    <h1 class="cursor-choice" add-css="cursor: grabbing;">Grabbing</h1>
                    <h1 class="cursor-choice" add-css="cursor: move;">Move</h1>
                    <h1 class="cursor-choice" add-css="cursor: wait;">Wait</h1>
                    <h1 class="cursor-choice" add-css="cursor: help;">Help</h1>
                </div>
            </div>
        </div>

        <div class="flex-sb-align gap10 m-b-10">
            <p>Events</p>

            <div class="flex buttons4">
                <button class="btn-s10 active" add-css="pointer-events: auto;">Auto</button>
                <button class="btn-s10" add-css="pointer-events: none;">None</button>
            </div>
        </div>


        <div class="flex-align gap10 m-tb-10 p-t-20 b-t-2">
            <p class="width30">Outline</p>
            <div class="flex align-c buttons4">
                <button class="btn-s8 classic-simple" add-css="remove: outline">
                    <img class="normal-img" src="/Icon/icons8-remove-96 (1).png" alt="">
                </button>

                <button class="btn-s8 classic" add-css="outline: solid;"><img class="normal-img"
                        src="/Icon/solid.png" alt=""></button>
                <button class="btn-s8 classic" add-css="outline: dashed;"><img class="normal-img"
                        src="/Icon/dashed.png" alt=""></button>
                <button class="btn-s8 classic" add-css="outline: dotted;"><img class="normal-img"
                        src="/Icon/dotted.png" alt=""></button>

            </div>
        </div>

        <div class="flex gap10 m-tb-10">
            <div class="w-propety">
                <div class="flex-sb">
                    <p>Width</p>
                    <input type="number" class="input-number" placeholder="Auto">
                </div>

            </div>
            <div class="h-propety">
                <div class="flex-sb">
                    <p>Offset</p>
                    <input type="number" class="input-number" placeholder="Auto">
                </div>

            </div>
        </div>

        <div class="flex-sb-align gap10 m-tb-10 b-b-2 p-b-20 position-r">
            <p>Color</p>



            <div class="color-picker" data-picker-id="4">
                <!-- The clickable box for inputting color in hex format -->
                <input type="text" class="hex-color4 w-mw-color p-l-im" placeholder="Auto"
                    add-css="outline-color">
                <div class="color-box">Color</div>

                <!-- The color picker UI -->
                <div class="color-picker-ui" id="picker-ui-4" data-picker-id="4" Z-id="hex-color4">
                    <!-- The color selection area (big div) -->
                    <div class="color-display" id="color-display4" Z-id="hex-color4">
                        <!-- Circle for selecting color in the big div -->
                        <div class="color-display-circle" id="color-display-circle" Z-id="hex-color4"></div>
                    </div>

                    <!-- The hue slider (line) -->
                    <div class="hue-slider">
                        <div class="slider-bar" id="hue-bar" Z-id="hex-color4"></div>
                        <div class="slider-circle" id="hue-circle" Z-id="hex-color4"></div>
                    </div>

                    <!-- The opacity slider -->
                    <div class="opacity-slider">
                        <div class="slider-bar" id="opacity-bar" Z-id="hex-color4"></div>
                        <div class="slider-circle" id="opacity-circle" Z-id="hex-color4"></div>
                    </div>

                    <!-- Secondary input field for color -->
                    <input type="text" class="hex-color4 w-mw m-t-20" placeholder="Auto" add-css="outline-color">
                </div>
            </div>
        </div>

        {{-- <div class="flex-sb-align gap10 m-tb-10 b-b-2 p-b-20 position-r">
            <p>Color</p>



            <div class="color-picker" data-picker-id="4">
                <!-- The clickable box -->
                <input type="text" class="hex-color w-mw-color p-l-im" value="#ff0000ff" change-color="color-picker-4" placeholder="Auto" add-css="outline-color">
                <div class="color-box">Color</div>
            
                <!-- The color picker UI -->
                <div class="color-picker-ui" id="picker-ui-4" style="display:none;" change-color="color-picker-4">
                    <!-- The color selection area (big div) -->
                    <div class="color-display" id="color-display" change-color="color-picker-4">
                        <!-- Circle for selecting color in the big div -->
                        <div class="color-display-circle" id="color-display-circle"></div>
                    </div>
            
                    <!-- The hue slider (line) with change-color attribute -->
                    <div class="hue-slider" change-color="color-picker-4">
                        <div class="slider-bar" id="hue-bar"></div>
                        <div class="slider-circle" id="hue-circle"></div>
                    </div>
            
                    <!-- The opacity slider with change-color attribute -->
                    <div class="opacity-slider" change-color="color-picker-4">
                        <div class="slider-bar" id="opacity-bar"></div>
                        <div class="slider-circle" id="opacity-circle"></div>
                    </div>
                </div>
            
                    <!-- Secondary hex input for background color, also with change-color attribute -->
                    <input type="text" class="hex-color w-mw m-t-20" value="#ff0000ff" maxlength="9"
                           add-css="outline-color" change-color="color-picker-4" />
            </div>
        </div> --}}


        <div class="flex-sb-align m-b-10">
            <p>2D & 3D transforms</p>

            <img class="small-img" src="/Icon/icons8-radio-button-96.png" alt="">
        </div>

        <div class="flex-sb-align m-b-10">
            <p>Transition</p>

            <img class="small-img" src="/Icon/icons8-radio-button-96.png" alt="">
        </div>

        <div class="flex-sb-align m-b-10">
            <p>Filters</p>

            <img class="small-img" src="/Icon/icons8-radio-button-96.png" alt="">
        </div>

        <div class="flex-sb-align m-b-10">
            <p>Backdrop filters</p>

            <img class="small-img" src="/Icon/icons8-radio-button-96.png" alt="">
        </div>


    </div>



    <div class="main close-f9-style">
        <h1>Custom properties</h1>
    </div>

    <div class="f9-style">
        <button class="btn2 m-tb-10">Add</button>
    </div>
</div>
