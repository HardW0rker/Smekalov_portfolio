function open_descriptions(id){
	if(document.querySelector(`#description-text${id} > .description-text__text`).innerHTML == ""){

		hide_descriptions();
		document.querySelector(`#description-text${id} > .description-text__text`).innerHTML = description[id];
		document.querySelector(`#description-text${id} > .description-text__title`).classList.add('description-text__title-activ');
	}
	else
		hide_descriptions();
}
function hide_descriptions(){
	for (var i = 1; i <= 5; i++) {
		document.querySelector(`#description-text${i} > .description-text__text`).innerHTML = "";
		document.querySelector(`#description-text${i} > .description-text__title`).classList.remove('description-text__title-activ');
	}
}