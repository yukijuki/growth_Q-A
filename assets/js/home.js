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
function createPost(){
    var a = document.createElement("a");
    a.className = "card-body secList";
    a.id = "question-card-body";
    a.href = "#" ;	
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
}
createPost();

//comment生成
function createComment() {
    var comment_a = document.createElement("a");
    comment_a.className = "card-body";
    comment_a.id = "comment-card-body";
    comment_a.href = "#";
    document.getElementById("comment-card").appendChild(comment_a);

    var comment_h5 = document.createElement("h5");
    comment_h5.className = "card-title px-4 text-dark";
    comment_h5.id = "comment-card-title";
    document.getElementById("comment-card-body").appendChild(comment_h5);

    var comment_h5title = document.createTextNode("ユーザー数を２倍にしてください");
    document.getElementById("comment-card-title").appendChild(comment_h5title);

    var comment_p = document.createElement("p");
    comment_p.className = "card-text px-4 text-dark";
    comment_p.id = "comment-card-text";
    document.getElementById("comment-card-body").appendChild(comment_p);

    var comment_ptext = document.createTextNode("先日、上司からユーザー数を２倍にしろという無茶振りがありました。自分は、toC事業会社で働いています。どのように進めていけばいいかわかりません。教えていただける方に…");
    document.getElementById("comment-card-text").appendChild(comment_ptext);


    var comment_div = document.createElement("div");
    comment_div.className = "like-button-area";
    comment_div.id = "like-button-area";
    document.getElementById("comment-card").appendChild(comment_div);

    var like_button = document.createElement("button");
    like_button.className = "btn-like btn btn-group-lg bg-orange btn-block text-white rounded-pill py-1 mt-0 mr-3 float-right";
    like_button.id = "like-button";
    document.getElementById("like-button-area").appendChild(like_button);

    var like_buttontext = document.createTextNode("Like");
    document.getElementById("like-button").appendChild(like_buttontext);
}
createComment();