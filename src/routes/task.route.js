const router = require("express").Router();
const taskController = require("../controllers/task.controller");

router.get("/", taskController.get_tasks);
router.get("/:id", taskController.get_single_task_by_id);
router.post("/", taskController.create_task);
router.put("/:id", taskController.update_task);
router.delete("/:id", taskController.delete_task);

module.exports = router;
