$(document).on("turbolinks:load",function(){
  function get_user(user){
    const get_user_content=`<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
            </div>`;
    user_serch_result.append(get_user_content)}
    

  function no_user(message){
    const no_user_content=`<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${message}</p>
            </div>`;
    user_serch_result.append(no_user_content)}

  


  function add_user(user_name,user_id){const add_user_content=`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                            <input name='group[user_ids][]' type='hidden' value='${user_id}'>\n
                            <p class='chat-group-user__name'>${user_name}</p>
                            <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                          </div>`;
  $(".js-add-user").append(add_user_content)}
    
  let user_ids=[];
  const user_serch_result=$("#user-search-result");

  $("#user-search-field").on("input",function(n){
    n.preventDefault();
    const keyword=$("#user-search-field").val();
    0!=keyword.length?
    $.ajax({type:"GET",url:"/users",dataType:"json",data:{keyword:keyword,user_ids:user_ids}})

    .done(
      function(users){
        user_serch_result.empty(),
        0!==users.length?
          users.forEach(function(user){get_user(user)})
          :no_user("一致するユーザーが見つかりません")
      }
    )
    .fail(
      function(){
        alert("ユーザー検索に失敗しました")
      }
    ):
    user_serch_result.empty()
  }),


  user_serch_result.on("click",".chat-group-user__btn--add",function(){
    const user_name=$(this).attr("data-user-name"),user_id=$(this).attr("data-user-id");
    user_ids.push(user_id),
    $(this).parent().remove(),
    add_user(user_name,user_id)
  }),
    
    
  $(".js-add-user").on("click",".js-remove-btn",function(){
    const user_id=$(this).siblings("input").val();
    user_ids = user_ids.filter(filter_target => filter_target != user_id),
    $(this).parent().remove()
  })
});










