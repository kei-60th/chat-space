json.userName @message.user.name
json.createdAt @message.created_at.strftime("%Y-%m-%d %H:%M:%S")
json.body @message.body
json.id @message.id
json.imageUrl @message.image.url