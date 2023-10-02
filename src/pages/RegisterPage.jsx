import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {Array.isArray(registerErrors) && registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-3xl font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            name="username"
            placeholder="Write your name"
            {...register("username")}
            autoFocus
          />
          {formErrors.username?.message && (
            <p className="text-red-500">{formErrors.username?.message}</p>
          )}

          <Label htmlFor="email">Email:</Label>
          <Input
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email")}
          />
          {formErrors.email?.message && (
            <p className="text-red-500">{formErrors.email?.message}</p>
          )}

          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
          />
          {formErrors.password?.message && (
            <p className="text-red-500">{formErrors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirm Password:</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {formErrors.confirmPassword?.message && (
            <p className="text-red-500">{formErrors.confirmPassword?.message}</p>
          )}
          <Button>Submit</Button>
        </form>
        <p>
          Already Have an Account?
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
