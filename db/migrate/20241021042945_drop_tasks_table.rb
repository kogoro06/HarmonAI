class DropTasksTable < ActiveRecord::Migration[6.0]
  def up
    drop_table :tasks
  end

  def down
    create_table :tasks do |t|
      t.string :name
      t.timestamps
    end
  end
end
