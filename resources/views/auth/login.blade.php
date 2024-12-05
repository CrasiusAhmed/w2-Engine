@extends('layouts.guest')

@section('pre')
    <div class="hero2">
        <div class="logo-position">
            <img src="/Images/w2-2.png" alt="">
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

        <form method="POST" action="{{ route('login') }}" class="form-auth">
            @csrf
    
            <div class="flex-col align-s">
                <label for="">
                    <h1>Email</h1>
                </label>
                <input id="email" class="block mt-1 w-full" placeholder="Enter Your Email" type="email" name="email" :value="old('email')" required
                    autofocus autocomplete="username">
                <x-input-error :messages="$errors->get('email')" class="mt-2" />
            </div>
    
            <div class="flex-col align-s">
                <label for="">
                    <h1>Password</h1>
                </label>
                <input id="password" class="block mt-1 w-full" placeholder="Enter Your Password" type="password" name="password" required
                    autocomplete="current-password">
                <x-input-error :messages="$errors->get('password')" class="mt-2" />
            </div>

            <div class="flex-align">
                <input id="remember_me" type="checkbox" class="checkbox-important" name="remember">
                <p>Remember me</p>
            </div>
    
            <div class="flex-col align-s">
                <p>New User? | <a href="{{ route('register') }}">Register</a></p>
            </div>
    
            <div class="flex-col align-s">
                @if (Route::has('password.request'))
                    <p><a href="{{ route('password.request') }}">Forgot your password?</a></p>
                @endif
            </div>
    
            <button type="submit">Login</button>
        </form>


        <div class="bg-da">
            <div class="img-f1">
                <div class="img-sta">
                    <img src="/Images/F2.png" alt="f2">
                    <img src="/Images/F3.png" alt="f3">
                    <img src="/Images/F5.png" alt="f5">
                    <img src="/Images/F4.png" alt="f4">
                    <img src="/Images/F1.png" alt="f1">
                </div>
            </div>
            <img src="/Images/w2-engine-line3D.png" alt="">
        </div>

        <div class="bg-da2">

            <img src="/Images/w2-engine-auth.png" alt="">
        </div>
    </div>








   {{--  <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <div class="flex-col align-s">
            <label for="">
                <h1>Email</h1>
            </label>
            <input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
                autofocus autocomplete="username">
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="flex-col align-s">
            <label for="">
                <h1>Password</h1>
            </label>
            <input id="password" class="block mt-1 w-full" type="password" name="password" required
                autocomplete="current-password">
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <div class="flex-col align-s">
            <p>New User? | <a href="#">Register</a></p>
        </div>

        <div class="flex-col align-s">
            @if (Route::has('password.request'))
                <p><a href="{{ route('password.request') }}">Forgot your password?</a></p>
            @endif
        </div>

        <button type="submit">Login</button>


        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
                autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required
                autocomplete="current-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Remember Me -->
        <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox"
                    class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
                    name="remember">
                <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ __('Remember me') }}</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            @if (Route::has('password.request'))
                <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    href="{{ route('password.request') }}">
                    {{ __('Forgot your password?') }}
                </a>
            @endif

            <x-primary-button class="ms-3">
                {{ __('Log in') }}
            </x-primary-button>
        </div>
    </form> --}}

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
