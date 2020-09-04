
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

    var like_text = document.getElementById(id).innerHTML;

    var text = like_text.slice(0, -1); //except for lastword
    var num = like_text.slice(-1); //lastword

    var add_num;
    if (response["action"] == "delete"){
        add_num = Number(num) - 1
    } else {
        add_num = Number(num) + 1
    }

    var title = document.createTextNode(text + add_num);

    var target = document.getElementById(id)
    target.innerHTML = text + add_num
    //like_button.className = "btn-like btn btn-group-lg btn-unlike btn-block text-white rounded-pill py-1 mt-0 mr-3 float-right";


}

async function like_post_func(id) {

    var comment_id = id.slice(11);
    console.log("comment_id for like", comment_id);

    var uuid = localStorage.getItem('uuid')

    const response = await like_post_api(uuid, comment_id)
    console.log("APIresponse", response);
    //location.reload();
    likePost(response, id);
}