json.array! @messages do |message|
  json.body message.body
  json.imageUrl message.image.url
  json.createdAt message.created_at.strftime("%Y-%m-%d %H:%M:%S")
  json.userName message.user.name
  json.id message.id
end