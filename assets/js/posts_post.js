function posts_post_DOM(data) {
    console.log(data["email"])
}

async function posts_post_api(email, title, text, category) {
    const urls = "https://growthqa.du.r.appspot.com/posts_post?email=" + email + "&title=" + title + "&text=" + text + "&category=" + category
    const url = "http://127.0.0.1:5000/posts_post"
    
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
        dataType: 'json',
        body: JSON.stringify(data)
      })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                posts_post_DOM(response.json());
            }
        });
}

function posts_post_func() {

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

    posts_post_api(email, title, text, category)
}