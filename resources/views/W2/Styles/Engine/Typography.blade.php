<div class="typography">
    <div class="backdrop" data-picker-id="1"></div>
    <div class="main close-f5-style m-b-20">
        <div class="flex-align gap10">
            <div class="reset-styles">
                <img class="small-img" src="/Icon/icons8-arrow-96.png" alt="">
            </div>
            <h1>Typography</h1>
        </div>
    </div>

    <div class="f5-style">
        <div class="flex-sb-align gap10 m-tb-10">
            <p>Font</p>

            <div class="flex-sb-align select position-r w-mw">
                <div id="currentWeight2">Arial</div>

                <img class="small-img" src="/Icon/arrow-down.png" alt="">

                <div class="position-add simple-size">
                    <h1 class="text-choice1" add-css="font-family: Arial;">Arial</h1>
                    <h1 class="text-choice1" add-css="font-family: Courier;">Courier</h1>
                    <h1 class="text-choice1" add-css="font-family: monospace;">Monospace</h1>
                    <h1 class="text-choice1" add-css="font-family: Calibri;">Calibri</h1>
                    <h1 class="text-choice1" add-css="font-family: Trebuchet MS;">Trebuchet MS</h1>
                    <h1 class="text-choice1" add-css="font-family: Lucida Sans;">Lucida Sans</h1>
                    <h1 class="text-choice1" add-css="font-family: Lucida Grande;">Lucida Grande</h1>
                    <h1 class="text-choice1" add-css="font-family: Geneva;">Geneva</h1>
                    <h1 class="text-choice1" add-css="font-family: Verdana;">Verdana</h1>
                    <h1 class="text-choice1" add-css="font-family: system-ui;">System-ui</h1>
                    <h1 class="text-choice1" add-css="font-family: cursive;">Cursive</h1>
                    <h1 class="text-choice1" add-css="font-family: Times New Roman;">Times New Roman</h1>
                    <h1 class="text-choice1" add-css="font-family: fantasy;">Fantasy</h1>
                    <h1 class="text-choice1" add-css="font-family: serif;">Serif</h1>
                    <h1 class="text-choice1" add-css="font-family: Open Sans;">Open Sans</h1>
                    <h1 class="text-choice1" add-css="font-family: sans-serif;">Sans-Serif</h1>
                </div>
            </div>

        </div>

        <div class="flex-sb-align gap10 m-tb-10">
            <p>Weight</p>

            <div class="flex-sb-align select position-r w-mw">
                <div id="currentWeight3">400 - Normal</div>

                <img class="small-img" src="/Icon/arrow-down.png" alt="">

                <div class="position-add simple-size">
                    <h1 class="text-choice2" add-css="font-weight: 100;">100 - Thin</h1>
                    <h1 class="text-choice2" add-css="font-weight: 200;">200 - Extra Light</h1>
                    <h1 class="text-choice2" add-css="font-weight: 300;">300 - Light</h1>
                    <h1 class="text-choice2" add-css="font-weight: 400;">400 - Normal</h1>
                    <h1 class="text-choice2" add-css="font-weight: 500;">500 - Medium</h1>
                    <h1 class="text-choice2" add-css="font-weight: 600;">600 - Semi Bold</h1>
                    <h1 class="text-choice2" add-css="font-weight: 700;">700 - Bold</h1>
                    <h1 class="text-choice2" add-css="font-weight: 800;">800 - Extra Bold</h1>
                    <h1 class="text-choice2" add-css="font-weight: 900;">900 - Black</h1>
                </div>
            </div>

        </div>

        <div class="flex gap10 m-tb-10">
            <div class="w-propety">
                <div class="flex-sb position-element">
                    <p>Size</p>
                    <input type="number" class="input-number" placeholder="Auto" add-css="font-size">

                    <div class="select-layout s-fix2" data-unit-for="fontSizeInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                        <div value="auto">AUTO</div>
                    </div>
                </div>

            </div>
            <div class="h-propety">
                <div class="flex-sb position-element">
                    <p>Height</p>
                    <input type="number" class="input-number" placeholder="Auto" add-css="line-height">

                    <div class="select-layout s-fix2" data-unit-for="lineHeightInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                        <div value="auto">AUTO</div>
                    </div>
                </div>

            </div>
        </div>

        <div class="flex-sb-align gap10 m-tb-10 position-r">
            <p>Color</p>



            <div class="color-picker" data-picker-id="1">
                <!-- The clickable box for inputting color in hex format -->
                <input type="text" class="hex-color1 w-mw-color p-l-im" placeholder="Auto" add-css="color">
                <div class="color-box">Color</div>
            
                <!-- The color picker UI -->
                <div class="color-picker-ui" id="picker-ui-1" data-picker-id="1" Z-id="hex-color1">
                    <!-- The color selection area (big div) -->
                    <div class="color-display" id="color-display1" Z-id="hex-color1">
                        <!-- Circle for selecting color in the big div -->
                        <div class="color-display-circle" id="color-display-circle" Z-id="hex-color1"></div>
                    </div>
            
                    <!-- The hue slider (line) -->
                    <div class="hue-slider">
                        <div class="slider-bar" id="hue-bar" Z-id="hex-color1"></div>
                        <div class="slider-circle" id="hue-circle" Z-id="hex-color1"></div>
                    </div>
            
                    <!-- The opacity slider -->
                    <div class="opacity-slider">
                        <div class="slider-bar" id="opacity-bar" Z-id="hex-color1"></div>
                        <div class="slider-circle" id="opacity-circle" Z-id="hex-color1"></div>
                    </div>
            
                    <!-- Secondary input field for color -->
                    <input type="text" class="hex-color1 w-mw m-t-20" placeholder="Auto" add-css="color">
                </div>
            </div>
        </div>



        {{-- <div class="flex-sb-align gap10 m-tb-10 position-r">
            <p>Color</p>



            <div class="color-picker" data-picker-id="1">
                <!-- Color input with unique change-color attribute -->
                <input type="text" class="hex-color w-mw-color p-l-im" value="#ff0000ff" placeholder="Auto"
                       add-css="color" change-color="color-picker-1">
            
                <!-- The clickable box to open the color picker UI -->
                <div class="color-box">Color</div>
            
                <!-- The color picker UI -->
                <div class="color-picker-ui" id="picker-ui-1" style="display:none;" hange-color="color-picker-1">
                    <!-- The color selection area (big div) -->
                    <div class="color-display" id="color-display" hange-color="color-picker-1">
                        <!-- Circle for selecting color in the big div -->
                        <div class="color-display-circle" id="color-display-circle"></div>
                    </div>
            
                    <!-- The hue slider (line) -->
                    <div class="hue-slider" hange-color="color-picker-1">
                        <div class="slider-bar" id="hue-bar"></div>
                        <div class="slider-circle" id="hue-circle"></div>
                    </div>
            
                    <!-- The opacity slider -->
                    <div class="opacity-slider" hange-color="color-picker-1">
                        <div class="slider-bar" id="opacity-bar"></div>
                        <div class="slider-circle" id="opacity-circle"></div>
                    </div>
            
                    <!-- Secondary hex input for color, with a unique change-color attribute -->
                    <input type="text" class="hex-color w-mw m-t-20" value="#ff0000ff" maxlength="9"
                           add-css="color" change-color="color-picker-1" />
                </div>
            </div>
        </div> --}}

        <div class="flex-align m-tb-20">
            <p class="width100">Align</p>
            <div class="flex-col-align buttons4">
                <button class="btn-s6 active classic" add-css="text-align: left"><img class="normal-img"
                        src="/Icon/text-align-left-icon.png" alt=""></button>

                <button class="btn-s6 classic" add-css="text-align: right"><img class="normal-img" src="/Icon/text-align-right-icon.png"
                        alt=""></button>

                <button class="btn-s6 classic" add-css="text-align: center"><img class="normal-img" src="/Icon/text-align-center-icon.png"
                        alt=""></button>
                <button class="btn-s6 classic" add-css="text-align: justify"><img class="normal-img" src="/Icon/text-align-justify-icon.png"
                        alt=""></button>
            </div>
        </div>

        <p>Style Text</p>
        <div class="flex-sb m-tb-10">


            <div class="flex-align gap10">
                <p class="width100">Italicize</p>
                <div class="flex-col-align buttons4">
                    <button class="btn-s7 active classic" add-css="remove: font-style"><img class="normal-img" src="/Icon/icons8-i-96.png"
                            alt=""></button>

                    <button class="btn-s7 classic" add-css="font-style: italic;"><img class="normal-img" src="/Icon/icons8-italic-96.png"
                            alt=""></button>
                </div>
            </div>


            <div class="flex-align gap10">
                <p class="width100">Decoration</p>
                <div class="flex-col-align buttons4">
                    <button class="btn-s8 active classic" add-css="remove: text-decoration"><img class="normal-img"
                            src="/Icon/icons8-remove-96 (1).png" alt=""></button>

                    <button class="btn-s8 classic" add-css="text-decoration: solid;"><img class="normal-img" src="/Icon/solid.png"
                            alt=""></button>
                    <button class="btn-s8 classic" add-css="text-decoration: dashed;"><img class="normal-img" src="/Icon/dashed.png"
                            alt=""></button>
                    <button class="btn-s8 classic" add-css="text-decoration: dotted;"><img class="normal-img" src="/Icon/dotted.png"
                            alt=""></button>

                </div>
            </div>

        </div>

    </div>
</div>
