{{-- <x-guest-layout>
    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {{ __('Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Email Password Reset Link') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout> --}}


@extends('layouts.guest')

@section('pre')
    <div class="hero2">
        <div class="logo-position">
            <img src="Images/w2-2.png" alt="">
        </div>


        <div class="menu-auth-right">
            <div class="circle-auth">

                <div class="circle-path">
                    <div class="reg-icon">
                        <ion-icon name="receipt-outline"></ion-icon>
                    </div>
                    <div class="log-icon">
                        <ion-icon name="person-outline"></ion-icon>
                    </div>
                </div>
            </div>
            <div class="flex-col position-link">
                <h1 class="link-reg"><a href="{{ route('register') }}" style="text-decoration: none; color: white;">Register</a></h1>
                <h1 class="link-log"><a href="{{ route('login') }}" style="text-decoration: none; color: white;">Login</a></h1>
            </div>
        </div>

        <x-auth-session-status class="mb-4" :status="session('status')" />

        <form method="POST" action="{{ route('password.email') }}" class="form-auth">

            @csrf

            <div class="flex-col align-s m-b-20">
                <p>Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</p>

                <ul>
                    <li>Please Make Sure To Not Forget Password Sometime Restore Password Is Not Working</li>
                </ul>
            </div>
    
            <div class="flex-col align-s">
                <label for="">
                    <h1>Email</h1>
                </label>
                <input id="email" class="block mt-1 w-full" placeholder="Enter Your Email" type="email" name="email" :value="old('email')" required autofocus >
                <x-input-error :messages="$errors->get('email')" class="mt-2" />
            </div>
    
    
            <button type="submit">Email Password Reset Link</button>
        </form>


        <div class="bg-da">
            <div class="img-f1">
                <div class="img-sta">
                    <img src="Images/F2.png" alt="f2">
                    <img src="Images/F3.png" alt="f3">
                    <img src="Images/F5.png" alt="f5">
                    <img src="Images/F4.png" alt="f4">
                    <img src="Images/F1.png" alt="f1">
                </div>
            </div>
            <img src="Images/w2-engine-line3D.png" alt="">
        </div>

        <div class="bg-da2">

            <img src="Images/w2-engine-auth.png" alt="">
        </div>
    </div>

    <script>
        let linkReg = document.querySelector('.link-reg');
        let linkLog = document.querySelector('.link-log');

        let circlePath = document.querySelector('.circle-path');


        linkReg.onmouseenter = function() {
            circlePath.classList.add('show')
        }
        linkReg.onmouseleave = function() {
            circlePath.classList.remove('show')
        }

        linkLog.onmouseenter = function() {
            circlePath.classList.add('show2')
        }
        linkLog.onmouseleave = function() {
            circlePath.classList.remove('show2')
        }
    </script>
@endsection