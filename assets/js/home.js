$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
});

//jScroll
var jscrollOption = {
    loadingHtml: 'now loading',
    autoTrigger: true,
    padding: 20,
    nextSelector: 'a.jscroll-next',
    contentSelector: '.jscroll'
}

$('.jscroll').jscroll(jscrollOption);

//sidebar
$(function () {
    $('.sidebar-icon2').hide()
    $('.sidebar-icon1').on('click', function () {
        $('.sidebar-icon1').hide();
        $('.sidebar-icon2').show();
    });
    $('.sidebar-icon2').on('click', function () {
        $('.sidebar-icon2').hide();
        $('.sidebar-icon1').show();
    });
});