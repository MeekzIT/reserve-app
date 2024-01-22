import { useState } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { answersData } from "./answers";

const Suport = () => {
  const { t } = useTranslation();
  const initialValues = {
    question: "",
  };
  const validationSchema = Yup.object().shape({
    question: Yup.string().required(t("required")),
  });
  const [expanded, setExpanded] = useState(false);
  const [difrent, setDifrent] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }} m={2}>
        <Typography variant="h4" sx={{ color: "primary.main" }}>
          FAQ
        </Typography>
      </Box>
      <Box pl={2}>
        <Typography sx={{ color: "primary.main" }}>
          Может быть ваш вопрос присутствует в списке !
        </Typography>

        <Typography
          sx={{ color: "primary.main" }}
          onClick={() => setDifrent(!difrent)}
        >
          {difrent ? "Назад" : "Задать вопрос"}
        </Typography>
      </Box>
      {!difrent ? (
        answersData.map((i) => {
          return (
            <Accordion
              expanded={expanded === i.expanded}
              onChange={handleChange(i.expanded)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0, color: "primary.main" }}
                >
                  {i.title}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {i.helper}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{i.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Box p={2}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                name="question"
                as={TextField}
                multiline
                rows={4}
                label="Your Question"
                variant="outlined"
                fullWidth
                placeholder="Type your question here..."
              />
              <Box className="error-message" sx={{ mt: 1 }}>
                <ErrorMessage name="question" />
              </Box>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Form>
          </Formik>
        </Box>
      )}
    </Box>
  );
};

export default Suport;
