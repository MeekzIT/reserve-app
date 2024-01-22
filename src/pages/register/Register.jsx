import { useEffect, useState } from "react";
import * as Yup from "yup";
import Error from "../../components/error/Error";
import { LanguageSwitcher } from "../../components/languageSwitcher/LanguageSwitcher";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
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
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../../images/JSLogo.svg";
import { loginAction, registerAction } from "../../store/actions/auth-action";

import "./register.css";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../../routing/pats";
import { getCountries } from "../../store/actions/languageAction";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state) => state.lang.countries);
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t("required")),
    lastName: Yup.string().required(t("required")),
    phoneNumber: Yup.string()
      .matches(/^\+\d{11}$/, "Phone number must be 10 digits")
      .required(t("required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("pass-match"))
      .required(t("required")),
    email: Yup.string().email(t("invalid-email")).required(t("required")),
    password: Yup.string().min(8, t("too-short")).required(t("required")),
    countryId: Yup.number().required(t("required")),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <div className="register-box">
      <Container component="main" maxWidth="xs" className="register">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* <img src={logo} alt="logo" /> */}
          <Typography component="h1" variant="h5" mb={1}>
            {t("sign-up")}
          </Typography>
          <Grid container>
            <LanguageSwitcher />
          </Grid>
          <Box sx={{ mt: 1, height: "100%" }}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
                countryId: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dispatch(registerAction(values));
              }}
            >
              {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    variant="filled"
                    label={t("name")}
                    autoComplete="firstName"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <Error message={errors.firstName} />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    variant="filled"
                    label={t("surname")}
                    autoComplete="lastName"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  <Error message={errors.lastName} />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    variant="filled"
                    label={t("phone")}
                    autoComplete="phoneNumber"
                    name="phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                  />
                  <Error message={errors.phoneNumber} />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    variant="filled"
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
                    variant="outlined"
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
                        <InputAdornment position="end" fullWidth>
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
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    variant="outlined"
                    autoComplete="current-password"
                    label={t("password")}
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    type={showConfirm ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" fullWidth>
                          <IconButton onClick={handleToggleConfirm}>
                            {showConfirm ? (
                              <Visibility sx={{ color: "primary.main" }} />
                            ) : (
                              <VisibilityOff sx={{ color: "primary.main" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Error message={errors.confirmPassword} /> <br />
                  <Select
                    fullWidth
                    value={values.countryId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="countryId"
                    displayEmpty
                  >
                    {countries?.map((i) => {
                      return (
                        <MenuItem key={i.id} value={i.id}>
                          {i.name.toUpperCase()}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Error message={errors.countryId} /> <br />
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 4, mb: 2, color: "#008491" }}
                  >
                    {t("sign-up")}
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
              sx={{ m: 1, color: "#008491" }}
              onClick={() => navigate(LOGIN_PAGE)}
            >
              {t("toLogin")}
            </Typography>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterPage;
