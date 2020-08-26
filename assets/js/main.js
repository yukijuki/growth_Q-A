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

//post生成
var a = document.createElement("a");
a.className = "card-body secList";
a.id = "question-card-body";
document.getElementById("question-card").appendChild(a);

var h5 = document.createElement("h5");
h5.className = "card-title px-4 text-dark";
h5.id = "question-card-title";
document.getElementById("question-card-body").appendChild(h5);

var h5title = document.createTextNode("ユーザー数を２倍にしてください");
document.getElementById("question-card-title").appendChild(h5title);

var p = document.createElement("p");
p.className = "card-text px-4 text-dark";
p.id = "question-card-text";
document.getElementById("question-card-body").appendChild(p);

var ptext = document.createTextNode("先日、上司からユーザー数を２倍にしろという無茶振りがありました。自分は、toC事業会社で働いています。どのように進めていけばいいかわかりません。教えていただける方に…");
document.getElementById("question-card-text").appendChild(ptext);
