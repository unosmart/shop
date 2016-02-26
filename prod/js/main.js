// Объявляем модуль
  var shopModule = (function () {
// Инициализируем модуль
    var init = function () {
      _setUpListener();
    };
//Прослушка
    var _setUpListener = function () {
      $('.clear-checkbox-link').on('click', _resetFilter)
      $('.view-block__catalog__link_block').on('click', _showBlock)
      $('.view-block__catalog__link_list').on('click',_showList)
      $('.view-block__catalog__link_table').on('click',_showTable)
      $('.color-box__item').on('click', _colorCheck)
    };

// Настройки слайдера и инициализация слайдера
//Забераем значения из инпутов
$("input#minCost").change(function(){
  var value1=$("input#minCost").val();
  var value2=$("input#maxCost").val();
  if (value1 < 0) { value1 = 0; $("input#minCost").val(0)}
  if(parseInt(value1) > parseInt(value2)){
  value1 = value2;
  $("input#minCost").val(value1);
  }
  $("#slider").slider("values",0,value1);  
});
$("input#maxCost").change(function(){
  var value1=$("input#minCost").val();
  var value2=$("input#maxCost").val();
  if (value2 > 13000) { value2 = 13000; $("input#maxCost").val(13000)}
  if(parseInt(value1) > parseInt(value2)){
    value2 = value1;
    $("input#maxCost").val(value2);
  }
  $("#slider").slider("values",1,value2);
});
$(function() {
  $("#slider").slider({
        min: 0,
        max: 13000,
        values: [2667,9405],
        range: true,
        stop: function(event, ui) {
          $("input#minCost").val($("#slider").slider("values",0));
          $("input#maxCost").val($("#slider").slider("values",1));
          },
        slide: function(event, ui){
          $("input#minCost").val($("#slider").slider("values",0));
          $("input#maxCost").val($("#slider").slider("values",1));
          }
      });
  });
//Вешаем рамку на цвет
var _colorCheck = function(e){
   e.preventDefault();
  $(this).toggleClass('color-box__item_active');
}
//columnizer
$('.main-info__text').addClass('dontsplit');
$('.main-info__content').columnize({ columns: 2 });
// Сворачивание фильтра
var trigger = $('.trigger');
trigger.prepend('<i class="arrow-up arrow"></i>');
trigger.click(function(e){
  e.preventDefault();
  $('.arrow',this).toggleClass('arrow-down');
  $(this).parent().next('.expand-content').stop(true);
  $(this).parent().next('.expand-content').slideToggle(300);
});
// Наши переключатели видов
var _showBlock = function(event) {
  event.preventDefault();
  $('.active').removeClass('active');
  $(this).addClass('active');
  $('.list').removeClass('list').addClass('block');
  $('.table').removeClass('table').addClass('block');
}
var _showTable = function(event) {
  event.preventDefault();
  $('.active').removeClass('active');
  $(this).addClass('active');
  $('.table').removeClass('table').addClass('list');
  $('.block').removeClass('block').addClass('list');
}
var _showList = function(event) {
  event.preventDefault();
  $('.active').removeClass('active');
  $(this).addClass('active');
  $('.block').removeClass('block').addClass('table');
  $('.list').removeClass('list').addClass('table');
}
// Сброс input
var _resetFilter = function(event) {
  event.preventDefault();
    var find = $(this)
      .closest('.expand-content')
      .find('input:checkbox')
      .removeAttr('checked');
}
$('.view-block__sort__select').select2({minimumResultsForSearch: Infinity});

// Возвращаем объект (публичные методы)
  return {
    init: init
  };
})();

// Вызываем модуль
shopModule.init();