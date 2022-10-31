const connection = require("../config/connection.config.js");

const get_tasks = async () => {
  try {
    var [rows, fields] = await connection
      .promise()
      .query("SELECT * FROM tasks");
    return rows;
  } catch (err) {
    return null;
  }
};

const get_single_task_by_id = async (id) => {
  try {
    var [rows, fields] = await connection
      .promise()
      .query("SELECT * FROM tasks WHERE id=?", id);
    return rows;
  } catch (err) {
    return null;
  }
};

const create_task = async ({ title, description }) => {
  try {
    var [rows, fields] = await connection
      .promise()
      .query("INSERT INTO tasks(title, description) VALUES (?,?)", [
        title,
        description,
      ]);
    return rows.insertId;
  } catch (err) {
    return null;
  }
};

const update_task = async ({ title, description }, id) => {
  try {
    var [rows, fields] = await connection
      .promise()
      .query("UPDATE tasks SET title=?, description=? WHERE id=?", [
        title,
        description,
        id,
      ]);

    return rows;
  } catch (err) {
    return null;
  }
};

const delete_task = async (id) => {
  try {
    var [rows, fields] = await connection
      .promise()
      .query("DELETE FROM tasks WHERE id=?", id);
    return rows;
  } catch (err) {
    return null;
  }
};

module.exports = {
  get_tasks,
  get_single_task_by_id,
  create_task,
  update_task,
  delete_task,
};
