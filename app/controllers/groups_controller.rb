class GroupsController < ApplicationController
  def new
    @group = Group.new
  end

  def create
    Group.create(create_params)
    redirect_to controller: :posts, action: :index
  end

  def edit
  end


  def update
  end

  private
  def create_params
    params.require(:group).permit(:name)
  end

end