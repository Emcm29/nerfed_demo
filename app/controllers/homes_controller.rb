class HomesController < ApplicationController
	def index
		#translator = BingTranslator.new('EoinTestTranslation1', 'hNqLMwhxlXVm39j+zi61h45+zWwBooT4W+v5CacLtjs=')
		#@spanish = translator.translate 'Hello. This will be translated!', :from => 'en', :to => 'es'
		@translation = 'insert translation here'
	end

	def show
		@base = Ctranslation.first(:order => "id DESC") 
	end

	def new
		@base = Ctranslation.first(:order => "id DESC")
		render :partial => "shown"
	end
end
