$(function() {

  var buildMessageHTML = function(message) {
    message.imageUrl?image_data = `<img class="lower-message__image" src=${message.imageUrl} alt="19248 en 1" />`:image_data = ``
    

    var html = `<div class='message' data-message-id = ${message.id}>
                  <div class='message__upper-info'>
                    <p class='message__upper-info__talker'>
                      ${message.userName}
                    </p>
                    <p class='message__upper-info__date'>
                      ${message.createdAt}
                    </p>
                  </div>
                  <p class='message__text'>
                    ${message.body}
                  </p>
                    ${image_data}
                </div>`
    return html;
  };

  reloadMessages = function() {
    groupId=$(".main-header__left-box__current-group").data("group-id");
    if (location.pathname==`/groups/${groupId}/messages`){
      
      last_message_id = $(".message:last").data("messageId")
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        messagebox = ''
        messages.forEach(function(message){messagebox = ($(".messages").append(buildMessageHTML(message)))})
        if (messagebox){
          $(".messages").animate({scrollTop:$(".messages")[0].scrollHeight},200)
        }

      })
      .fail(function() {
        alert("自動更新に失敗しました")
      });
    };
  };


    setInterval(reloadMessages, 5000);
  });