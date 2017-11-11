$(function() {
    var params = {};

    $.ajax({
        url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","5b3909fbfa934bd39ac44ab454a095ea");
        },
        type: "POST",
        data: '{"url": "https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/05/12/104466932-PE_Color.240x240.jpg?v=1494613853"}',
    })
    .done(function(data) {
        console.log(data);
    })
    .fail(function() {
        console.log("error (on microsoft api side lmao)");
    });
});
