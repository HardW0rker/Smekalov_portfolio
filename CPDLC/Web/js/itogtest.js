
var id_lesson = -1;
var id_step = -1;
var id_test = 1;
var different = 0;
var time = 0;
var temp = 1;
var point =10;
click_test(1);
function click_test(id) {
	clear();
	create_step();
	document.querySelector('.lessons__text-title').innerHTML = 'Итоговый тест';
	id_lesson = id;
	id_step = 1;
	id_test = 1;
	different = 0;
	active_step(1);
	running_lesson('');
}
function addsimvol(simvol) {
	document.querySelector(`.display-left-top-scrin-input`).value = document.querySelector(`.display-left-top-scrin-input`).value + simvol;
}
function delsimvol() {
	document.querySelector(`.display-left-top-scrin-input`).value = document.querySelector(`.display-left-top-scrin-input`).value.slice(0, -1);
}
function clearsimvol() {
	document.querySelector(`.display-left-top-scrin-input`).value = '';
}
function error_massage(massage){
	document.querySelector('.error-massage__img').style.backgroundImage = `url(../img/icon/error.png)`;
	document.querySelector('.error-massage').style.visibility = "visible";
	document.querySelector('.error-massage__text').innerHTML = massage;
	setTimeout(hide_error_massage, 3000);
}
function store_massage(massage,img){
	document.querySelector('.error-massage').style.visibility = "visible";
	document.querySelector('.error-massage__img').style.backgroundImage = `url(../img/icon/${img}.png)`;
	document.querySelector('.error-massage__text').innerHTML = massage;
}
function hide_error_massage(){
	document.querySelector('.error-massage').style.visibility = "hidden";
}
function clear(){
	document.querySelector('.display-left-top-scrin-img').style.backgroundImage = `url()`;
	var elems = document.getElementsByClassName('sistem_button');
	for (var i = 0; i < elems.length; i++)
    	elems[i].style.background = "transparent";

	for (var i = 1; i <= 8; i++) {
		document.querySelector(`#step-item${i}`).style.visibility = "hidden";
		document.querySelector(`#step-item${i}`).style.alignItems = "center";
		document.querySelector(`#step-item${i} > .step-item__img `).classList.remove('step-item__img-active');
		document.querySelector(`#step-item${i} > .step-item__img `).classList.remove('step-item__img-preformed');
		document.querySelector(`#step-item${i} > .step-item__text > .step-item__text-discription`).innerHTML ="";
	}
}

function create_step(){
	for (var i = 1; i <= 5; i++) {
		document.querySelector(`#step-item${i}`).style.visibility = "visible";
	}
}
function active_step(number){
	document.querySelector(`#step-item${number}`).style.alignItems = "flex-start";
	document.querySelector(`#step-item${number} > .step-item__img `).classList.add('step-item__img-active');
	document.querySelector(`#step-item${number} > .step-item__text > .step-item__text-discription`).innerHTML = test[number];
}
function preformed_step(number){
	document.querySelector(`#step-item${number}`).style.alignItems = "center";
	document.querySelector(`#step-item${number} > .step-item__img `).classList.add('step-item__img-preformed');
	document.querySelector(`#step-item${number} > .step-item__text > .step-item__text-discription`).innerHTML ="";
}

function clear_steps(){
	for (var i = 8; i >= id_step; i--) {
		document.querySelector(`#step-item${i}`).style.alignItems = "center";
		document.querySelector(`#step-item${i} > .step-item__img `).classList.remove('step-item__img-active');
		document.querySelector(`#step-item${i} > .step-item__img `).classList.remove('step-item__img-preformed');
		document.querySelector(`#step-item${i} > .step-item__text > .step-item__text-discription`).innerHTML ="";
	}
}

