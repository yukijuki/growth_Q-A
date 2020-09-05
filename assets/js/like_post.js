
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

function likePost(response, comment_id){

    var judge;
    var num_space = "like_num_p"+comment_id
    var num = document.getElementById(num_space).innerHTML;

    var add_num;

    if (response["action"] == "delete"){
        add_num = Number(num) - 1
    } else {
        add_num = Number(num) + 1
    }

    if(response["action"] == "delete") {
        judge = "Like"
    } else {
        judge = "Unlike"
    }

    //ライクの数値を変更
    var target = document.getElementById(num_space);
    target.innerHTML = add_num;

    //ライクの文字を変更
    var like_text = "like-button"+comment_id
    var like = document.getElementById(like_text);
    like.innerHTML = judge;

}

async function like_post_func(id) {

    var comment_id = id.slice(11);
    console.log("comment_id for like", comment_id);

    var uuid = localStorage.getItem('uuid')

    const response = await like_post_api(uuid, comment_id)
    console.log("APIresponse", response);
    //location.reload();
    likePost(response, comment_id);
}