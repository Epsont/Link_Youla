setTimeout(checkPage, 4000);

// ПРОВЕРКА СТРАНИЧКИ НА НАЛИЧИЕ ИСТОЧНИКА "Ошибки транспорта"
function checkPage() {
    
    if (document.querySelectorAll('[data-bind="text: source"]')) {
        const source = document.querySelectorAll('[data-bind="text: source"]');
        console.log(source);
        if (source.length == 1) {
            if (source[0].innerHTML == 'Ошибки транспорта'){
                var checking = source[0].innerHTML;
                console.log(checking);
            };
            if (source[0].innerHTML == 'Настольная версия' || source[0].innerHTML == 'WebYoula' || source[0].innerHTML == 'Личный кабинет' || source[0].innerHTML == 'Отдел коммерции' || source[0].innerHTML == 'Оператор ЕКЦ, РГ СОВИ'){
                var checking = source[0].innerHTML;
                console.log(checking);
            };
        };
    };

    

    if (checking == undefined) {
        console.log("Нет совпадения")
        return;
    } else if (checking == 'Ошибки транспорта') {
        console.log("Совпадение найдено. Ошибки транспорта")
        linkConvert();
    } else {
        console.log("Совпадение найдено");
        coordConvert();
    };
};


// РЕГУЛЯРКИ
const regLink1 = /(?<=Link: )(https|http)\:\/\/2gis\.ru\/[0-9a-zA-Zа-яА-ЯёЁ№\/\.,!_╎-\s]*\?routeTab/g;
const regLink2 = /(?<=tap(P|p)oint: )https\:\/\/2gis\.ru\/geo\/[0-9\.,]*/g;
const regLink3 = /(?<=user(L|l)ocation: )https\:\/\/2gis\.ru\/geo\/[0-9\.,]*/g;
const regCoord = /[0-9\-]{2,3}\.[0-9]*/g;
const regdataBase = /(?<=(По данным города:.*|Based on city data:.*|Отправлено:.*)\()([0-9\-\.]*|online)(?=\))/g;
const regCreationDate = /[0-9\.]*(?=,)/g;

// ПЕРЕМЕННЫЕ ДЛЯ СРАВНЕНИЯ ДАТ
var compaireDate = true;
var resultCompaireDate = 'Свежая версия базы данных!';
var resultColor = "#87CEEB";



