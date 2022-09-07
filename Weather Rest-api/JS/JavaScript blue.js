
sessionStorage.setItem ('ip', returnCitySN ["cip"]);

var key = "a826bfbce47a4b1c3e7e3e37c605fc96";
var Moskov = "524901",
    Saint_Petersburg = "536203",
    Kaliningrad = "554234",
    omsk = "1496153",
    Yekaterinburg =  "1486209",
    Dzerzhinsk = "563708";


function NewCity(id_city){
    var id;
    if (id_city == 'Moskov'){
        id = Moskov;
    }
    if (id_city == 'Saint_Petersburg'){
        id = Saint_Petersburg;
    }
    if (id_city == 'Kaliningrad'){
        id = Kaliningrad;
    }
    if (id_city == 'omsk'){
        id = omsk;
    }
    if (id_city == 'Yekaterinburg'){
        id = Yekaterinburg;
    }
    if (id_city == 'Dzerzhinsk'){
        id = Dzerzhinsk;
    }

    var lon, lat;

    if (id_city == 'Moskov'){
        lon = "37.615555";
        lat = "55.75222";
    }
    if (id_city == 'Saint_Petersburg'){
        lon = "30.25";
        lat = "59.916668";
    }
    if (id_city == 'Kaliningrad'){
        lon = "20.51095";
        lat = "54.70649";
    }
    if (id_city == 'omsk'){
        lon = "73.400002";
        lat = "55.0";
    }
    if (id_city == 'Yekaterinburg'){
        lon = "60.612499";
        lat = "56.857498";
    }
    if (id_city == 'Dzerzhinsk'){
        lon = "43.463058";
        lat = "56.238892";
    }
    var days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
    ];

    var n_data = new Date();
    var n = n_data.getDay();
    var day_week;

    if(n_data.getHours()<15)
    {
        day_week = n%7;
    }
    else
    { 
        day_week = (n+1)%7;
    }


    for (var i = 1; i <= 5; i++) {
        document.querySelector(`#data_${i}`).innerHTML = days[day_week];
        if (day_week == 6)
            day_week = 0;
        else
            day_week++;
    }
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&lang=ru&appid=${key}`).then(function (resp) {return resp.json() }).then(function (data) {
    //добавляем название города
    document.querySelector('.chief-info__city-text').innerHTML = data.name
    //data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
    document.querySelector('.chief-info__degrees-text').innerHTML =  Math.round(data.main.temp - 273);
    //Добавляем описание погоды
    if(data.weather[0]['description'] == "ясно")
        document.querySelector('.chief-info__weather-img').setAttribute('src', '../img/Солнечно.png');
    else
    if(data.weather[0]['description'] == "облачно с прояснениями" || data.weather[0]['description'] == "переменная облачность")
        document.querySelector('.chief-info__weather-img').setAttribute('src', '../img/Облачно.png');
    else
    if(data.weather[0]['description'] == "пасмурно")
        document.querySelector('.chief-info__weather-img').setAttribute('src', '../img/Пасмурно.png');

    document.querySelector('.chief-info__weather-img').style.visibility = "visible";
    })

    var id_week_h = 1, id_week_c = 1 ; id_img = 1;

    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&lang=ru&appid=${key}`).then(function (resp) {return resp.json() }).then(function (data) {
        console.log(data)
        for (var i = 0; i < 40; i++) {
            var a = data.list[i].dt_txt[11];
            var b = data.list[i].dt_txt[12];
            if(a == '1' && b == '2' ){
                document.querySelector(`#id_week_h_${id_week_h}`).innerHTML = Math.round(data.list[i].main.temp - 273);
                id_week_h++;
                console.log(data.list[i].dt_txt);
                if(data.list[i].weather[0]['description'] == "ясно")
                    document.querySelector(`#week_img${id_img}`).setAttribute('src', '../img/Солнечно.png');
                else
                if(data.list[i].weather[0]['description'] == "облачно с прояснениями" || data.list[i].weather[0]['description'] == "переменная облачность")
                    document.querySelector(`#week_img${id_img}`).setAttribute('src', '../img/Облачно.png');
                else
                if(data.list[i].weather[0]['description'] == "пасмурно")
                    document.querySelector(`#week_img${id_img}`).setAttribute('src', '../img/Пасмурно.png');
                else
                if(data.list[i].weather[0]['description'] == "небольшой дождь")
                    document.querySelector(`#week_img${id_img}`).setAttribute('src', '../img/Дождь.png');

                id_img++;
                for (var j = 1; j <= 5; j++) {
                    document.querySelector(`#week_img${j}`).style.visibility = "visible";
                }
                
            }
            if(a == '0' && b == '0' ){
                document.querySelector(`#id_week_c_${id_week_c}`).innerHTML =Math.round(data.list[i].main.temp - 273);
                id_week_c++;
            }

        }
    })
}

NewCity('Moskov');

