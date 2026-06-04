import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import userService from "../../services/userService";
import { useAuth } from "../../components/common/AuthContext";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Login: React.FC = () => {
  const authContext = useAuth();
  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<yup.InferType<typeof schema>> = async (
    data
  ) => {
    const { access_token } = await userService.login(data.email, data.password);
    authContext.login(access_token);
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm" component={Paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} py={2}>
            <Grid size={12}>
              <TextField
                label="Email"
                slotProps={{ input: { ...register("email") } }}
                fullWidth
                size="small"
                error={formState.errors.email ? true : false}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Password"
                type="password"
                slotProps={{ input: { ...register("password") } }}
                fullWidth
                size="small"
                error={formState.errors.password ? true : false}
              />
            </Grid>
            <Grid size={12} sx={{ textAlign: "right" }}>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default Login;