function linkConvert() {

    //  ПОИСК ССЫЛОК НА СТРАНИЧКЕ
    var newLink1 = document.body.innerHTML.match(regLink1);
    var newLink2 = document.body.innerHTML.match(regLink2);
    var newLink3 = document.body.innerHTML.match(regLink3);
    if (newLink1) {
        newLink1 = newLink1[0];
    };
    if (newLink2) {
        newLink2 = newLink2[0];
    };
    if (newLink3) {
        newLink3 = newLink3[0];
    };
    console.log(`Link: ${newLink1}`);
    console.log(`tapPoint: ${newLink2}`);
    console.log(`userLocation: ${newLink3}`);

    //COORDINATES
    if (newLink2) {
        var coord = newLink2;
        var coordTapPoint = newLink2; 
        var choiceLink = "tapPoint";
    } else if (newLink3) {
        var coord = newLink3;
        var choiceLink = "userLocation";
    };

    if (newLink3) {
        var coordUserLocation = newLink3;
    }; 

    console.log(`Выбрана ссылка для извлечения координат: ${coord}`);
    console.log(`Choice: ${choiceLink}`);

    if (coord) {
        coord = coord.match(regCoord);
        console.log(`Извлечённые координаты: ${coord}`);
    }

    if (coordTapPoint) {
        coordTapPoint = coordTapPoint.match(regCoord);
        console.log(`Координаты TapPoint: ${coordTapPoint}`);
    }

    if (coordUserLocation) {
        coordUserLocation = coordUserLocation.match(regCoord);
        console.log(`Координаты UserLocation: ${coordUserLocation}`);
    }

    // ДОБАВЛЕНИЕ БЛОКА С КНОПКАМИ
    var objLink = document.getElementsByClassName("vorwand-full-map")[0];

    const links = document.createElement('div');
    links.setAttribute("class", "link-under-the-map");
    links.setAttribute("style","border:2px solid #FAF0E6;border-radius:15px;padding: 1em;display: flex;justify-content: space-between;");
    objLink.append(links);

    var objTapUser = document.getElementsByClassName("link-under-the-map")[0];

    //LINK
    const link = document.createElement('div');
    link.setAttribute("style","width:48px;height:48px;border:2px solid #00BFFF;border-radius:15px;float:left;");
    link.setAttribute("onmouseover","this.style.backgroundColor='#F0F8FF';");
    link.setAttribute("onmouseout","this.style.backgroundColor='white';");
    link.innerHTML = `<a href="${newLink1}" target="_blank" title="Построить маршрут пользователя: ${newLink1}"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32" fill="currentColor"><path d="M13 13a4 4 0 1 0-4 4 4 4 0 0 0 4-4zm-6 0a2 2 0 1 1 2 2 2 2 0 0 1-2-2z"></path><path d="M24 15.14V10.5a4.5 4.5 0 0 0-9 0v11a2.5 2.5 0 0 1-5 0V19H8v2.5a4.5 4.5 0 0 0 9 0v-11a2.5 2.5 0 0 1 5 0v4.64a4 4 0 1 0 2 0zM23 21a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"></path></svg></a>`;
    objTapUser.append(link);


    //TAPPOINT
    if (newLink2) {
        const tapPoint = document.createElement('div');
        tapPoint.setAttribute("style","width:40px;height:40px;border:2px solid #66CDAA;border-radius:15px;padding: 4px;float:left;");
        tapPoint.setAttribute("onmouseover","this.style.backgroundColor='#F0FFF0';");
        tapPoint.setAttribute("onmouseout","this.style.backgroundColor='white';");
        tapPoint.innerHTML = `<a href="https://2gis.ru/geo/${coordTapPoint[0]},${coordTapPoint[1]}?m=${coordTapPoint[0]}%2C${coordTapPoint[1]}%2F19" target="_blank" title="TapPoint пользователя: ${newLink2}"><svg height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 503.467 503.467" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#006400" stroke-width="10.06934"> <path style="fill:#006400;" d="M499.886,394.24l-177.493,102.4c-32.427-37.547-84.48-72.533-133.12-99.84 c-5.973-3.413-11.947-6.827-18.773-10.24c-31.573-17.067-45.227-61.44-13.653-80.213c0,0,22.187-7.68,40.107,6.827l-117.76-192 c-9.387-16.213-6.827-34.987,9.387-45.227c16.213-9.387,30.72-0.853,42.667,15.36l91.307,128.853 c-9.387-16.213-4.267-37.547,12.8-46.933c16.213-9.387,37.547-4.267,46.933,12.8l8.533,14.507 c-9.387-16.213-3.413-37.547,12.8-46.933c16.213-9.387,37.547-4.267,46.933,12.8l12.8,22.187c-6.827-11.947-2.56-28.16,9.387-34.987 c11.947-6.827,28.16-1.707,34.987,9.387l55.467,96.427C495.619,318.293,477.699,337.92,499.886,394.24"></path> <path style="fill:#51565F;" d="M322.392,503.467c-0.853,0-2.56-0.853-3.413-1.707c-27.307-31.573-71.68-64.853-132.267-98.987 c-5.973-3.413-11.947-6.827-18.773-10.24c-19.627-11.093-33.28-31.573-33.28-52.053c0-15.36,6.827-27.307,19.627-34.987 c1.707-0.853,4.267-0.853,5.973,1.707c0.853,1.707,0.853,4.267-1.707,5.973c-12.8,7.68-15.36,18.773-15.36,27.307 c0,17.067,11.947,35.84,29.013,45.227c5.973,3.413,11.947,6.827,18.773,10.24c58.88,34.133,104.107,66.56,132.267,98.133 l171.52-98.987c-8.533-23.04-11.093-40.107-12.8-56.32c-2.56-21.333-5.12-42.667-23.893-75.093l-55.467-96.427 c-5.12-9.387-19.627-13.653-29.013-7.68c-4.267,2.56-8.533,7.68-9.387,12.8c-1.707,5.973-0.853,11.093,1.707,16.213l0,0 c0.853,1.707,0.853,4.267-1.707,5.973c-1.707,0.853-4.267,0.853-5.973-1.707l0,0l-12.8-22.187 c-8.533-14.507-26.453-18.773-40.96-11.093c-14.507,8.533-18.773,26.453-11.093,40.96c0.853,1.707,0.853,4.267-1.707,5.973 c-1.707,0.853-4.267,0.853-5.973-1.707l-8.533-14.507c-4.267-6.827-10.24-11.947-17.92-13.653c-7.68-1.707-15.36-0.853-23.04,2.56 c-6.827,4.267-11.947,10.24-13.653,17.92s-0.853,15.36,3.413,23.04c0.853,1.707,0.853,4.267-1.707,5.973 c-1.707,0.853-4.267,0.853-5.973-0.853L126.979,96.427c-11.947-16.213-24.747-20.48-36.693-13.653 C83.459,87.04,79.193,92.16,78.339,99.84c-0.853,6.827,0,14.507,4.267,22.187l117.76,192c0.853,1.707,0.853,4.267-1.707,5.973 c-1.707,0.853-4.267,0.853-5.973-1.707l-117.76-192c-5.12-9.387-6.827-18.773-5.973-28.16c1.707-9.387,7.68-17.92,16.213-23.04 c16.213-9.387,33.28-3.413,47.787,16.213l79.36,110.933c0-2.56,0.853-5.12,0.853-7.68c2.56-10.24,9.387-17.92,17.92-23.04 c8.533-5.12,19.627-6.827,29.013-3.413c7.68,1.707,14.507,6.827,19.627,12.8c1.707-11.093,8.533-22.187,18.773-28.16 c18.773-10.24,41.813-4.267,52.053,13.653l2.56,4.267c0,0,0,0,0-0.853c1.707-7.68,6.827-14.507,13.653-17.92 c13.653-7.68,33.28-2.56,40.96,11.093l55.467,96.427c19.627,34.133,22.187,55.467,25.6,78.507 c1.707,16.213,4.267,34.133,13.653,57.173c0.853,1.707,0,4.267-1.707,5.12l-177.493,102.4 C324.099,503.467,323.246,503.467,322.392,503.467z M32.259,168.96c-0.853,0-2.56,0-3.413-0.853c-1.707-1.707-1.707-4.267,0-5.973 l23.893-23.893c1.707-1.707,4.267-1.707,5.973,0c1.707,1.707,1.707,4.267,0,5.973l-23.893,23.893 C34.819,168.107,33.966,168.96,32.259,168.96z M39.086,102.4H4.952c-2.56,0-4.267-1.707-4.267-4.267s1.707-4.267,4.267-4.267h34.133 c2.56,0,4.267,1.707,4.267,4.267S41.646,102.4,39.086,102.4z M141.486,59.733c-0.853,0-2.56,0-3.413-0.853 c-1.707-1.707-1.707-4.267,0-5.973l23.893-23.893c1.707-1.707,4.267-1.707,5.973,0c1.707,1.707,1.707,4.267,0,5.973L144.046,58.88 C143.193,59.733,142.339,59.733,141.486,59.733z M57.006,59.733c-0.853,0-2.56,0-3.413-0.853L29.699,34.987 c-1.707-1.707-1.707-4.267,0-5.973c1.707-1.707,4.267-1.707,5.973,0l23.893,23.893c1.707,1.707,1.707,4.267,0,5.973 C58.712,59.733,57.859,59.733,57.006,59.733z M98.819,42.667c-2.56,0-4.267-1.707-4.267-4.267V4.267c0-2.56,1.707-4.267,4.267-4.267 c2.56,0,4.267,1.707,4.267,4.267V38.4C103.086,40.96,101.379,42.667,98.819,42.667z"></path> </g><g id="SVGRepo_iconCarrier"> <path style="fill:#19AA1E;" d="M499.886,394.24l-177.493,102.4c-32.427-37.547-84.48-72.533-133.12-99.84 c-5.973-3.413-11.947-6.827-18.773-10.24c-31.573-17.067-45.227-61.44-13.653-80.213c0,0,22.187-7.68,40.107,6.827l-117.76-192 c-9.387-16.213-6.827-34.987,9.387-45.227c16.213-9.387,30.72-0.853,42.667,15.36l91.307,128.853 c-9.387-16.213-4.267-37.547,12.8-46.933c16.213-9.387,37.547-4.267,46.933,12.8l8.533,14.507 c-9.387-16.213-3.413-37.547,12.8-46.933c16.213-9.387,37.547-4.267,46.933,12.8l12.8,22.187c-6.827-11.947-2.56-28.16,9.387-34.987 c11.947-6.827,28.16-1.707,34.987,9.387l55.467,96.427C495.619,318.293,477.699,337.92,499.886,394.24"></path> <path style="fill:#51565F;" d="M322.392,503.467c-0.853,0-2.56-0.853-3.413-1.707c-27.307-31.573-71.68-64.853-132.267-98.987 c-5.973-3.413-11.947-6.827-18.773-10.24c-19.627-11.093-33.28-31.573-33.28-52.053c0-15.36,6.827-27.307,19.627-34.987 c1.707-0.853,4.267-0.853,5.973,1.707c0.853,1.707,0.853,4.267-1.707,5.973c-12.8,7.68-15.36,18.773-15.36,27.307 c0,17.067,11.947,35.84,29.013,45.227c5.973,3.413,11.947,6.827,18.773,10.24c58.88,34.133,104.107,66.56,132.267,98.133 l171.52-98.987c-8.533-23.04-11.093-40.107-12.8-56.32c-2.56-21.333-5.12-42.667-23.893-75.093l-55.467-96.427 c-5.12-9.387-19.627-13.653-29.013-7.68c-4.267,2.56-8.533,7.68-9.387,12.8c-1.707,5.973-0.853,11.093,1.707,16.213l0,0 c0.853,1.707,0.853,4.267-1.707,5.973c-1.707,0.853-4.267,0.853-5.973-1.707l0,0l-12.8-22.187 c-8.533-14.507-26.453-18.773-40.96-11.093c-14.507,8.533-18.773,26.453-11.093,40.96c0.853,1.707,0.853,4.267-1.707,5.973 c-1.707,0.853-4.267,0.853-5.973-1.707l-8.533-14.507c-4.267-6.827-10.24-11.947-17.92-13.653c-7.68-1.707-15.36-0.853-23.04,2.56 c-6.827,4.267-11.947,10.24-13.653,17.92s-0.853,15.36,3.413,23.04c0.853,1.707,0.853,4.267-1.707,5.973 c-1.707,0.853-4.267,0.853-5.973-0.853L126.979,96.427c-11.947-16.213-24.747-20.48-36.693-13.653 C83.459,87.04,79.193,92.16,78.339,99.84c-0.853,6.827,0,14.507,4.267,22.187l117.76,192c0.853,1.707,0.853,4.267-1.707,5.973 c-1.707,0.853-4.267,0.853-5.973-1.707l-117.76-192c-5.12-9.387-6.827-18.773-5.973-28.16c1.707-9.387,7.68-17.92,16.213-23.04 c16.213-9.387,33.28-3.413,47.787,16.213l79.36,110.933c0-2.56,0.853-5.12,0.853-7.68c2.56-10.24,9.387-17.92,17.92-23.04 c8.533-5.12,19.627-6.827,29.013-3.413c7.68,1.707,14.507,6.827,19.627,12.8c1.707-11.093,8.533-22.187,18.773-28.16 c18.773-10.24,41.813-4.267,52.053,13.653l2.56,4.267c0,0,0,0,0-0.853c1.707-7.68,6.827-14.507,13.653-17.92 c13.653-7.68,33.28-2.56,40.96,11.093l55.467,96.427c19.627,34.133,22.187,55.467,25.6,78.507 c1.707,16.213,4.267,34.133,13.653,57.173c0.853,1.707,0,4.267-1.707,5.12l-177.493,102.4 C324.099,503.467,323.246,503.467,322.392,503.467z M32.259,168.96c-0.853,0-2.56,0-3.413-0.853c-1.707-1.707-1.707-4.267,0-5.973 l23.893-23.893c1.707-1.707,4.267-1.707,5.973,0c1.707,1.707,1.707,4.267,0,5.973l-23.893,23.893 C34.819,168.107,33.966,168.96,32.259,168.96z M39.086,102.4H4.952c-2.56,0-4.267-1.707-4.267-4.267s1.707-4.267,4.267-4.267h34.133 c2.56,0,4.267,1.707,4.267,4.267S41.646,102.4,39.086,102.4z M141.486,59.733c-0.853,0-2.56,0-3.413-0.853 c-1.707-1.707-1.707-4.267,0-5.973l23.893-23.893c1.707-1.707,4.267-1.707,5.973,0c1.707,1.707,1.707,4.267,0,5.973L144.046,58.88 C143.193,59.733,142.339,59.733,141.486,59.733z M57.006,59.733c-0.853,0-2.56,0-3.413-0.853L29.699,34.987 c-1.707-1.707-1.707-4.267,0-5.973c1.707-1.707,4.267-1.707,5.973,0l23.893,23.893c1.707,1.707,1.707,4.267,0,5.973 C58.712,59.733,57.859,59.733,57.006,59.733z M98.819,42.667c-2.56,0-4.267-1.707-4.267-4.267V4.267c0-2.56,1.707-4.267,4.267-4.267 c2.56,0,4.267,1.707,4.267,4.267V38.4C103.086,40.96,101.379,42.667,98.819,42.667z"></path> </g></svg></a>`;
        objTapUser.append(tapPoint);
     };

     
    //USERLOCATION
    if (newLink3) {
        const userLocation = document.createElement('div');
        userLocation.setAttribute("style","width:48px;height:48px;border:2px solid #66CDAA;border-radius:15px;float:left;");
        userLocation.setAttribute("onmouseover","this.style.backgroundColor='#F0FFF0';");
        userLocation.setAttribute("onmouseout","this.style.backgroundColor='white';");
        userLocation.innerHTML = `<a href="https://2gis.ru/geo/${coordUserLocation[0]},${coordUserLocation[1]}?m=${coordUserLocation[0]}%2C${coordUserLocation[1]}%2F19" target="_blank" title="UserLocation: ${newLink3}"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 4C21.9567 4 26 8.61818 26 13.6C26 15.6 25.5668 17.3455 24.556 19.5273C18.6354 19.5273 17.5523 23.4909 17.2996 26.1455L17.1191 28H14.8809L14.7004 26.1455C14.4477 23.4909 13.3646 19.5273 7.44404 19.5273C6.43321 17.3455 6 15.6 6 13.6C6 8.61818 10.0433 4 16 4Z" fill="#19AA1E"></path></svg></a>`;
        objTapUser.append(userLocation);
    };


    //FIJI
    if (coord) {
        const fijiLink = document.createElement('div');
        fijiLink.setAttribute("class", "fiji-link");
        fijiLink.setAttribute("style","width:40px;height:40px;border:2px solid #00BFFF;border-radius:15px;padding:4px;float:left;");
        fijiLink.setAttribute("onmouseover","this.style.backgroundColor='#F0F8FF';");
        fijiLink.setAttribute("onmouseout","this.style.backgroundColor='white';");
        fijiLink.innerHTML = `<a href="fiji://view/lon=${coord[0]}&lat=${coord[1]}"><img class="file-type_icon" width="40" height="40" src="assets/img/fiji small.png" title="Перейти в Fiji по ${choiceLink} пользователя"></img></a>`;
        objTapUser.append(fijiLink);
        var objFijiLink = document.getElementsByClassName("fiji-link")[0];
    }

    //YANDEX
    if (coord) {
        const yaLink = document.createElement('div');
        yaLink.setAttribute("style","width:40px;height:40px;border:2px solid #FA8072;border-radius:15px;padding:4px;float:left;");
        yaLink.setAttribute("onmouseover","this.style.backgroundColor='#FFE4E1';");
        yaLink.setAttribute("onmouseout","this.style.backgroundColor='white';");
        yaLink.innerHTML = `<a href="https://yandex.ru/maps/?l=sat%2Cmrc&ll=${coord[0]}%2C${coord[1]}&z=19" target="_blank" title="Перейти в ЯК по ${choiceLink} пользователя">    <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1a9.002 9.002 0 0 0-6.366 15.362c1.63 1.63 5.466 3.988 5.693 6.465.034.37.303.673.673.673.37 0 .64-.303.673-.673.227-2.477 4.06-4.831 5.689-6.46A9.002 9.002 0 0 0 12 1z" fill="#F43"></path><path d="M12 13.079a3.079 3.079 0 1 1 0-6.158 3.079 3.079 0 0 1 0 6.158z" fill="#fff"></path></svg>      </a>`;
        objTapUser.append(yaLink);
    }
    

    //DATABASE
    if (document.body.innerHTML.match(regdataBase)) {
        var dataBase = document.body.innerHTML.match(regdataBase);
        if (dataBase) {
            dataBase = dataBase[0];
            dataBase = dataBase.replace(/[-]*/gi, '');
            if (dataBase != 'online') {
                const yearDataBase = dataBase.slice(0, 4);
                const mounthDataBase = dataBase.slice(4, 6);
                const dayDataBase = dataBase.slice(6,);
                dataBase = new Date(yearDataBase, mounthDataBase - 1, dayDataBase);
                console.log(`Версия базы данных: ${dataBase}`);
            } else {
                resultCompaireDate = 'Версия базы данных: online';
                resultColor = "#66CDAA";
            };
        };
    };

    //CREATION DATE
    if (dataBase != 'online'){
        const creationDateTime = document.querySelectorAll('[data-bind="text: creationDateTime"]');
        var creationDate = creationDateTime[0].innerHTML;
        const dayCreationDate = creationDate.slice(0,2);
        const monthCreationDate = creationDate.slice(3,5);
        var yearCreationDate = creationDate.slice(6,8);
        yearCreationDate = '20' + yearCreationDate;
        creationDate = new Date(yearCreationDate, monthCreationDate - 1, dayCreationDate);
        console.log(`Дата создания зацепки: ${creationDate}`);
    };

    //COMPAIRE DATE
    if (dataBase != 'online'){
        if (dataBase.getFullYear() != creationDate.getFullYear()){
            var compaireDate = false;
            resultCompaireDate = 'Прошлогодняя версия базы данных!';
            resultColor = "#FF6347";
        } else if (dataBase.getMonth() != creationDate.getMonth()){
            var assembly = new Date(creationDate.getFullYear(), creationDate.getMonth(), 1);
            assembly.setDate(assembly.getDate() - 2);
            if (assembly.getDay() == 0 || assembly.getDay() == 6){
                while ((assembly.getDay() == 0 || assembly.getDay() == 6)){
                    assembly.setDate(assembly.getDate() - 1);
                };
            };
            console.log(`Дата последней сборки: ${assembly}`);
            var compaireDate = false;
            var differenceMonth = creationDate.getMonth() - dataBase.getMonth();
            var endingResultCompaireDate = 'сборок';
            if (differenceMonth == 1) {
                endingResultCompaireDate = 'сборку';
            } else if (differenceMonth > 1 && differenceMonth < 5){
                endingResultCompaireDate = 'сборки';
            }
            resultCompaireDate = `Версия базы данных просрочена на ${differenceMonth} ${endingResultCompaireDate}`;
            resultColor = "#FF6347";
        };
    };

    console.log(`${resultCompaireDate}`);


    //БЛОК ПОД КНОПКАМИ С РЕЗОЛЮЦИЕЙ ПО ВЕРСИИ БАЗЫ ДАННЫХ
    if (dataBase) {

        const dataBaseBlock = document.createElement('div');
            dataBaseBlock.setAttribute("style",`border:2px solid ${resultColor};border-radius:15px;padding: 0.1em;justify-content: space-between;text-align:center;background-color:${resultColor};color:white`);
        dataBaseBlock.innerHTML = `${resultCompaireDate}`
        objTapUser.after(dataBaseBlock);
    };

};

