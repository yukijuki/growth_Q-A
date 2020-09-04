
function like_post_api() {
    const url = "http://127.0.0.1:5000/posts_post";
    
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

function likePost(response){


}

async function like_post_func() {

    const response = await like_post_api()
    console.log("APIresponse", response);

    likePost(response);
}