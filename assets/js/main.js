$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
});

//jScroll
var jscrollOption = {
    loadingHtml: 'now loading',
    autoTrigger: true,
    padding: 20,
    nextSelector: 'a.jscroll-next',
    contentSelector: '.jscroll'
}

$('.jscroll').jscroll(jscrollOption);

function posts_post() {

    const URL = "https://growthqa.du.r.appspot.com/";
        
        for (let i = 1; i < latlng_list.length; i++) {

            var lat = latlng_list[i][0];
            var lon = latlng_list[i][1];

            station_list.push(
                fetch(URL + lon + "&y=" + lat)
                .then(response => response.json())
                .then(data => {
                    var station= "駅,";
                    for (var i = 0; i < data["response"]["station"].length; i++) {
                        if (Number(data["response"]["station"][i]["distance"].slice( 0, -1 )) < 501) {
                            station += data["response"]["station"][i]["name"]+"駅"+","
                        }
                    }
                    return station
                })
            );
        }

        Promise.allSettled(station_list).then(values => nearstationDOM(values))
}

//post生成
var a = document.createElement("a");
a.className = "card-body secList";
a.id = "question-card-body";
document.getElementById("question-card").appendChild(a);

var h5 = document.createElement("h5");
h5.className = "card-title px-4 text-dark";
h5.id = "question-card-title";
document.getElementById("question-card-body").appendChild(h5);

var h5title = document.createTextNode("ユーザー数を２倍にしてください");
document.getElementById("question-card-title").appendChild(h5title);

var p = document.createElement("p");
p.className = "card-text px-4 text-dark";
p.id = "question-card-text";
document.getElementById("question-card-body").appendChild(p);

var ptext = document.createTextNode("先日、上司からユーザー数を２倍にしろという無茶振りがありました。自分は、toC事業会社で働いています。どのように進めていけばいいかわかりません。教えていただける方に…");
document.getElementById("question-card-text").appendChild(ptext);
