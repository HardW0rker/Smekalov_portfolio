
var id_lesson = -1;
var id_step = -1;
var time = 0;
var temp = 1;
click_lesson(1);
function click_lesson(id) {
	clear();
	create_step(id);
	document.querySelector(`#lessons__list-item${id}`).classList.add('list-item-active');
	document.querySelector('.lessons__text-title').innerHTML = lessons[id]['title'];
	document.querySelector('.lessons__text-subtitle').innerHTML = lessons[id]['subtitle'];
	document.querySelector('.lessons__text-discription').innerHTML = lessons[id]['discription'];
	id_lesson = id;
	id_step = 1;
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
	document.querySelector('.error-massage').style.visibility = "visible";
	document.querySelector('.error-massage__text').innerHTML = massage;
	setTimeout(hide_error_massage, 3000);
}
function hide_error_massage(){
	document.querySelector('.error-massage').style.visibility = "hidden";
}
function clear(){
	document.querySelector('.error-massage__img').style.backgroundImage = `url(../img/icon/error.png)`;
	document.querySelector('.display-left-top-scrin-img').style.backgroundImage = `url()`;
	var elems = document.getElementsByClassName('sistem_button');
	for (var i = 0; i < elems.length; i++)
    	elems[i].style.background = "transparent";

	for (var i = 1; i <= 7; i++) {
		document.querySelector(`#lessons__list-item${i}`).classList.remove('list-item-active');
	}
	for (var i = 1; i <= 8; i++) {
		document.querySelector(`#step-item${i}`).style.visibility = "hidden";
		document.querySelector(`#step-item${i}`).style.alignItems = "center";
		document.querySelector(`#step-item${i} > .step-item__img `).classList.remove('step-item__img-active');
		document.querySelector(`#step-item${i} > .step-item__img `).classList.remove('step-item__img-preformed');
		document.querySelector(`#step-item${i} > .step-item__text > .step-item__text-discription`).innerHTML ="";
	}
}
function preformed_step(number){
	document.querySelector(`#step-item${number}`).style.alignItems = "center";
	document.querySelector(`#step-item${number} > .step-item__img `).classList.add('step-item__img-preformed');
	document.querySelector(`#step-item${number} > .step-item__text > .step-item__text-discription`).innerHTML ="";
}
function hide_discription(id){
	document.querySelector('.lessons__text-discription').innerHTML = `<button onclick="onhide_discription(${id})" class="lessons__text-discription-clear">Раскрыть</button>`;
}
function onhide_discription(id){
	document.querySelector('.lessons__text-discription').innerHTML = document.querySelector('.lessons__text-discription').innerHTML = lessons[id]['discription'];
}
function create_step(id){
	for (var i = 1; i <= lessons[id]['steps']['all']; i++) {
		document.querySelector(`#step-item${i}`).style.visibility = "visible";
	}
}
function active_step(id,number){
	document.querySelector(`#step-item${number}`).style.alignItems = "flex-start";
	document.querySelector(`#step-item${number} > .step-item__img `).classList.add('step-item__img-active');
	document.querySelector(`#step-item${number} > .step-item__text > .step-item__text-discription`).innerHTML = lessons[id]['steps'][number]['discription_step']
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
			document.querySelector(`#${lessons[id_lesson]['steps'][id_step-1]['script']['btn']}`).style.background = "transparent"
			id_step = id_step - (lessons[id_lesson]['steps'][id_step-1]['script']['return']) -1;
			clear_steps();
			running_lesson(lessons[id_lesson]['steps'][id_step-1]['script']['btn']);
		}
		else
		if(Date.now() < time+2000 || lessons[id_lesson]['steps'][id_step-1]['script']['close']=='yes'){
			document.querySelector(`#${lessons[id_lesson]['steps'][id_step-1]['script']['btn']}`).style.background = "transparent"
			document.querySelector('.display-right__top-img').style.backgroundImage = `url("../img/display/default.png")`;
		}
		else{
			if(activ_btn == lessons[id_lesson]['steps'][id_step-1]['script']['btn']){
				if (lessons[id_lesson]['steps'][id_step-1]['script']['input'] == document.querySelector(`.display-left-top-scrin-input`).value || lessons[id_lesson]['steps'][id_step-1]['script']['input'] == null)
				{
					preformed_step(id_step-1);
					if(lessons[id_lesson]['steps']['all'] >= id_step){
						active_step(id_lesson,id_step);
					}
					else{
						document.querySelector(`#lessons__list-item${id_lesson}`).classList.add('list-item-complited');
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
					
					document.querySelector(`#${lessons[id_lesson]['steps'][id_step-1]['script']['btn']}`).style.background = "transparent"
					if (lessons[id_lesson]['steps'][id_step]['script']['btn'] != "none"){
						document.querySelector(`#${lessons[id_lesson]['steps'][id_step]['script']['btn']}`).style.background = "rgba(237, 38, 38, 0.45)"
					}
					if(lessons[id_lesson]['steps'][id_step]['script']['time'] != null && temp){
						document.querySelector(`#${lessons[id_lesson]['steps'][id_step]['script']['btn']}`).style.background = "transparent"
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
					clearsimvol();
				}
			}
			else{
				error_massage("Вы нажали не на ту кнопку");
			}
		}
	}
	else{
		active_step(id_lesson,id_step);
		if (lessons[id_lesson]['steps'][1]['script']['img1'] != null){
			document.querySelector('.display-left-top-scrin-img').style.backgroundImage = `url("../img/display/${lessons[id_lesson]['steps'][1]['script']['img1']}")`;
		}
		if(lessons[id_lesson]['steps'][id_step]['script']['img2'] != null)
		{
			document.querySelector('.display-right__top-img').style.backgroundImage = `url("../img/display/${lessons[id_lesson]['steps'][id_step]['script']['img2']}")`;		}
		if(lessons[id_lesson]['steps'][id_step]['script']['img3'] != null)
		{
			document.querySelector('.display-right__bottom').style.backgroundImage = `url("../img/display/${lessons[id_lesson]['steps'][id_step]['script']['img3']}")`;
		}
				
		if (lessons[id_lesson]['steps'][1]['script']['btn'] != "none"){
			document.querySelector(`#${lessons[id_lesson]['steps'][1]['script']['btn']}`).style.background = "rgba(237, 38, 38, 0.45)"
		}
		id_step++;
	}
}