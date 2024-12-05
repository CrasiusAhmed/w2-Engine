<div class="border">
    <div class="backdrop" data-picker-id="3"></div>
    <div class="main close-f7-style">
        <div class="flex-align gap10">
            <div class="reset-styles">
                <img class="small-img" src="/Icon/icons8-arrow-96.png" alt="">
            </div>
            <h1>Border</h1>
        </div>
    </div>



    <div class="f7-style">


        <div class="flex-col">
            <div class="square-border">
                <div class="top-border activate-square-border">
                    <img class="fit-img" src="/Icon/border-top.png" alt="">
                </div>

                <div class="right-border activate-square-border">
                    <img class="fit-img" src="/Icon/border-right.png" alt="">
                </div>

                <div class="center-border activate-square-border">
                    <img class="fit-img" src="/Icon/border-all.png" alt="">
                </div>

                <div class="bottom-border activate-square-border">
                    <img class="fit-img" src="/Icon/border-bottom.png" alt="">
                </div>

                <div class="left-border activate-square-border">
                    <img class="fit-img" src="/Icon/border-left.png" alt="">
                </div>
            </div>

            <div class="flex-col">


                <div class="flex-sb-align m-b-10">
                    <h1>Border Custom</h1>
                    <img class="small-img" src="/Icon/arrow-down.png" alt="">
                </div>

                <div class="flex-sb m-tb-10 position-element">
                    <div class="flex-align gap10">
                        <img class="normal-img" src="/Icon/border-all.png" alt="">
                        <p>Border-width</p>
                    </div>

                    <input type="number" class="input-number" placeholder="Auto" add-css="border-width">

                    <div class="select-layout s2-fix" data-unit-for="borderWidthInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                    </div>
                </div>

                <div class="flex-sb m-tb-10 position-element">
                    <div class="flex-align gap10">
                        <img class="normal-img" src="/Icon/border-top.png" alt="">
                        <p>Border-top-width</p>
                    </div>

                    <input type="number" class="input-number" placeholder="Auto" add-css="border-top-width">

                    <div class="select-layout s2-fix" data-unit-for="borderTopWidthInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                    </div>
                </div>

                <div class="flex-sb m-tb-10 position-element">
                    <div class="flex-align gap10">
                        <img class="normal-img" src="/Icon/border-right.png" alt="">
                        <p>Border-right-width</p>
                    </div>

                    <input type="number" class="input-number" placeholder="Auto" add-css="border-right-width">

                    <div class="select-layout s2-fix" data-unit-for="borderRightWidthInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                    </div>
                </div>

                <div class="flex-sb m-tb-10 position-element">
                    <div class="flex-align gap10">
                        <img class="normal-img" src="/Icon/border-bottom.png" alt="">
                        <p>Border-bottom-width</p>
                    </div>

                    <input type="number" class="input-number" placeholder="Auto" add-css="border-bottom-width">

                    <div class="select-layout s2-fix" data-unit-for="borderBottomWidthInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                    </div>
                </div>

                <div class="flex-sb m-tb-10 position-element">
                    <div class="flex-align gap10">
                        <img class="normal-img" src="/Icon/border-left.png" alt="">
                        <p>Border-left-width</p>
                    </div>

                    <input type="number" class="input-number" placeholder="Auto" add-css="border-left-width">

                    <div class="select-layout s2-fix" data-unit-for="borderLeftWidthInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                    </div>
                </div>
                {{-- <div class="flex-align gap10 m-b-20">
                    <p>Width</p>
                    <input type="number" class="input-number" placeholder="Auto">
                </div> --}}
                <div class="flex-sb-align gap10 m-tb-10 position-r">
                    <p>Color</p>
        
        
        
                    <div class="color-picker" data-picker-id="3">
                        <!-- The clickable box for inputting color in hex format -->
                        <input type="text" class="hex-color3 w-mw-color p-l-im" placeholder="Auto" add-css="border-color">
                        <div class="color-box">Color</div>
                    
                        <!-- The color picker UI -->
                        <div class="color-picker-ui" id="picker-ui-3" data-picker-id="3" Z-id="hex-color3">
                            <!-- The color selection area (big div) -->
                            <div class="color-display" id="color-display3" Z-id="hex-color3">
                                <!-- Circle for selecting color in the big div -->
                                <div class="color-display-circle" id="color-display-circle" Z-id="hex-color3"></div>
                            </div>
                    
                            <!-- The hue slider (line) -->
                            <div class="hue-slider">
                                <div class="slider-bar" id="hue-bar" Z-id="hex-color3"></div>
                                <div class="slider-circle" id="hue-circle" Z-id="hex-color3"></div>
                            </div>
                    
                            <!-- The opacity slider -->
                            <div class="opacity-slider">
                                <div class="slider-bar" id="opacity-bar" Z-id="hex-color3"></div>
                                <div class="slider-circle" id="opacity-circle" Z-id="hex-color3"></div>
                            </div>
                    
                            <!-- Secondary input field for color -->
                            <input type="text" class="hex-color3 w-mw m-t-20" placeholder="Auto" add-css="border-color">
                        </div>
                    </div>
                </div>

                <div class="flex-align gap10 m-t-20">
                    <p class="width60">Styles</p>

                    <div class="flex-col-align buttons4">
                        <button class="btn-s9 active classic" add-css="remove: border-style">
                            <img class="normal-img" src="/Icon/icons8-remove-96 (1).png" alt="">
                        </button>

                        <button class="btn-s9 classic" add-css="border-style: solid;">
                            <img class="normal-img" src="/Icon/solid.png" alt="">
                        </button>

                        <button class="btn-s9 classic" add-css="border-style: dashed;">
                            <img class="normal-img" src="/Icon/dashed.png" alt="">
                        </button>

                        <button class="btn-s9 classic" add-css="border-style: dotted;">
                            <img class="normal-img" src="/Icon/dotted.png" alt="">
                        </button>
                    </div>

                </div>

                
    
            </div>
        </div>
    </div>
</div>
