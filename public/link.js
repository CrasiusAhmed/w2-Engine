let Preview = document.querySelector('.preview');

let menuPreview = document.querySelector('.menu-stackflow');


Preview.onclick = function () {
    menuPreview.classList.add('active')
}


let addElement = document.querySelector('.box-add');

let boxAdding = document.querySelector('.box-adding-html');


addElement.onclick = function () {
    addElement.classList.toggle('active')
    boxAdding.classList.toggle('active')
}

let otherMenu = document.querySelector('.other-menu');

otherMenu.onclick = function () {
    otherMenu.classList.toggle('active')
}

document.addEventListener('click', function (event) {
    // Check if the click was outside the otherMenu element
    if (!otherMenu.contains(event.target)) {
        otherMenu.classList.remove('active');
    }

    if (!paddingOption.contains(event.target)) {
        paddingOption.classList.remove('active');
    }
});


let styleCustomer = document.querySelector('.style-customer');

let styleMenu = document.querySelector('.style-menu');

styleCustomer.onclick = function () {
    styleMenu.classList.toggle('active')
    settingMenu.classList.remove('active')
    styleGroup2.classList.remove('back')
    styleGroup3.classList.remove('back')
    styleGroup4.classList.remove('show')
    styleGroup5.classList.remove('show')
    styleGroup6.classList.remove('show')
    styleGroup7.classList.remove('show')
}

let closeStyleMenu = document.querySelector('.close-style-menu');
closeStyleMenu.onclick = function () {
    styleMenu.classList.remove('active')
}

let typography = document.querySelector('.typography');
let colors = document.querySelector('.colors');
let shadows = document.querySelector('.shadows');
let layout = document.querySelector('.layout');

let styleGroup2 = document.querySelector('.style-group2');

let styleGroup3 = document.querySelector('.style-group3');

let styleGroup4 = document.querySelector('.style-group4');

let styleGroup5 = document.querySelector('.style-group5');

let styleGroup6 = document.querySelector('.style-group6');

let styleGroup7 = document.querySelector('.style-group7');

let resetStyles = document.querySelectorAll('.reset-styles');

typography.onclick = function () {
    styleGroup2.classList.add('back')
    styleGroup3.classList.add('back')
    styleGroup4.classList.add('show')
}
colors.onclick = function () {
    styleGroup2.classList.add('back')
    styleGroup3.classList.add('back')
    styleGroup5.classList.add('show')
}
shadows.onclick = function () {
    styleGroup2.classList.add('back')
    styleGroup3.classList.add('back')
    styleGroup6.classList.add('show')
}
layout.onclick = function () {
    styleGroup2.classList.add('back')
    styleGroup3.classList.add('back')
    styleGroup7.classList.add('show')
}


resetStyles.forEach(resetStyles => {
    resetStyles.onclick = function () {
        styleGroup2.classList.remove('back')
        styleGroup3.classList.remove('back')
        styleGroup4.classList.remove('show')
        styleGroup5.classList.remove('show')
        styleGroup6.classList.remove('show')
        styleGroup7.classList.remove('show')
    }
});


let paddingOption = document.querySelector('.padding-option');



paddingOption.onclick = function () {
    paddingOption.classList.toggle('active')
}


/* settingMenu */
let setting = document.querySelector('.setting');

let settingMenu = document.querySelector('.setting-menu');

setting.onclick = function () {
    settingMenu.classList.toggle('active')
    styleMenu.classList.remove('active')
    styleGroup2.classList.remove('back')
    styleGroup3.classList.remove('back')
    styleGroup4.classList.remove('show')
    styleGroup5.classList.remove('show')
    styleGroup6.classList.remove('show')
    styleGroup7.classList.remove('show')
}

let closeSettingMenu = document.querySelector('.close-setting-menu');
closeSettingMenu.onclick = function () {
    settingMenu.classList.remove('active')
}


let settingGroup2 = document.querySelector('.setting-group2');

let settingGroup3 = document.querySelector('.setting-group3');

colors.onclick = function () {
    styleGroup2.classList.add('back')
    styleGroup3.classList.add('back')
    styleGroup5.classList.add('show')
}
/* settingMenu */



let listView = document.querySelector('.list-view');
let bodyView = document.querySelector('.body-view');

listView.onclick = function () {
    bodyView.classList.toggle('active')
}

