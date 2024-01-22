import { useState } from "react";
import * as Yup from "yup";
import Error from "../../components/error/Error";
import { LanguageSwitcher } from "../../components/languageSwitcher/LanguageSwitcher";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../../images/JSLogo.svg";
import { loginAction } from "../../store/actions/auth-action";

import "./login.css";
import { useNavigate } from "react-router-dom";
import { REGISTER_PAGE } from "../../routing/pats";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("invalid-email")).required(t("required")),
    password: Yup.string().min(8, t("too-short")).required(t("required")),
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login-box">
      <Container component="main" maxWidth="xs" className="login">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="logo" />
          <Typography component="h1" variant="h5" mb={1}>
            {t("sign-in")}
          </Typography>
          <Grid container>
            <LanguageSwitcher />
          </Grid>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dispatch(loginAction(values));
              }}
            >
              {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label={t("email")}
                    autoComplete="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <Error message={errors.email} />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="current-password"
                    label={t("password")}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword}>
                            {showPassword ? (
                              <Visibility sx={{ color: "primary.main" }} />
                            ) : (
                              <VisibilityOff sx={{ color: "primary.main" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Error message={errors.password} /> <br />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, color: "white" }}
                  >
                    {t("sign-in")}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              // width: "50%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              sx={{ m: 1, color: "primary.main" }}
              onClick={() => navigate(REGISTER_PAGE)}
            >
              {t("toRegister")}
            </Typography>
          </div>
          {/* <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography>asdas</Typography>
          </div> */}
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
