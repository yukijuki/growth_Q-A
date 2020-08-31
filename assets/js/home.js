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


