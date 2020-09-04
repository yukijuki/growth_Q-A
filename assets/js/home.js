 $('#myModal').on('shown.bs.modal', function () {
     $('#myInput').trigger('focus')
 });

// //jScroll
// var jscrollOption = {
//     loadingHtml: 'now loading',
//     autoTrigger: true,
//     padding: 20,
//     nextSelector: 'a.jscroll-next',
//     contentSelector: '.jscroll'
// }

// $('.jscroll').jscroll(jscrollOption);

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

function generateUuid() {

    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

var uuid = localStorage.getItem('uuid')

if (uuid) {
    console.log("logged in as", uuid)
    //localStorage.removeItem("uuid");

} else {
    const newuuid = generateUuid()
    localStorage.setItem('uuid', newuuid)
    console.log("account created", newuuid)
}
