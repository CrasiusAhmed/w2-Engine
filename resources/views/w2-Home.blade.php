@extends('layouts.guest')

@section('pre')

<div class="hero-w2">
    <div class="line-menu-left">
        <img src="Images/w2-engine-line3D-left.png" alt="">



        <div class="text-update">
            <div class="top-text">
                <h3>Update Version:</h3>

                <div class="flex-align gap10">
                    <img class="small-size" src="Images/fix1.png" alt="">
                    <p class="fix-shadow">Class name selected fixed</p>
                </div>

                <div class="update-important">
                    <div class="flex-align gap10">
                        <img class="small-size" src="Images/coming1.png" alt="">
                        <p class="coming-shadow">Laravel Engine</p>
                    </div>
                    <div class="flex-align gap10">
                        <img class="small-size" src="Images/exp1.png" alt="">
                        <p class="red-shadow">Css Engine</p>
                    </div>
                    <div class="flex-align gap10">
                        <img class="small-size" src="Images/exp1.png" alt="">
                        <p class="red-shadow">JavaScript Engine</p>
                    </div>
                    <div class="flex-align gap10">
                        <img class="small-size" src="Images/exp1.png" alt="">
                        <p class="red-shadow">ThreeJs Engine</p>
                    </div>
                </div>
                <p>If you find any bug please report bug in Discord or Telegram our channel</p>
                <p>For more news and update check our channel Crasius or w2 on Youtube</p>
                <p>Thanks for all Support and Fund and Trust that you give us to keep more update for this software</p>
            </div>
            <div class="bottom-text">
                <h3>Software Version:</h3>
                <p class="fix-shadow">w2 1.1</p>
                <p>Made By Crasius</p>
            </div>
        </div>
    </div>
    <div class="line-menu-right">
        <img src="Images/w2-engine-line3D.png" alt="">
        <img class="line-right-img2" src="Images/w2-engine-auth.png" alt="">

        <div class="img-f1">
            <div class="img-sta">
                <img src="Images/F2.png" alt="f2">
                <img src="Images/F3.png" alt="f3">
                <img src="Images/F5.png" alt="f5">
                <img src="Images/F4.png" alt="f4">
                <img src="Images/F1.png" alt="f1">
            </div>
        </div>


        <div class="link-auth">
            <a href="{{ route('register') }}"><button>Register</button></a>
            <a href="{{ route('login') }}"><button>Login</button></a>
        </div>
    </div>


    <div class="logo-home">

        <div class="logo-intro">
            <img src="Images/w2-2.png" alt="">
        </div>

        <div class="rotate-img">
            <img src="Images/w2-engine-bg3D.png" alt="">
        </div>
        
        
    </div>

</div>
@endsection