
function posts_post_api(email, title, text, category) {
    const url = "https://growthqa.du.r.appspot.com/posts_post";
    
    console.log("posturl", url)

    var data = {
        "email": email,
        "title": title,
        "text": text,
        "category": category
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

function createPost(response){

    var div = document.createElement("div");
    div.className = "card mx-auto bg-white p-2 et_pb_module";
    div.id = response["post_id"];
    document.getElementById("apost").appendChild(div);

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

async function posts_post_func() {

    const email = document.getElementById("email").value;
    const title = document.getElementById("title").value;
    const text = document.getElementById("text").value;
    const marketer = document.getElementById("Marketer").checked;
    const pdm = document.getElementById("PdM").checked;
    const anlyat = document.getElementById("Data Analyst").checked;

    var category;

    if (marketer == true) {
        category = "Marketer"
    } else if (pdm == true) {
        category = "PdM"
    } else if(anlyat == true) {
        category = "Data Analyst"
    }

    console.log("email", email)
    console.log("title", title)
    console.log("text", text)
    console.log("category", category)

    const response = await posts_post_api(email, title, text, category)
    console.log("APIresponse", response);

    createPost(response);
}