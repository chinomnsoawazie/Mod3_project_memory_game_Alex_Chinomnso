# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


alex = User.create(username: "alex2019", password: "flatiron")
chinomnso = User.create(username: "chinomnso", password: "dumbo")

game1 = Game.create(points: 50, level: 2, winstatus: true, user_id: chinomnso.id)
game2 = Game.create(points: 5, level: 3, winstatus: false, user_id: alex.id)

puts "++++++++++++++++++"
puts "Successfully Seeded"
puts "++++++++++++++++++++"
