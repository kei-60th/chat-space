class Message < ApplicationRecord
  mount_uploader :image, ImagesUploader
  belongs_to :group
  belongs_to :user
  
  validates :body, presence: true, unless: :image?
end
