import axios from "./axios";

export const getTasksRequest = async () => axios.get("/tasks");

export const createTaskRequest = async (task) => axios.post("/tasks", task);

/* export const updateTaskRequest = async (task) =>
  axios.put(`/tasks/${task._id}`, task); */

export const updateTaskRequest = async (task) => {
  if (!task._id) {
    console.error("El ID de la tarea no está definido en el objeto task.");
    return;
  }

  return axios.put(`/tasks/${task._id}`, task);
};

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);
