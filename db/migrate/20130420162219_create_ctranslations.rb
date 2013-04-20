class CreateCtranslations < ActiveRecord::Migration
  def change
    create_table :ctranslations do |t|
      t.text :source
      t.text :translation

      t.timestamps
    end
  end
end
