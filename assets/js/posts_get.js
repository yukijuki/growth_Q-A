
function posts_get_api(category) {
    const url = "http://127.0.0.1:5000/posts_get"
    
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


function createPost(response){

    console.log(response)
    var a = document.createElement("a");
    a.className = "card-body secList";
    a.id = "question-card-body";
    a.href = "#" ;	
    document.getElementById("question-card").appendChild(a);

    var h5 = document.createElement("h5");
    h5.className = "card-title px-4 text-dark";
    h5.id = "question-card-title";
    document.getElementById("question-card-body").appendChild(h5);

    var h5title = document.createTextNode(response["title"]);
    document.getElementById("question-card-title").appendChild(h5title);

    var p = document.createElement("p");
    p.className = "card-text px-4 text-dark";
    p.id = "question-card-text";
    document.getElementById("question-card-body").appendChild(p);

    var ptext = document.createTextNode(response["text"]);
    document.getElementById("question-card-text").appendChild(ptext);
}

async function posts_get_func() {

    var category;

    // if (marketer == true) {
    //     category = "Marketer"
    // } else if (pdm == true) {
    //     category = "PdM"
    // } else if(anlyat == true) {
    //     category = "Data Analyst"
    // }
    if (document.getElementById("question-card")) {
        const response = await posts_get_api(category)
        console.log("APIresponse", response);

        for (var i = 0; i < response.length; i++) {
            createPost(response[i]);
        }
    }
}

window.onload = posts_get_func;