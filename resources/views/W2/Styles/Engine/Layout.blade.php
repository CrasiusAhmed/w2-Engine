<div class="layout">
    <div class="main close-f1-style m-b-20">
        <div class="flex-align gap10">
            <div class="reset-styles">
                <img class="small-img" src="/Icon/icons8-arrow-96.png" alt="">
            </div>
            <h1>Layout</h1>
        </div>
    </div>

    <div class="f1-style">
        <div class="flex-sb m-tb-20 gap10">
            <p class="width60">Display</p>


            <div class="flex-col-align buttons4">
                <button class="btn-s1 active" add-css="display: block;">
                    <div class="flex-align gap10">
                        <img class="normal-img" src="/Icon/block.png" alt="">
                        <h1>Block</h1>
                    </div>
                </button>

                <button class="btn-s1" add-css="display: flex;">
                    <div class="flex-align gap10">
                        <img class="normal-img" src="/Icon/flex.png" alt="">
                        <h1>Flex</h1>
                    </div>
                </button>

                <button class="btn-s1" add-css="display: grid;">
                    <div class="flex-align gap10">
                        <img class="normal-img" src="/Icon/icons8-grid-2-96.png" alt="">
                        <h1 class="hi">Grid</h1>
                    </div>
                </button>
                <button class="btn-s1" add-css="display: inline;">
                    <div class="flex-align gap10">
                        <img class="normal-img" src="/Icon/flex.png" alt="">
                        <h1>Inline</h1>
                    </div>
                </button>

                <button class="btn-s1" add-css="display: inline-block;">
                    <div class="flex-align gap10">
                        <img class="normal-img" src="/Icon/2-row-icon.png" alt="">
                        <h1>Inline-block</h1>
                    </div>
                </button>

                <button class="btn-s1" add-css="display: none;">
                    <div class="flex-align gap10">
                        <img class="normal-img" src="/Icon/none.png" alt="">
                        <h1>None (Delete)</h1>
                    </div>
                </button>
            </div>
        </div>

        <div class="flex-menu none">
            <div class="flex-align gap10 m-tb-5">
                <p class="width30">Direction</p>
                <div class="flex align-c buttons4">
                    <button class="btn-a1 active" add-css="flex-flow: row;">
                        <img class="small-img" src="/Icon/arrow-right.png" alt="">
                    </button>
    
                    <button class="btn-a1" add-css="flex-flow: column;"><img class="small-img"
                            src="/Icon/arrow-bottom.png" alt=""></button>
                    <button class="btn-a1" add-css="flex-flow: wrap;"><img class="small-img"
                            src="/Icon/wrap.png" alt=""></button>
    
                </div>
            </div>
    
            <div class="flex-sb-align gap10 m-tb-5">
                <p class="width30">Align</p>
                <div class="flex align-c gap10">
                    <div class="square-six-points">
                        <div class="f1-points flex-btn">
                            <div class="f1-access active"></div>
                        </div>
                        <div class="f2-points flex-btn">
                            <div class="f2-access"></div>
                        </div>
                        <div class="f3-points flex-btn">
                            <div class="f3-access"></div>
                        </div>
                        <div class="f4-points flex-btn">
                            <div class="f4-access"></div>
                        </div>
                        <div class="f5-points flex-btn">
                            <div class="f5-access"></div>
                        </div>
                        <div class="f6-points flex-btn">
                            <div class="f6-access"></div>
                        </div>
                        <div class="f7-points flex-btn">
                            <div class="f7-access"></div>
                        </div>
                        <div class="f8-points flex-btn">
                            <div class="f8-access"></div>
                        </div>
                        <div class="f9-points flex-btn">
                            <div class="f9-access"></div>
                        </div>
                    </div>
    
                    <div class="flex-col-align">
                        <div class="flex-sb-align gap10 m-tb-10 grid-position1">
                            <p>X</p>
                
                            <div class="flex-sb-align gap10 select position-r w-mw2">
                                <h1 id="currentWeight-a1">Left</h1>
                
                                <img class="small-img" src="/Icon/arrow-down.png" alt="">
                                <div class="position-add n2">
                                    <h1 class="d-explain align-choice1" data-description="1" add-css="align-items: left;">Left</h1>
                                    <h1 class="d-explain align-choice1" data-description="2" add-css="align-items: center;">Center</h1>
                                    <h1 class="d-explain align-choice1" data-description="3" add-css="align-items: right;">Right</h1>
                                    <h1 class="d-explain align-choice1" data-description="4" add-css="align-items: stretch;">Stretch</h1>
                                    <h1 class="d-explain align-choice1" data-description="5" add-css="align-items: baseline;">Baseline</h1>
                
                                    <div class="description-css">
                                        <p>Align children to the left of the row.</p>
                
                                        <p>Align children to the center of the row.</p>
                
                                        <p>Align children to the right of the row.</p>

                                        <p>Stretch children to fill the row.</p>

                                        <p>Align children to the baseline.</p>
                
                                    </div>
                                </div>
                            </div>
                
                        </div>
    
                        <div class="flex-sb-align gap10 m-tb-10 grid-position2">
                            <p>Y</p>
                
                            <div class="flex-sb-align gap10 select position-r w-mw2">
                                <h1 id="currentWeight-a2">Bottom</h1>
                
                                <img class="small-img" src="/Icon/arrow-down.png" alt="">
                                <div class="position-add n3">
                                    <h1 class="d-explain align-choice2" data-description="1" add-css="justify-content: flex-start;">Top</h1>
                                    <h1 class="d-explain align-choice2" data-description="2" add-css="justify-content: center;">Center</h1>
                                    <h1 class="d-explain align-choice2" data-description="3" add-css="justify-content: flex-end;">Bottom</h1>
                                    <h1 class="d-explain align-choice2" data-description="4" add-css="justify-content: space-between;">Space Between</h1>
                                    <h1 class="d-explain align-choice2" data-description="5" add-css="justify-content: space-around;">Space Around</h1>
                
                                    <div class="description-css">
                                        <p>Align children to the top of the row.</p>
                
                                        <p>Align children to the center of the row.</p>
                
                                        <p>Align children to the bottom of the row.</p>
                
                                        <p>Distribute children evenly. The first and last child is flush with the element.</p>
    
                                        <p>Distribute children evenly. Start and end gaps are half the size of space between each child</p>
                
                                    </div>
                                </div>
                            </div>
                
                        </div>
                    </div>
                </div>
            </div>
    
    
            <div class="flex-align gap10 m-tb-10">
                <div class="flex-align gap10 width100">
                    <img class="normal-img" src="/Icon/gap.png" alt="">
                    <p>Gap</p>
                </div>

    
                <div class="flex-sb position-element">
                    <input type="number" class="input-number width65" placeholder="Auto"
                        add-css="gap">
    
                    <div class="select-layout s-fix" data-unit-for="gapInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                    </div>
                </div>
            </div>
    
            <div class="flex-align gap10 m-tb-10">
                <div class="flex-align gap10 width100">
                    <img class="normal-img" src="/Icon/column-gap.png" alt="">
                    <p>Gap Columns</p>
                </div>
    
                <div class="flex-sb position-element">
                    <input type="number" class="input-number width65" placeholder="Auto"
                        add-css="column-gap">
    
                    <div class="select-layout s-fix" data-unit-for="columnGapInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                    </div>
                </div>
            </div>
    
            <div class="flex-align gap10 m-tb-10">
                <div class="flex-align gap10 width100">
                    <img class="normal-img" src="/Icon/row-gap.png" alt="">
                    <p>Gap Rows</p>
                </div>
    
                <div class="flex-sb position-element">
                    <input type="number" class="input-number width65" placeholder="Auto"
                        add-css="row-gap">
    
                    <div class="select-layout s-fix" data-unit-for="rowGapInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="grid-menu none">
            <div class="flex-sb-align gap10">
                <div class="flex-col-align gap10 m-t-10">
                    <div class="flex align-c buttons4">
                        <button class="btn-add classic-simple" add-css="grid-template-columns">
                            <img class="normal-img" src="/Icon/solid.png"
                                alt="">
                        </button>
                        <div class="count column active">
                            <h1>1</h1>
                        </div>
                        <button class="btn-add classic-simple" add-css="grid-template-columns">
                            <img class="normal-img" src="/Icon/add.png"
                            alt="">
                        </button>
                    </div>
        
                    <p>Column</p>
                </div>
    
    
                <div class="flex-col-align gap10 m-t-10">
                    <div class="flex align-c buttons4">
                        <button class="btn-add classic-simple" add-css="grid-template-rows">
                            <img class="normal-img" src="/Icon/solid.png"
                                alt="">
                        </button>
                        <div class="count row active">
                            <h1>1</h1>
                        </div>
                       
                        <button class="btn-add classic-simple" add-css="grid-template-rows">
                            <img class="normal-img" src="/Icon/add.png"
                            alt="">
                        </button>
                    </div>
        
                    <p>Row</p>
                </div>
            </div>




            <div class="flex-align gap10 m-tb-10">
                <div class="flex-align gap10 width100">
                    <img class="normal-img" src="/Icon/gap.png" alt="">
                    <p>Gap</p>
                </div>

    
                <div class="flex-sb position-element">
                    <input type="number" class="input-number width65" placeholder="Auto"
                        add-css="gap">
    
                    <div class="select-layout s-fix" data-unit-for="gapInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                    </div>
                </div>
            </div>
    
            <div class="flex-align gap10 m-tb-10">
                <div class="flex-align gap10 width100">
                    <img class="normal-img" src="/Icon/column-gap.png" alt="">
                    <p>Gap Columns</p>
                </div>
    
                <div class="flex-sb position-element">
                    <input type="number" class="input-number width65" placeholder="Auto"
                        add-css="column-gap">
    
                    <div class="select-layout s-fix" data-unit-for="columnGapInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                    </div>
                </div>
            </div>
    
            <div class="flex-align gap10 m-tb-10">
                <div class="flex-align gap10 width100">
                    <img class="normal-img" src="/Icon/row-gap.png" alt="">
                    <p>Gap Rows</p>
                </div>
    
                <div class="flex-sb position-element">
                    <input type="number" class="input-number width65" placeholder="Auto"
                        add-css="row-gap">
    
                    <div class="select-layout s-fix" data-unit-for="rowGapInput">
                        <div value="px">PX</div>
                        <div value="%">%</div>
                        <div value="em">EM</div>
                        <div value="rem">REM</div>
                        <div value="vw">VW</div>
                        <div value="vh">VH</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>