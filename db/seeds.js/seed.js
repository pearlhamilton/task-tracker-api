const db = connect("mongodb://localhost:27017/task-tracker")


db.tasks.drop()


db.tasks.insertMany([
    { text: "Walk the dog", day: "Tuesday 10th 2020", reminder: false },
    
])

