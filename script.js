$(document).on("click","#submit",sent);

function sent(){
   var text = $("#query").val();

   if (text ===""){
    alert("what's your question?")
   }else{
    $("#output").append("Me:");
    $("#output").append(text);
    $("#output").append("<br/>");
    $("#query").val("");

    $.ajax({
        url: 'https://api.openai.com/v1/chat/completions',
        crossDomain: true,
        method: 'post',
        headers: {
          'Authorization': 'Bearer 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'
        },
        contentType: 'application/json',
        // data: '{\n    "model": "gpt-3.5-turbo",\n    "messages": [\n      {\n        "role": "system",\n        "content": "You are a helpful assistant."\n      },\n      {\n        "role": "user",\n        "content": "Who won the world series in 2020?"\n      },\n      {\n        "role": "assistant",\n        "content": "The Los Angeles Dodgers won the World Series in 2020."\n      },\n      {\n        "role": "user",\n        "content": "Where was it played?"\n      }\n    ]\n  }',
        data: JSON.stringify({
          'model': 'gpt-3.5-turbo',
          'messages': [
            {
              'role': 'system',
              'content': 'You are a helpful assistant.'
            },
            {
              'role': 'user',
              'content': text
            },
            {
              'role': 'assistant',
              'content': 'refer to the following context'+$("#output").text()
            },
            
          ]
        })
      }).done(function(response) {
var reply = response.choices[0].message.content

        $("#output").append("GPT:");
        $("#output").append(reply);
        $("#output").append("<br/>");
      });

   }
}