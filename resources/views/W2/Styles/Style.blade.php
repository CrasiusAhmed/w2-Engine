<div class="style-menu none" id="div-block-panel">
    <div class="style-group1">
        <div class="flex-sb">
            <h1>Classic Css</h1>

            <div class="/Icon-styles">

                <img class="small-img" src="/Icon/icons8-remove-96 (1).png" alt=""></button>
            </div>
        </div>

        <div class="title">
            <h1>Styles</h1>
        </div>

        <div class="class-name">
            <img src="/Images/w2-engine-auth.png" alt="">
            <h1 class="name-hover-select">Example</h1>
        </div>


        <div class="flex-sb m-tb-10">
            <p class="m-0">Style selector</p>

            <p class="m-0">Inheriting <span>Select</span></p>
        </div>
        <div class="input-class">
            <input type="text" id="class-name-input" placeholder="Enter Your Class Name" />
            <button id="add-class-btn" class="btn-click m-tb-10">Add Class</button>
        </div>
    </div>

    <div class="style-group2">
        <div class="flex-sb gap10 all-box">
            <div class="box-layout">
                <div class="position-center">
                    <img src="/Icon/layout.png" alt="">
                    <p>Layout (Display)</p>
                </div>
            </div>
            <div class="box-spacing">
                <div class="position-center">
                    <img src="/Icon/spacing.png" alt="">
                    <p>Spacing</p>
                </div>
            </div>
        </div>

        <div class="flex-sb gap10 all-box">
            <div class="box-size">
                <div class="position-center">
                    <img src="/Icon/size.png" alt="">
                    <p>Size</p>
                </div>
            </div>


            <div class="box-position">
                <div class="position-center">
                    <img src="/Icon/position.png" alt="">
                    <p>Position</p>
                </div>
            </div>
        </div>

        <div class="flex-sb gap10 all-box">
            <div class="box-typography">
                <div class="position-center">
                    <img src="/Icon/text.png" alt="">
                    <p>Typography</p>
                </div>
            </div>

            <div class="box-background">
                <div class="position-center">
                    <img src="/Icon/background.png" alt="">
                    <p>Background</p>
                </div>
            </div>
        </div>

        <div class="flex-sb gap10 all-box">
            <div class="box-border">
                <div class="position-center">
                    <img src="/Icon/border.png" alt="">
                    <p>Border</p>
                </div>
            </div>


            <div class="box-radius">
                <div class="position-center">
                    <img src="/Icon/radius.png" alt="">
                    <p>Radius</p>
                </div>
            </div>
        </div>

        <div class="flex-sb gap10 all-box">
            <div class="box-shadows">
                <div class="position-center">
                    <img src="/Icon/shadow.png" alt="">
                    <p>Shadows</p>
                </div>
            </div>


            <div class="box-other">
                <div class="position-center">
                    <img src="/Icon/other.png" alt="">
                    <p>Other (Effect)</p>
                </div>
            </div>
        </div>

        <div class="flex-sb gap10 all-box">
            <div class="box-transform">
                <div class="position-center">
                    <img src="/Icon/transform.png" alt="">
                    <p>Transform</p>
                </div>
            </div>


            <div class="box-animation">
                <div class="position-center">
                    <img src="/Icon/animation.png" alt="">
                    <p>Animation</p>
                </div>
            </div>
        </div>

        <div class="m-b-10"></div>
    </div>

    <div class="style-group3">
        {{-- ||||||||||||Display|||||||||||| --}}

        @include('W2.Styles.Engine.Layout')


        {{-- ||||||||||||Display|||||||||||| --}}


        {{-- ||||||||||||Spacing|||||||||||| --}}

        @include('W2.Styles.Engine.Spacing')

        {{-- ||||||||||||Size|||||||||||| --}}

        {{-- ||||||||||||Size|||||||||||| --}}

        @include('W2.Styles.Engine.Shadows')

        {{-- ||||||||||||Size|||||||||||| --}}


        @include('W2.Styles.Engine.Size')

        {{-- ||||||||||||Size|||||||||||| --}}


        {{-- ||||||||||||Position|||||||||||| --}}

        @include('W2.Styles.Engine.Position')

        {{-- ||||||||||||Position|||||||||||| --}}


        {{-- ||||||||||||Typography|||||||||||| --}}

        @include('W2.Styles.Engine.Typography')

        {{-- ||||||||||||Typography|||||||||||| --}}



        {{-- ||||||||||||Background|||||||||||| --}}

        @include('W2.Styles.Engine.Background')

        {{-- ||||||||||||Background|||||||||||| --}}


        {{-- ||||||||||||Border|||||||||||| --}}

        @include('W2.Styles.Engine.Border')

        {{-- ||||||||||||Border|||||||||||| --}}



        {{-- ||||||||||||Radius|||||||||||| --}}

        @include('W2.Styles.Engine.Radius')

        {{-- ||||||||||||Radius|||||||||||| --}}


        {{-- ||||||||||||Effect|||||||||||| --}}

        @include('W2.Styles.Engine.Other')

        {{-- ||||||||||||Effect|||||||||||| --}}

    </div>
</div>

<div class="style-menu" id="selection-panel">
    <div class="style-group4">

        <div class="select-bx">
            <img class="big-img m-tb-10" src="/Icon/select-css.png" alt="">

            <h1>Make a selection</h1>

            <p>Select an element on the canvas to activate this panel</p>
        </div>
    </div>
</div>
