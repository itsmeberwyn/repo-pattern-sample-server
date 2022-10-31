const taskModel = require("../models/task.model");

const create_task = async (req, res) => {
  if (!req.body) {
    res.status(401).json({ message: "Invalid request body" });
    return;
  }

  let create = await taskModel.create_task(req.body);

  res.status(200).json({ message: "Task created successfully", data: create });
};

const get_single_task_by_id = async (req, res) => {
  let task = await taskModel.get_single_task_by_id(req.params.id);

  if (task.length == 0) {
    res.status(401).json({ message: "Task not found" });
    return;
  }

  res.status(200).json({ payload: task });
};

const get_tasks = async (req, res) => {
  let tasks = await taskModel.get_tasks();
  res.status(200).json({ payload: tasks });
};

const update_task = async (req, res) => {
  if (!req.body) {
    res.status(401).json({ message: "Invalid request body" });
  }

  let task = await taskModel.update_task(req.body, req.params.id);

  if (task) {
    res.status(200).json({ message: "Task updated successfully" });
    return;
  }

  res.status(400).json({ message: "An error has occurred" });
};

const delete_task = async (req, res) => {
  if (!req.params.id) {
    res.status(401).json({ message: "Invalid params body" });
  }

  let task = await taskModel.delete_task(req.params.id);
  if (task) {
    res.status(200).json({ message: "Task deleted successfully" });
    return;
  }

  res
    .status(400)
    .json({ message: "An error has occurred while deleting task" });
};

module.exports = {
  create_task,
  get_single_task_by_id,
  get_tasks,
  update_task,
  delete_task,
};
