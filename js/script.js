

	
var slideWidth=300;
var sliderTimer;	
	
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
			$.each(data.marks, function(key, val) {
                  addMark(val.coords,val.text,myMap);  
                });
				
		});
}
});

