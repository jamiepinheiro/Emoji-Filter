emojis = [];
emotions = ["anger", "contempt", "disgust", "fear", "happiness", "neutral", "sadness", "surprise"];

for(var i = 0; i < emotions.length; i++){
    var emoji = new Image();
    emoji.src = "img/"+emotions[i]+".png";
    emoji.onload = function(){};
    emojis[emotions[i]] = emoji;
}

sendToApi(window.location.href.split("?")[1]);

function sendToApi(url){
    var params = {};

    $.ajax({
        url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","5b3909fbfa934bd39ac44ab454a095ea");
        },
        type: "POST",
        data: '{"url": "' + url + '"}',
    })
    .done(function(data) {
        if(data.length !== 0){

            var canvas = document.createElement("canvas");
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(canvas);

            var background = new Image();
            background.src = url;
            background.onload = function(){
                canvas.width = background.width;
                canvas.height = background.height;

                var context = canvas.getContext('2d');

                context.drawImage(background, 0, 0);

                for(var i = 0; i < data.length; i++){
                    var emotion = findEmotion(data[i].scores);
                    var rect = [data[i].faceRectangle.left, data[i].faceRectangle.top, data[i].faceRectangle.width, data[i].faceRectangle.height];
                    context.drawImage(emojis[emotion], rect[0] - rect[2]/4, rect[1] - rect[3]/4, rect[2]*1.5, rect[3]*1.5);
                }

                //console.log(context.getImageData(0,0,256,256));
            };
        }else{
            console.log("No Face Found");
        }

    })
    .fail(function() {
        console.log("error (on microsoft api side lmao)");
    });
}

function findEmotion(scores){
    return Object.keys(scores).reduce(function(a, b){ return scores[a] > scores[b] ? a : b });
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