function running_lesson(activ_btn){
	if (id_step != 1){
		if(activ_btn == "btn_1_6" && lessons[id_lesson]['steps'][id_step-1]['script']['return'] != null){
			id_step = id_step - (lessons[id_lesson]['steps'][id_step-1]['script']['return']) -1;
			clear_steps();
			running_lesson(lessons[id_lesson]['steps'][id_step-1]['script']['btn']);
		}
		else
		if(Date.now() < time+2000 || lessons[id_lesson]['steps'][id_step-1]['script']['close']=='yes'){
			document.querySelector('.display-right__top-img').style.backgroundImage = `url("../img/display/default.png")`;
		}
		else{
			if(activ_btn == lessons[id_lesson]['steps'][id_step-1]['script']['btn']){
				if (lessons[id_lesson]['steps'][id_step-1]['script']['input'] == document.querySelector(`.display-left-top-scrin-input`).value || lessons[id_lesson]['steps'][id_step-1]['script']['input'] == null)
				{
					if(lessons[id_lesson]['steps']['all'] < id_step){
						different++;
						id_lesson++;
						id_step = 1;
						running_lesson('');
						id_step--;
					}					
					if (lessons[id_lesson]['steps'][id_step]['script']['img1'] != null){
						document.querySelector('.display-left-top-scrin-img').style.backgroundImage = `url("../img/display/${lessons[id_lesson]['steps'][id_step]['script']['img1']}")`;
					}
					if(lessons[id_lesson]['steps'][id_step]['script']['img2'] != null)
					{
						document.querySelector('.display-right__top-img').style.backgroundImage = `url("../img/display/${lessons[id_lesson]['steps'][id_step]['script']['img2']}")`;
					}
					if(lessons[id_lesson]['steps'][id_step]['script']['img3'] != null)
					{
						document.querySelector('.display-right__bottom').style.backgroundImage = `url("../img/display/${lessons[id_lesson]['steps'][id_step]['script']['img3']}")`;
					}
					
					if(lessons[id_lesson]['steps'][id_step]['script']['time'] != null && temp){
						document.querySelector('.display-right__top-img').style.backgroundImage = `url("../img/display/${lessons[id_lesson]['steps'][id_step]['script']['time']}")`;
						temp= 0;
						time = Date.now();
						setTimeout(running_lesson, 2000, lessons[id_lesson]['steps'][id_step-1]['script']['btn']);
					}
					else{
						temp = 1;
						id_step++;
					   clearsimvol();
					}
				}
				else{
					error_massage("Вы ввели неправильное значение");
					point--;
					clearsimvol();
				}
			}
			else{
				error_massage("Вы нажали не на ту кнопку");
				point--;
			}
		}
	}
	else{
		if(id_test<5){
			if(test['different'][id_test] == different){
			preformed_step(id_test);
			id_test++;
			active_step(id_test);
			}
		}
		else{
			preformed_step(id_test);
			if(point == 10){
				store_massage('Поздравляем! Вы прошли урок без ошибок!','green_check');
			}
			else
			if(point > 7){
				store_massage(`Поздравляем! Вы прошли урок, колличество ошибок ${-point+10}`,'green_check');
			}
			else{
				store_massage(`Вы не прошли урок. Повторите уроки и попробуйте снова!`,'error');
			}

		}
		if (lessons[id_lesson]['steps'][1]['script']['img1'] != null){
			document.querySelector('.display-left-top-scrin-img').style.backgroundImage = `url("../img/display/${lessons[id_lesson]['steps'][1]['script']['img1']}")`;
		}
		if(lessons[id_lesson]['steps'][1]['script']['img2'] != null)
		{
			document.querySelector('.display-right__top-img').style.backgroundImage = `url("../img/display/${lessons[id_lesson]['steps'][1]['script']['img2']}")`;		}
		if(lessons[id_lesson]['steps'][1]['script']['img3'] != null)
		{
			document.querySelector('.display-right__bottom').style.backgroundImage = `url("../img/display/${lessons[id_lesson]['steps'][1]['script']['img3']}")`;
		}
				
		id_step++;
	}
}