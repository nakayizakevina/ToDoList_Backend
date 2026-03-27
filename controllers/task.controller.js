import {Task} from "../modules/task.module.js";

const createTask = async (req, res) =>{
    try {
        let {title, description} = req.body;

        if(!title || !description){
            return res.status(400).json({message: "All fields are required !"})
        }

        const existingTask = await Task.findOne({title})
        if(existingTask){
            return res.status(400).json({message: "Task already exists..!"})
        }
        
        title = title.toLowerCase().trim();

        
        const createNewTask = await Task.create({
            title,
            description: description.toLowerCase(),
        });

        res.status(201).json({
            message: "Task created successfully",
            task: {
                id:createNewTask._id, 
                description:createNewTask.description, 
                title:createNewTask.title}
        });
    } catch (error) {
        res.status(500).json({message: "Interal server error", error: error.message});
    }
};

const displayAllTask = async(req, res) => {
    
    try {
       const task = await Task.find(); 
       res.status(200).json(task)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        })
    }
}

const displaySingleTask = async (req, res) => {
    try {
        const task = await Task.findOne(req.params.title)
        console.log(req.params.title)
        console.log(task)

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Single task fetched successfully",
            task: task
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
    // try {
    //     const task = await Task.findById(req.params.id);
    //     console.log(req.params.id)
    //     console.log(task)

    //     if (!task) {
    //         return res.status(404).json({
    //             message: "Task not found"
    //         });
    //     }

    //     res.status(200).json({
    //         message: "Single task fetched successfully",
    //         task: task
    //     });

    // } catch (error) {
    //     res.status(500).json({
    //         message: "Internal Server Error",
    //         error: error.message
    //     });
    // }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        console.log(req.params.id)
        console.log(task)

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const editTask = async (req, res) => {
    try {
       if(Object.keys(req.body).length === 0){
        return res.status(400).json({
            message: "No data provided for update"
        });
       };

      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});

      if(!task) return res.status(404).json({
        message: "task not found"
      });

      res.status(200).json({
        message: "Task Updated Successfully", task
      })
      
        
    } catch (error) {
         res.status(500).json({
        message: "Internal Server Error", error
       });
    }
};





export{ 
   createTask,
   displayAllTask,
   displaySingleTask,
   deleteTask,
   editTask

};