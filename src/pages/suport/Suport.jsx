import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getAnswers, sendQuestion } from "../../store/actions/suportAction";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../routing/pats";
import HistoryIcon from "@mui/icons-material/History";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Suport = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.suport.answers);
  const initialValues = {
    question: "",
  };
  const validationSchema = Yup.object().shape({
    question: Yup.string().required(t("required")),
  });
  const [expanded, setExpanded] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [difrent, setDifrent] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleChangeAnswer = (panel) => (event, isExpanded) => {
    setAnswer(isExpanded ? panel : false);
  };
  const handleSubmit = (values, { resetForm }) => {
    dispatch(sendQuestion(values, "Спасибо! мы свяжемся с Bами!"));
    navigate(HOME_PAGE);
  };
  useEffect(() => {
    dispatch(getAnswers());
  }, []);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }} m={2}>
        <Typography variant="h4" sx={{ color: "primary.main" }}>
          FAQ
        </Typography>
      </Box>
      <Box pl={2}>
        <Typography
          sx={{
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          onClick={() => setShowHistory(!showHistory)}
        >
          {" "}
          {showHistory ? (
            <ArrowBackIcon sx={{ color: "promary.main" }} />
          ) : (
            <HistoryIcon sx={{ color: "promary.main" }} />
          )}
          {showHistory ? t("back") : "History"}
        </Typography>
        {!showHistory && (
          <>
            <Typography sx={{ color: "primary.main" }}>
              Может быть ваш вопрос присутствует в списке !
            </Typography>

            <Typography
              sx={{ color: "primary.main" }}
              onClick={() => setDifrent(!difrent)}
            >
              {difrent ? (
                <ArrowBackIcon sx={{ color: "promary.main" }} />
              ) : (
                "Задать вопрос"
              )}
            </Typography>
          </>
        )}
      </Box>
      {showHistory ? (
        <Box>
          {data.map((i) => {
            return (
              <Accordion
                key={i.id}
                expanded={answer === i.id}
                onChange={handleChangeAnswer(i.id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      color: "primary.main",
                    }}
                  >
                    {i.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{i.answer ? i.answer : "no answer"}</Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {i?.createdAt.slice(0, 10)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      ) : (
        <Box>
          {!difrent ? (
            answersData.map((i) => {
              return (
                <Accordion
                  key={i.expanded}
                  expanded={expanded === i.expanded}
                  onChange={handleChange(i.expanded)}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: "primary.main" }} />
                    }
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography
                      sx={{
                        width: "33%",
                        flexShrink: 0,
                        color: "primary.main",
                      }}
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
      )}
    </Box>
  );
};

export default Suport;
