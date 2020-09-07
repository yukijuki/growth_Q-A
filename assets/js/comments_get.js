
function comments_get_api(post_id, uuid) {
    var url = "https://growthqa.du.r.appspot.com/comments_get?post_id="+post_id+"&user_id="+uuid

    return fetch(url, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
      })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                return Promise.resolve(response.json());
            }
        });
}

function createComments(response){
    var judge;

    var comment_a = document.createElement("div");
    comment_a.className = "card mx-auto bg-white p-2";
    comment_a.id = response["comment_id"];
    document.getElementById("comment").appendChild(comment_a);

    var div = document.createElement("div");
    div.className = "card-body px-1 pb-0";
    div.id = "comment-card-body"+response["comment_id"];
    document.getElementById(response["comment_id"]).appendChild(div);


    var comment_h5 = document.createElement("h5");
    comment_h5.className = "card-title px-4 text-dark";
    comment_h5.id = "comment-card-title"+response["comment_id"];
    document.getElementById("comment-card-body" + response["comment_id"]).appendChild(comment_h5);

    var comment_h5title = document.createTextNode(response["name"]);
    document.getElementById("comment-card-title"+response["comment_id"]).appendChild(comment_h5title);


    var comment_p = document.createElement("p");
    comment_p.className = "card-text px-4 text-dark";
    comment_p.id = "comment-card-text"+response["comment_id"];
    document.getElementById("comment-card-body"+response["comment_id"]).appendChild(comment_p);

    var comment_ptext = document.createTextNode(response["text"]);
    document.getElementById("comment-card-text"+response["comment_id"]).appendChild(comment_ptext);


    var like_num_div = document.createElement("div");
    like_num_div.className = "like-count";
    like_num_div.id = "like-count"+response["comment_id"];
    document.getElementById(response["comment_id"]).appendChild(like_num_div);

    var like_num_p = document.createElement("p");
    like_num_p.className = "text-dark py-1 mt-0 mr-3 float-right";
    like_num_p.id = "like_num_p"+response["comment_id"];
    document.getElementById("like-count"+response["comment_id"]).appendChild(like_num_p);
    
    if(response["like"] == undefined){
        response["like"] = 0
    }

    var like_num_ptext = document.createTextNode(response["like"]);
    document.getElementById("like_num_p"+response["comment_id"]).appendChild(like_num_ptext);


    var comment_div = document.createElement("div");
    comment_div.className = "like-button-area";
    comment_div.id = "like-button-area"+response["comment_id"];
    document.getElementById(response["comment_id"]).appendChild(comment_div);

    var like_button = document.createElement("button");
    like_button.className = "btn-like btn btn-group-lg bg-orange btn-block text-white rounded-pill py-1 mt-0 mr-3 float-right";
    //like_button.className = "btn-like btn btn-group-lg btn-unlike btn-block text-white rounded-pill py-1 mt-0 mr-3 float-right";
    like_button.id = "like-button"+response["comment_id"];
    like_button.setAttribute("onclick", "like_post_func(this.id);");

    document.getElementById("like-button-area"+response["comment_id"]).appendChild(like_button);

    if(response["judge"] == true) {
        judge = "Unlike"
    } else {
        judge = "Like"
    }
    var like_buttontext = document.createTextNode(judge); //like num add here
    document.getElementById("like-button"+response["comment_id"]).appendChild(like_buttontext);
}

async function comments_get_func() {

    login_verification();

    /// Get parameter for category    
    var params = {};
    var query = window.location.href.split("?")[1];
    if(query) {
        var rawParams = query.split('&');
        rawParams.forEach(function(prm,i){
            var kv = prm.split('=');
            params[kv[0]] = kv[1];
        });
    }

    const post_id = params['post_id'];
    console.log("post_id", post_id);

    var uuid = localStorage.getItem('uuid')

    const response = await comments_get_api(post_id, uuid);
    console.log("APIresponse", response);

    var title = document.createTextNode(response[0]["title"]);
    document.getElementById("comment-text").appendChild(title);

    var text = document.createTextNode(response[0]["text"]);
    document.getElementById("comment-p").appendChild(text);


    //タイトル・コメントカードのコメント数の変更
    var comment_h5 = document.createElement("h5");
    comment_h5.className = "d-inline-block my-auto pl-2 text-orange";
    comment_h5.id = "top-card-title_text";
    document.getElementById("top-card-title").appendChild(comment_h5);

    var text = document.createTextNode(response[0]["comments_num"]);
    document.getElementById("top-card-title_text").appendChild(text);

    for (var i = 1; i < response.length; i++) {
        createComments(response[i]);
    }
}

window.onload = comments_get_func;