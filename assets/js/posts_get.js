
function posts_get_api(category) {
    var url = "http://127.0.0.1:5000/posts_get"
    if(category) {
        var url = "http://127.0.0.1:5000/posts_get?category="+category
    }
    console.log(url)
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

function createPosts(response){

    var div = document.createElement("div");
    div.className = "card mx-auto bg-white p-2 et_pb_module";
    div.id = response["post_id"];
    document.getElementById("card-list-home").appendChild(div);

    var a = document.createElement("a");
    a.className = "card-body secList";
    a.id = "question-card-body"+response["post_id"];
    a.href = "./comment.html?post_id="+response["post_id"] ;	
    document.getElementById(response["post_id"]).appendChild(a);

    var h5 = document.createElement("h5");
    h5.className = "card-title px-4 text-dark";
    h5.id = "question-card-title"+response["post_id"];
    document.getElementById("question-card-body"+response["post_id"]).appendChild(h5);

    var h5title = document.createTextNode(response["title"]);
    document.getElementById("question-card-title"+response["post_id"]).appendChild(h5title);

    var p = document.createElement("p");
    p.className = "card-text px-4 text-dark";
    p.id = "question-card-text"+response["post_id"];
    document.getElementById("question-card-body"+response["post_id"]).appendChild(p);

    var ptext = document.createTextNode(response["text"]);
    document.getElementById("question-card-text"+response["post_id"]).appendChild(ptext);
}



async function posts_get_func() {

    login_verification();

    if (document.getElementById("card-list-home")) {

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
        var category = params['category']
        if (category == undefined) {
            category = "All"
        }
        console.log("current category is", category)

        const response = await posts_get_api(category)
        console.log("APIresponse", response);

        for (var i = 0; i < response.length; i++) {
            createPosts(response[i]);
        }
    }
}

window.onload = posts_get_func;