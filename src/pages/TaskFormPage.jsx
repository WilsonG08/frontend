// En tu función onSubmit en TaskFormPage.jsx
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const taskData = {
        ...data,
        date: dayjs.utc(data.date).format(),
      };
  
      if (params.id) {
        // Obtén la tarea existente
        const task = await getTask(params.id);
  
        // Asegúrate de que el _id esté definido en la tarea
        if (task && task._id) {
          await updateTask(params.id, {
            ...taskData,
            _id: task._id, // Asegúrate de que el _id esté definido
          });
        } else {
          console.error("No se encontró el ID de la tarea.");
        }
      } else {
        await createTask(taskData);
      }
  
      navigate("/tasks");
    } catch (error) {
      console.error(error);
      // Maneja errores aquí según tu flujo de la aplicación
    }
  };
  
  
  
  

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        if (task && task._id) { // Verifica que task y task._id estén definidos
          setValue("title", task.title);
          setValue("description", task.description);
          setValue(
            "date",
            task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
          );
          setValue("completed", task.completed);
        } else {
          console.error("No se encontró el ID de la tarea.");
        }
      }
    };
  
    loadTask();
  }, []);
  
  

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />
        <Button>Save</Button>
      </form>
    </Card>
  );
}
