class HomesController < ApplicationController
	def index
		@base = Ctranslation.first(:order => "id DESC")
	end

	def show
		@base = Ctranslation.first(:order => "id DESC") 
	end

	def new
		@base = Ctranslation.first(:order => "id DESC")
		render :partial => "source"
	end

	def edit
		
	end

end