function coordConvert() {

    if (document.querySelectorAll(`[data-bind="text: linkedPoint().latitude + ', ' + linkedPoint().longitude"]`)) {
        const coordDiv = document.querySelectorAll(`[data-bind="text: linkedPoint().latitude + ', ' + linkedPoint().longitude"]`);
        console.log("Найден див с координатами");
        console.log(coordDiv);
        console.log(coordDiv.length);
        if (coordDiv.lenght != 0) {
            var coord = coordDiv[0].innerHTML;
            console.log(coord);
            if (coord) {
                coord = coord.match(regCoord);
                console.log(`Извлечённые координаты: ${coord}`);
                console.log(`0: ${coord[0]}`);
                console.log(`1: ${coord[1]}`);
            };
        };
    };


    // ДОБАВЛЕНИЕ БЛОКА С КНОПКАМИ
    var objLink = document.getElementsByClassName("vorwand-full-map")[0];

    const links = document.createElement('div');
    links.setAttribute("class", "link-under-the-map");
    links.setAttribute("style", "border:2px solid #FAF0E6;border-radius:15px;padding: 1em;display: flex;justify-content: space-between;");
    objLink.append(links);

    var objTapUser = document.getElementsByClassName("link-under-the-map")[0];

    //USERLOCATION
    if (coord) {
        const userLocation = document.createElement('div');
        userLocation.setAttribute("style", "width:48px;height:48px;border:2px solid #66CDAA;border-radius:15px;float:left;");
        userLocation.setAttribute("onmouseover", "this.style.backgroundColor='#F0FFF0';");
        userLocation.setAttribute("onmouseout", "this.style.backgroundColor='white';");
        userLocation.innerHTML = `<a href="https://2gis.ru/geo/${coord[1]},${coord[0]}?m=${coord[1]}%2C${coord[0]}%2F19" target="_blank" title="Перейти в 2ГИС"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 4C21.9567 4 26 8.61818 26 13.6C26 15.6 25.5668 17.3455 24.556 19.5273C18.6354 19.5273 17.5523 23.4909 17.2996 26.1455L17.1191 28H14.8809L14.7004 26.1455C14.4477 23.4909 13.3646 19.5273 7.44404 19.5273C6.43321 17.3455 6 15.6 6 13.6C6 8.61818 10.0433 4 16 4Z" fill="#19AA1E"></path></svg></a>`;
        objTapUser.append(userLocation);
    };


    //FIJI
    if (coord) {
        const fijiLink = document.createElement('div');
        fijiLink.setAttribute("class", "fiji-link");
        fijiLink.setAttribute("style", "width:40px;height:40px;border:2px solid #00BFFF;border-radius:15px;padding:4px;float:left;");
        fijiLink.setAttribute("onmouseover", "this.style.backgroundColor='#F0F8FF';");
        fijiLink.setAttribute("onmouseout", "this.style.backgroundColor='white';");
        fijiLink.innerHTML = `<a href="fiji://view/lon=${coord[1]}&lat=${coord[0]}"><img class="file-type_icon" width="40" height="40" src="assets/img/fiji small.png" title="Перейти в Fiji"></img></a>`;
        objTapUser.append(fijiLink);
    }

    //YANDEX
    if (coord) {
        const yaLink = document.createElement('div');
        yaLink.setAttribute("style", "width:40px;height:40px;border:2px solid #FA8072;border-radius:15px;padding:4px;float:left;");
        yaLink.setAttribute("onmouseover", "this.style.backgroundColor='#FFE4E1';");
        yaLink.setAttribute("onmouseout", "this.style.backgroundColor='white';");
        yaLink.innerHTML = `<a href="https://yandex.ru/maps/?l=sat%2Cmrc&ll=${coord[1]}%2C${coord[0]}&z=19" target="_blank" title="Перейти в ЯК">    <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1a9.002 9.002 0 0 0-6.366 15.362c1.63 1.63 5.466 3.988 5.693 6.465.034.37.303.673.673.673.37 0 .64-.303.673-.673.227-2.477 4.06-4.831 5.689-6.46A9.002 9.002 0 0 0 12 1z" fill="#F43"></path><path d="M12 13.079a3.079 3.079 0 1 1 0-6.158 3.079 3.079 0 0 1 0 6.158z" fill="#fff"></path></svg>      </a>`;
        objTapUser.append(yaLink);
    }


    //DATABASE
    if (document.body.innerHTML.match(regdataBase)) {
        var dataBase = document.body.innerHTML.match(regdataBase);
        if (dataBase) {
            dataBase = dataBase[0];
            dataBase = dataBase.replace(/[-]*/gi, '');
            if (dataBase != 'online') {
                const yearDataBase = dataBase.slice(0, 4);
                const mounthDataBase = dataBase.slice(5, 7);
                const dayDataBase = dataBase.slice(8,);
                dataBase = new Date(yearDataBase, mounthDataBase - 1, dayDataBase);
                console.log(`Версия базы данных: ${dataBase}`);
            } else {
                resultCompaireDate = 'Версия базы данных: online';
                resultColor = "#66CDAA";
            };
        };
    };

    //CREATION DATE
    if (dataBase != 'online' && dataBase != undefined) {
        const creationDateTime = document.querySelectorAll('[data-bind="text: creationDateTime"]');
        var creationDate = creationDateTime[0].innerHTML;
        const dayCreationDate = creationDate.slice(0, 2);
        const monthCreationDate = creationDate.slice(3, 5);
        var yearCreationDate = creationDate.slice(6, 8);
        yearCreationDate = '20' + yearCreationDate;
        creationDate = new Date(yearCreationDate, monthCreationDate - 1, dayCreationDate);
        console.log(`Дата создания зацепки: ${creationDate}`);
    };

    //COMPAIRE DATE
    if (dataBase != 'online' && dataBase != undefined) {
        if (dataBase.getFullYear() != creationDate.getFullYear()) {
            var compaireDate = false;
            resultCompaireDate = 'Прошлогодняя версия базы данных!';
            resultColor = "#FF6347";
        } else if (dataBase.getMonth() != creationDate.getMonth()) {
            var assembly = new Date(creationDate.getFullYear(), creationDate.getMonth(), 1);
            assembly.setDate(assembly.getDate() - 2);
            if (assembly.getDay() == 0 || assembly.getDay() == 6) {
                while ((assembly.getDay() == 0 || assembly.getDay() == 6)) {
                    assembly.setDate(assembly.getDate() - 1);
                };
            };
            console.log(`Дата последней сборки: ${assembly}`);
            var compaireDate = false;
            var differenceMonth = creationDate.getMonth() - dataBase.getMonth();
            var endingResultCompaireDate = 'сборок';
            if (differenceMonth == 1) {
                endingResultCompaireDate = 'сборку';
            } else if (differenceMonth > 1 && differenceMonth < 5) {
                endingResultCompaireDate = 'сборки';
            }
            resultCompaireDate = `Версия базы данных просрочена на ${differenceMonth} ${endingResultCompaireDate}`;
            resultColor = "#FF6347";
        };
    };

    //БЛОК ПОД КНОПКАМИ С РЕЗОЛЮЦИЕЙ ПО ВЕРСИИ БАЗЫ ДАННЫХ
    if (dataBase) {

        const dataBaseBlock = document.createElement('div');
        dataBaseBlock.setAttribute("style", `border:2px solid ${resultColor};border-radius:15px;padding: 0.1em;justify-content: space-between;text-align:center;background-color:${resultColor};color:white`);
        dataBaseBlock.innerHTML = `${resultCompaireDate}`
        objTapUser.after(dataBaseBlock);
    };
};
