async function posts_post_api(email, title, text, category) {
    const urls = "https://growthqa.du.r.appspot.com/posts_post?email="+ email + "&title=" + title + "&text=" + text + "&category=" + category
    const url = "https://growthqa.du.r.appspot.com"
    console.log(url)
    return fetch(url, {
        method: 'POST',
        headers: {"Access-Control-Allow-Origin": "*"}
      })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                console.log(response.json());
            }
        });
}

async function posts_post_func() {

    const email = document.getElementById("email").value;
    const title = document.getElementById("title").value;
    const text = document.getElementById("text").value;
    var marketer = document.getElementById("Marketer").checked;
    var pdm = document.getElementById("PdM").checked;
    var anlyat = document.getElementById("Data Analyst").checked;

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