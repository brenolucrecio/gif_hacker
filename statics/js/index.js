listItem = [];

function UpScore(id){
    var score = parseInt($("#score" + id).text());

    if(score >= 0)
        score++;
    
    OrderListByScore(id, score);

    UpdateCards(listItem);
    
    $("#score" + id).text(score);
}

function DownScore(id){
    var score = parseInt($("#score" + id).text());

    if(score > 0)
        score--;
    
    OrderListByScore(id, score);

    UpdateCards(listItem);

    $("#score" + id).text(score);
}

function OrderListByScore(id, score){
    var item = listItem.findIndex((obj => obj.id == id));
    listItem[item].score = score;

    listItem = listItem.sort(compareValues('score', 'desc'));
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    xmlHttp.open("GET", theUrl, true);

    xmlHttp.send(null);

    return;
}

function tenorCallback_search(responsetext)
{
    var response_objects = JSON.parse(responsetext);

    top_gifs = response_objects["results"];

    for(var i = 0; i < top_gifs.length; i++){
        var id = i + 1;
        var url = top_gifs[i]["media"][0]["nanogif"]["url"];
        var score = parseInt($("#score" + id).text());

        if(Number.isNaN(score))
            score = 0;

        var item = { id: id, url: url, score: score }

        listItem.push(item);

        $('#content').append(generateCard(id, 0));
        $("#preview_gif"+ id).attr('src', url);
    }

    return;
}

function grab_data()
{
    var apikey = "XKIUZX92BQXS";
    var lmt = 20;

    var search_term = "hacker";
    
    var search_url = "https://api.tenor.com/v1/search?q=" + search_term + "&key=" + apikey + "&limit=" + lmt;

    httpGetAsync(search_url, tenorCallback_search);

    return;
}

function generateCard(id, score){

    var html = '<div class="card">';
    html += '<div class="card-header">';
    html += '<strong>#'+ id + '- GIF</strong> </div>';
    html += ' <div class="card-body row d-flex justify-content-center text-center">';
    html += ' <div class="col-sm-4">';
    html += ' <img id="preview_gif'+ id +'" src="" alt="gif"  width=250/> </div> <div>';
    html += '<div class="col-sm-2">';
    html += '<button type="button" class="btn btn-success btnAction" onclick="UpScore(' + id +')">vote up (+1)</button> </div>';
    html += ' <p id="score' + id +'" class="score">' + score + '</p>';
    html += ' <div class="col-sm-2">';
    html += ' <button type="button" class="btn btn-success btnAction" onclick="DownScore('+ id +')">vote down (-1)</button> </div> </div> </div> </div> <hr>';
    return html;
}

function UpdateCards(listItem){
    $('#content').empty();

    for(var i = 0; i < listItem.length; i++) {
        
         var item = listItem[i];

        $('#content').append(generateCard(item.id, item.score));
        $("#preview_gif"+ item.id).attr('src', item.url);
    }
}

function getGifs(){
    $.ajax({
        url:  '/items/list',
        type:  'GET',
        dataType:  'json',
        success: function  (data) {
            if(data.items.length === 0)
                grab_data();
            else
            {
                alert('deu ruim!');
            }
        }
    });
}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  

getGifs();