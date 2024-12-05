<div class="shadows">
    <div class="main close-f6-style m-b-20">
        <div class="flex-align gap10">
            <div class="reset-styles">
                <img class="small-img" src="/Icon/icons8-arrow-96.png" alt="">
            </div>
            <h1>Shadows</h1>
        </div>
    </div>

    <div class="f11-style">
        <div class="flex-sb-align m-b-10 p-lr-20 gap20">
            <div class="boxShadow activate-shadow">
                <img class="fit-img" src="/Icon/boxShadow.png" alt="">
            </div>

            <div class="textShadow">
                <img class="fit-img" src="/Icon/textShadow.png" alt="">
            </div>

        </div>


        <div class="boxShadow-setting">
            <div class="flex-sb-align m-tb-20 box-shadow-create">
                <p>Box Shadow</p>

                <img class="small-img" src="/Icon/add.png" alt="">
            </div>

            <div id="outside-box-shadow-list"></div> <!-- Container for outside shadows -->
            <div id="inside-box-shadow-list" style="display: none;"></div> <!-- Container for inside shadows -->

            <div class="flex align-c m-tb-20 buttons4 boxShadow-btn">
                <div class="btn-bx-outside active position-r">
                    <p class="position-center" style="color: white; width: auto;">Outside</p>

                </div>

                <div class="btn-bx-inside position-r">
                    <p class="position-center" style="color: white; width: auto;">Inside</p>

                </div>

            </div>



            <div class="flex-sb m-tb-20">
                <div class="flex-align gap10">
                    <img class="normal-img" src="/Icon/Horizontal-shadow.png" alt="">
                    <p>Horizontal Offset</p>
                </div>

                <div class="flex-sb position-element">
                    <input id="horizontal-offset" type="number" class="input-number width65" placeholder="Auto" add-css="box-shadow">

                    <div class="select-layout remove-unit" data-unit-for="boxShadowInput1">
                        <div value="px">PX</div>
                    </div>
                </div>
            </div>


            <div class="flex-sb m-tb-20">
                <div class="flex-align gap10">
                    <img class="normal-img" src="/Icon/Vertical-shadow.png" alt="">
                    <p>Vertical Offset</p>
                </div>



                <div class="flex-sb position-element">
                    <input id="vertical-offset" type="number" class="input-number width65" placeholder="Auto" add-css="box-shadow2">

                    <div class="select-layout remove-unit" data-unit-for="boxShadowInput2">
                        <div value="px">PX</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb m-tb-20">
                <div class="flex-align gap10">
                    <img class="normal-img" src="/Icon/boxShadow.png" alt="">
                    <p>Blur Radius</p>
                </div>


                <div class="flex-sb position-element">
                    <input type="number" id="blur-radius" class="input-number width65" placeholder="Auto" add-css="box-shadow3">

                    <div class="select-layout remove-unit" data-unit-for="boxShadowInput3">
                        <div value="px">PX</div>
                    </div>
                </div>
            </div>


            <div class="flex-sb-align gap10 m-tb-10 position-r">
                <div class="flex-align gap10">
                    <img class="normal-img" src="/Icon/Rgb-color.png" alt="">
                    <p>Color</p>
                </div>


                <input id="shadow-color" style="width: 32%;" type="color" add-css="box-shadow4" />


            </div>

        </div>



        <div class="textShadow-setting none">
            <div class="flex-sb-align m-tb-20 text-shadow-create">
                <p>Text Shadow</p>

                <img class="small-img" src="/Icon/add.png" alt="">
            </div>

            <div id="text-shadow-list"></div>
            <div class="flex-sb m-tb-20">
                <div class="flex-align gap10">
                    <img class="normal-img" src="/Icon/Horizontal-textShadow.png" alt="">
                    <p>Horizontal Offset</p>
                </div>

                <div class="flex-sb position-element">
                    <input type="number" id="horizontal-offset2" class="input-number width65" placeholder="Auto" add-css="text-shadow1">

                    <div class="select-layout remove-unit" data-unit-for="textShadowInput1">
                        <div value="px">PX</div>
                    </div>
                </div>
            </div>


            <div class="flex-sb m-tb-20">
                <div class="flex-align gap10">
                    <img class="normal-img" src="/Icon/Vertical-textShadow.png" alt="">
                    <p>Vertical Offset</p>
                </div>



                <div class="flex-sb position-element">
                    <input type="number" id="vertical-offset2" class="input-number width65" placeholder="Auto" add-css="text-shadow2">

                    <div class="select-layout remove-unit" data-unit-for="textShadowInput2">
                        <div value="px">PX</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb m-tb-20">
                <div class="flex-align gap10">
                    <img class="normal-img" src="/Icon/textShadow.png" alt="">
                    <p>Blur Radius</p>
                </div>


                <div class="flex-sb position-element">
                    <input type="number" id="blur-radius2" class="input-number width65" placeholder="Auto" add-css="text-shadow3">

                    <div class="select-layout remove-unit" data-unit-for="textShadowInput3">
                        <div value="px">PX</div>
                    </div>
                </div>
            </div>


            <div class="flex-sb-align gap10 m-tb-10 position-r">
                <div class="flex-align gap10">
                    <img class="normal-img" src="/Icon/Rgb-color.png" alt="">
                    <p>Color</p>
                </div>




                <input id="shadow-color2" style="width: 32%;" type="color" add-css="text-shadow4" />
            </div>
        </div>



    </div>
</div>
