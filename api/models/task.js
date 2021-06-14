
const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')

class Task {
    constructor(data){
        this.id = data.id
        this.text = data.text
        this.day = data.day
        this.reminder = data.reminder
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                const tasksData = await db.collection('tasks').find().toArray()
                const tasks = tasksData.map(t => new Task({ ...t, id: t._id }))
                resolve(tasks);
            } catch (err) {
                console.log(err);
                reject("Error retrieving tasks")
            }
        })
    }

}



module.exports = Task;
