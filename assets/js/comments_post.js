
function comments_post_api(text, post_id) {
    const url = "http://127.0.0.1:5000/comments_post";
    
    var data = {
        "post_id": post_id,
        "text": text
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                return Promise.resolve(response.json());
            }
        });
}

function createComment(response){

    var comment_a = document.createElement("div");
    comment_a.className = "card-body px-1 pb-0";
    comment_a.id = "comment-card-body";
    document.getElementById("comment-card").appendChild(comment_a);

    var comment_h5 = document.createElement("h5");
    comment_h5.className = "card-title px-4 text-dark";
    comment_h5.id = "comment-card-title";
    document.getElementById("comment-card-body").appendChild(comment_h5);

    var comment_h5title = document.createTextNode(response["name"]);
    document.getElementById("comment-card-title").appendChild(comment_h5title);

    var comment_p = document.createElement("p");
    comment_p.className = "card-text px-4 text-dark";
    comment_p.id = "comment-card-text";
    document.getElementById("comment-card-body").appendChild(comment_p);

    var comment_ptext = document.createTextNode(response["text"]);
    document.getElementById("comment-card-text").appendChild(comment_ptext);

    var comment_div = document.createElement("div");
    comment_div.className = "like-button-area";
    comment_div.id = "like-button-area";
    document.getElementById("comment-card").appendChild(comment_div);

    var like_button = document.createElement("button");
    like_button.className = "btn-like btn btn-group-lg bg-orange btn-block text-white rounded-pill py-1 mt-0 mr-3 float-right";
    like_button.id = "like-button";
    document.getElementById("like-button-area").appendChild(like_button);

    var like_buttontext = document.createTextNode("Like 1");
    document.getElementById("like-button").appendChild(like_buttontext);
}

async function comment_post_func() {


    /// Get parameter for category    
    var params = {};
    var query = window.location.href.split("?")[1];
    if(query){
        var rawParams = query.split('&');
        rawParams.forEach(function(prm,i){
            var kv = prm.split('=');
            params[kv[0]] = kv[1];
        });
    }
    const post_id = params['post_id']
    console.log(post_id)

    const text = document.getElementById("commenttext").value;
    const text = document.getElementById("commenttext").value;

  
    console.log("text", text)

    const response = await comments_post_api(post_id, text)
    console.log("APIresponse", response);
    createComment(response);
}