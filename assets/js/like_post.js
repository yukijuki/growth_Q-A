
function like_post_api(uuid, comment_id) {
    const url = "http://127.0.0.1:5000/like_post";
    
    var data = {
        "user_id": uuid,
        "comment_id": comment_id
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

function likePost(response, id){

    var title = document.createTextNode(response["comment_id"]);
    document.getElementById(id).appendChild(title);

}

async function like_post_func(id) {

    var comment_id = id.slice(11);
    console.log("comment_id for like", comment_id);

    var uuid = localStorage.getItem('uuid')

    const response = await like_post_api(uuid, comment_id)
    console.log("APIresponse", response);

    //likePost(response, id);
}