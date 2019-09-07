require 'rails_helper'
describe Message do
  describe '#create' do

    #メッセージがあれば保存できる
    it "is valid with a body" do
      message = build(:message,image: nil)
      expect(message).to be_valid
    end

    #画像があれば保存できる
    it "is valid with a image" do
      message = build(:message,body: nil)
      expect(message).to be_valid
    end

    #メッセージと画像があれば保存できる
    it "is valid with a body && image" do
      message = build(:message)
      expect(message).to be_valid
    end

    #メッセージも画像も無いと保存できない
    it "is invalid without a body && image" do
      message = build(:message,body: nil,image: nil)
      message.valid?
      expect(message.errors[:body]).to include("を入力してください")
    end

    #group_idが無いと保存できない
    it "is invalid without a group_id" do
      message = build(:message,group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end

    #user_idが無いと保存できない
    it "is invalid without a user_id" do
      message = build(:message,user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end












  end
end