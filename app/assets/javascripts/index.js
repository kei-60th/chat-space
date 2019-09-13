$(document).on("turbolinks:load",function(){
  function getUser(user){
    const getUserContent=`<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
            </div>`;
    userSerchResult.append(getUserContent)}
    

  function noUser(message){
    const noUserContent=`<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${message}</p>
            </div>`;
    userSerchResult.append(noUserContent)}

  


  function addUser(userName,userId){const addUserContent=`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${userId}'>
                            <input name='group[userIds][]' type='hidden' value='${userId}'>\n
                            <p class='chat-group-user__name'>${userName}</p>
                            <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                          </div>`;
  $(".js-add-user").append(addUserContent)}
    
  let userIds=[];
  const userSerchResult=$("#user-search-result");

  $("#user-search-field").on("input",function(n){
    n.preventDefault();
    const keyword=$("#user-search-field").val();
    0!=keyword.length?
    $.ajax({type:"GET",url:"/users",dataType:"json",data:{keyword:keyword,userIds:userIds}})

    .done(
      function(users){
        userSerchResult.empty(),
        0!==users.length?
          users.forEach(function(user){getUser(user)})
          :noUser("一致するユーザーが見つかりません")
      }
    )
    .fail(
      function(){
        alert("ユーザー検索に失敗しました")
      }
    ):
    userSerchResult.empty()
  }),


  userSerchResult.on("click",".chat-group-user__btn--add",function(){
    const userName=$(this).attr("data-user-name"),userId=$(this).attr("data-user-id");
    userIds.push(userId),
    $(this).parent().remove(),
    addUser(userName,userId)
  }),
    
    
  $(".js-add-user").on("click",".js-remove-btn",function(){
    const userId=$(this).siblings("input").val();
    userIds = userIds.filter(filterTarget => filterTarget != userId),
    $(this).parent().remove()
  })
});










