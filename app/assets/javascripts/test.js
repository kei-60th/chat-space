$(function(){

  function buildMessage(message){

    if (message.image_url) {
      image_data = `<img class="lower-message__image" src=${message.image_url} alt="19248 en 1" />`
    }
    else {
      image_data = ``
    }

    var html = `<div class='message last'>
                  <div class='message__upper-info'>
                    <p class='message__upper-info__talker'>
                      ${message.user_name}
                    </p>
                    <p class='message__upper-info__date'>
                      ${message.created_at}
                    </p>
                  </div>
                  <p class='message__text'>
                    ${message.body}
                    ${image_data}
                  </p>
                </div>`
    return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $(".messages").append(html)
      $('.input-box__text').val('')
      $('.input-box__image__file').val('')
      $(".messages").animate({scrollTop:$(".messages")[0].scrollHeight},200)
      $(".submit-btn").prop("disabled", false);

    })
    .fail(function(){
      alert('メッセージを入力して下さい');
      $(".submit-btn").prop("disabled", false);
    })
  })
});


