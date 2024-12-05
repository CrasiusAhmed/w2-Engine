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

    <form method="POST" action="{{ route('register') }}" class="form-auth">
        @csrf
        <div class="flex-col align-s">
            <label for="">
                <h1>Name</h1>
            </label>
            <input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" placeholder="Enter Your Name" required autofocus autocomplete="name">
            <x-input-error :messages="$errors->get('name')" />
        </div>

        <div class="flex-col align-s">
            <label for="">
                <h1>Email</h1>
            </label>
            <input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" placeholder="Enter Your Email" required autocomplete="username">
            <x-input-error :messages="$errors->get('email')" />
        </div>

        <div class="flex-col align-s">
            <label for="">
                <h1>Password</h1>
            </label>
            <input id="password" class="block mt-1 w-full" type="password" name="password" placeholder="Enter Your Password" required autocomplete="new-password">
            <x-input-error :messages="$errors->get('password')" />
        </div>

        <div class="flex-col align-s">
            <label for="">
                <h1>Confirm Password</h1>
            </label>
            <input id="password_confirmation" class="block mt-1 w-full" type="password" placeholder="Confirm Your Password" name="password_confirmation" required autocomplete="new-password">
            <x-input-error :messages="$errors->get('password_confirmation')" />
        </div>

        <div class="flex-col align-s">
            <p>I Have Account | <a href="{{ route('login') }}">Login</a></p>

            <ul>
                <li>Please Make Sure To Not Forget Password Sometime Restore Password Is Not Working</li>
            </ul>
        </div>

        <button type="submit">Register</button>
    </div>


    <div class="bg-da3">
        <div class="img-f1">
            <div class="img-sta">
                <img src="/Images/F2.png" alt="f2">
                <img src="/Images/F3.png" alt="f3">
                <img src="/Images/F5.png" alt="f5">
                <img src="/Images/F4.png" alt="f4">
                <img src="/Images/F1.png" alt="f1">
            </div>
        </div>
        <img class="bg-size-img" src="/Images/F7.png" alt="">
    </div>

    <div class="bg-da4">
        
        <img class="bg-size-img" src="/Images/F6.png" alt="">
    </div>
</div>





    {{-- <form method="POST" action="{{ route('register') }}" class="form-auth">
        @csrf
        <div class="flex-col align-s">
            <label for="">
                <h1>Name</h1>
            </label>
            <input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name">
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>

        <div class="flex-col align-s">
            <label for="">
                <h1>Email</h1>
            </label>
            <input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autocomplete="username">
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="flex-col align-s">
            <label for="">
                <h1>Password</h1>
            </label>
            <input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="new-password">
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <div class="flex-col align-s">
            <label for="">
                <h1>Confirm Password</h1>
            </label>
            <input id="password_confirmation" class="block mt-1 w-full" type="password" name="password_confirmation" required autocomplete="new-password">
            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex-col align-s">
            <p>I Have Account | <a href="{{ route('login') }}">Login</a></p>
        </div>

        <button type="submit">Register</button> --}}

        <!-- Name -->
        {{-- <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div> --}}

        <!-- Email Address -->
        {{-- <div class="mt-4">
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div> --}}

        <!-- Password -->
        {{-- <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div> --}}

        <!-- Confirm Password -->
        {{-- <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('Confirm Password')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full"
                            type="password"
                            name="password_confirmation" required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div> --}}

        {{-- <div class="flex items-center justify-end mt-4">
            <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" href="{{ route('login') }}">
                {{ __('Already registered?') }}
            </a>

            <x-primary-button class="ms-4">
                {{ __('Register') }}
            </x-primary-button>
        </div> --}}
    {{-- </form> --}}


    <script>
        let linkReg = document.querySelector('.link-reg');
        let linkLog = document.querySelector('.link-log');

        let circlePath = document.querySelector('.circle-path');


        linkReg.onmouseenter = function () {
            circlePath.classList.add('show')
        }
        linkReg.onmouseleave = function () {
            circlePath.classList.remove('show')
        }

        linkLog.onmouseenter = function () {
            circlePath.classList.add('show2')
        }
        linkLog.onmouseleave = function () {
            circlePath.classList.remove('show2')
        }
    </script>
@endsection