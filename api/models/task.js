
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

    static create(text, day, reminder){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let taskData = await db.collection('tasks').insertOne({ text, day, reminder })
                let newTask = new Task(taskData.ops[0]);
                resolve (newTask);
            } catch (err) {
                reject('Error creating dog');
            }
        });
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let taskData = await db.collection('tasks').find({ _id: ObjectId(id) }).toArray()
                let task = new Task({...taskData[0], id: taskData[0]._id});
                resolve (task);
            } catch (err) {
                reject('Task not found');
            }



        });


        
    }

    update() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
            
                let updatedTaskData = await db.collection('tasks').findOneAndUpdate({ _id: ObjectId(this.id) }, { $set: {reminder: !this.reminder }}, { returnOriginal: false })
                let updatedTask = new Task(updatedTaskData.value);

                resolve ('Task updated');


            } catch (err) {
                console.log(err)
                reject('Error updating Task');
            }
        });
    }
    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const db = await init();
                await db.collection('tasks').deleteOne({ _id: ObjectId(this.id) })
                resolve('Task was deleted')
            } catch (err) {
                reject('Task could not be deleted')
            }
        })
    }



}



module.exports = Task;
