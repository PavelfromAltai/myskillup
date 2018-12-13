

	
var slideWidth=300;
var sliderTimer;
function initSlider (){
	var countSlides = $('.slider').children().length;
	// var first = $('.slider').children(':first');
	// var last = $('.slider').children(':last');
	// console.log(countSlides);
	// console.log(first);
	// console.log(last);
	// $('.slider').append(first);
	// console.log( $('.slider').children().length);
	
}
	
	
function nextSlide(){
	$('.slide__nav').removeClass('active');
    var currentSlide=parseInt($('.slider').data('current'));
    currentSlide++;
	
    if(currentSlide>=$('.slider').children().length)
    {
        currentSlide=0;   
    }
    $('.slider').animate({left: -currentSlide*slideWidth},300).data('current',currentSlide);
	$('.slider').data('current',currentSlide);
	$('.slide__nav').eq(currentSlide).addClass('active');
}

function prevSlide(){
	$('.slide__nav').removeClass('active');
    var currentSlide=parseInt($('.slider').data('current'));
    currentSlide--;
	
    if(currentSlide<0)
    {
        currentSlide=$('.slider').children().length-1;   
    }
    $('.slider').animate({left: -currentSlide*slideWidth},300).data('current',currentSlide);
	$('.slider').data('current',currentSlide);
	$('.slide__nav').eq(currentSlide).addClass('active');
}
function initDots(){
	var Nchildren = $('.slider').children().length;
	//$('.slider-block').append('<ul class="slider__nav"></ul>');
	for (i=0;i<Nchildren;i++){
		if (i==0){
			$('.slider-block').append('<li class="slide__nav active"></li>');
		} else {
			$('.slider-block').append('<li class="slide__nav"></li>');
		}
	}
	
	$('.slide__nav').wrapAll('<ul class="slider__nav"></ul>')
}

$(function(){
	initDots();
// $('.slider').width($('.slider').children().size*slideWidth);
    // sliderTimer=setInterval(nextSlide,2000);
    // $('.slider-block').hover(function(){
		// console.log('stop');
        // clearInterval(sliderTimer);
    // },function(){
        // sliderTimer=setInterval(nextSlide,2000);
    // });



	$('.arrow-prev').on('click',function(){
		console.log("prev");
		prevSlide();
		return false;
	});
	$('.arrow-next').on('click',function(){
		console.log("next");
		nextSlide();
		return false;
	})

	$('.slide__nav').on('click',function(){
		$('.slide__nav').removeClass('active');
		var index = $(this).index();
		
		$('.slider').animate({left: -index*slideWidth},300).data('current',index);

	
		$(this).addClass('active');
		$('.slider').data('current',index);
		return false;
	})
	
function addMark(coords,balloonText,object){
var myPlacemark =	new ymaps.Placemark(coords, {
            // Балун откроется при клике по метке.
            balloonContent: balloonText
        },
		{
            preset: "islands#blackIcon",
        });
		object.geoObjects.add(myPlacemark);
}

	
	//Яндекс карта
	ymaps.ready(init);

function init(){
	
	
	
	
    var myMap;
    myMap = new ymaps.Map("map", {
        center: [53.34711867740867,83.72389645100893],
        zoom: 13
    });
	
	$.getJSON('marks.json', function(data){
				console.log(data);
			//var decodeJSON = $.parseJSON(data);
			console.log(data.marks);
			// console.log(data.marks[0].coords);
			// console.log(data.marks[0].text);
			// console.log(data.marks[1].coords);
			// console.log(data.marks[1].text);
			
			$.each(data.marks, function(key, val) {
				//console.log('key: '+key+' coords: '+val.coords);
                  addMark(val.coords,val.text,myMap);  
                });
				
		});
	// var myPlacemark = new ymaps.Placemark([53.32948257111433,83.80490199999997], {

//            Балун откроется при клике по метке.
            // balloonContent: 'Новый офис'
        // },
		// {
            // preset: "islands#blackIcon",
        // });
		
		// var myPlacemark2 = new ymaps.Placemark([53.33042957111674,83.67507749999993], {

         //   Балун откроется при клике по метке.
            // balloonContent: 'Старый офис'
        // },
		// {
            // preset: "islands#blackIcon",
        // });
 
        // После того как метка была создана, добавляем её на карту.
        //myMap.geoObjects.add(myPlacemark);
        //myMap.geoObjects.add(myPlacemark2);
}
});

