class CtranslatesController < ApplicationController
	@@from = 'en'
	@@to = 'fr'
	@@id = nil
	@@is_first = nil

	def index
		@base = Ctranslation.first(:order => "id DESC") 
	end
	
	def create
		@trans = Ctranslation.create
		@@id = @trans.id
		@@is_first = 1
		redirect_to homes_path
	end

	def update
		@text = params[:text]
		#translation magic
		translator = BingTranslator.new('EoinTestTranslation1', 'hNqLMwhxlXVm39j+zi61h45+zWwBooT4W+v5CacLtjs=')
		@translation = translator.translate @text, :from => @@from, :to => @@to
		#@translation = 'silly'
		@base = Ctranslation.first(:order => "id DESC")

		if (@@is_first == 0)
			@source = @base.source
			@sourcetrans = @base.translation
			@base.source = @source + ' ' + @text
			@base.translation = @sourcetrans + ' ' + @translation
		else
			@base.source = @text
			@base.translation = @translation

			@@is_first = 0
		end
		@base.save
		redirect_to homes_path
	end

	def new
		@trans = Ctranslation.first(:order => "id DESC")
		render :partial => "transbox"
	end

	def destroy
		@trans = Ctranslation.find(:all)
		@trans.each {|p| p.destroy}
		redirect_to homes_path
	end
end
