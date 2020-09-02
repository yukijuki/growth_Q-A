
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



async function posts_get_func() {

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
        const category = params['category']
        console.log(category)

        const response = await posts_get_api(category)
        console.log("APIresponse", response);

        for (var i = 0; i < response.length; i++) {
            console.log("i", i)
            createPost(response[i]);
        }
    }
}

window.onload = posts_get_func;