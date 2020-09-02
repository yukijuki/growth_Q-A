
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

    var div = document.createElement("div");
    div.className = "card mx-auto bg-white p-2 et_pb_module";
    div.id = response["comment_id"];
    document.getElementById("comment").appendChild(div);

    var a = document.createElement("a");
    a.className = "card-body secList";
    a.id = "question-card-body"+response["comment_id"];
    a.href = "#";	
    document.getElementById(response["comment_id"]).appendChild(a);

    var p = document.createElement("p");
    p.className = "card-text px-4 text-dark";
    p.id = "question-card-text"+response["comment_id"];
    document.getElementById("question-card-body"+response["comment_id"]).appendChild(p);

    var ptext = document.createTextNode(response["text"]);
    document.getElementById("question-card-text"+response["comment_id"]).appendChild(ptext);
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
  
    console.log("text", text)

    const response = await comments_post_api(post_id, text)
    console.log("APIresponse", response);
    createComment(response);
}