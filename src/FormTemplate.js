import React, { useState } from "react";
import Anthropic from '@anthropic-ai/sdk';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Switch,
  Button,
  Divider,
  Slider,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { generateQuestionPrompt, regenerateQuestionPrompt } from "./prompts";

const FormTemplate = () => {
  // APIKey Definition.
  const [apiKey, setApiKey] = useState('');

  // Define Anthropic Object to communicate through it with Anthropic API.
  const client = new Anthropic({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  // Handle the APIKey Change.
  const handleApiKeyChange = (event) => {
    const newApiKey = event.target.value;
    setApiKey(newApiKey);
    client.apiKey = newApiKey;
  };

  // Form data that is needed to send question generetion request.
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    materialText: "",
    isMultipleChoice: false,
  });

  const [question, setQuestion] = useState('');
  const [explanation, setExplanation] = useState('');
  const [solution, setSolution] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answersAmount, setAnswersAmount] = useState(2);  

  const [feedback, setFeedback] = useState("");

  // Handle each change with respect to the form data.
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle the multi answers amount.
  const handleAnswersAmount = (event, newValue) => {
    setAnswersAmount(newValue);
  };

  // Generate new question method.
  const handleSubmit = async () => {
    // Initialize the fields.
    setQuestion('');
    setExplanation('');
    setError(null);
    setLoading(true);
    // Create prompt.
    const prompt = generateQuestionPrompt(formData, answersAmount);
    try {
      // Send a request to generate new question.
      const message = await client.messages.create({
        max_tokens: 1024, // Adjust as needed
        messages: [{ role: 'user', content: prompt }],
        model: 'claude-3-opus-20240229',
      });
      // Extract the data from the response.
      extractQuestionAndExplanation(message.content[0].text)
    } catch (err) {
      console.error(err);
      setError('Failed to fetch response. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Regenerate a question based-on feedback.
  const handleRegenerate = async () => {
    // Initialize the fields.
    setQuestion('');
    setExplanation('');
    setError(null);
    setLoading(true);
    // Create prompt.
    const promptFeedback = regenerateQuestionPrompt(formData, question, feedback, answersAmount);

    try {
      // Send a request to generate new question.
      const message = await client.messages.create({
        max_tokens: 1024, // Adjust as needed
        messages: [{ role: 'user', content: promptFeedback }],
        model: 'claude-3-opus-20240229',
      });
      // Extract the data from the response.
      extractQuestionAndExplanation(message.content[0].text)
    } catch (err) {
      console.error(err);
      setError('Failed to fetch response. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // The extraction data method given a response.
  const extractQuestionAndExplanation = (text) => {
    const questionMatch = text.match(/<exam_question>([\s\S]*?)<\/exam_question>/);
    const explanationMatch = text.match(/<explanation>([\s\S]*?)<\/explanation>/);
    const solutionMatch = text.match(/<solution>([\s\S]*?)<\/solution>/);
  
    const extractedQuestion = questionMatch ? questionMatch[1].trim() : null;
    const extractedExplanation = explanationMatch ? explanationMatch[1].trim() : null;
    const extractedSolution = solutionMatch ? solutionMatch[1].trim() : null;
  
    // Update the state
    setQuestion(extractedQuestion);
    setExplanation(extractedExplanation);
    setSolution(extractedSolution);
  };

  // Right-to-Left Layout.
  const theme = 
    createTheme({
      direction: 'rtl',
      typography: {
        fontFamily: "'Arial', 'Roboto', sans-serif", // Hebrew-compatible fonts
      },
  });

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box p={3} dir="rtl">
          <Typography variant="h5" gutterBottom>
            מפתח API
          </Typography>
          <TextField
            fullWidth
            label="מפתח API"
            name="apiKey"
            value={apiKey}
            onChange={handleApiKeyChange}
            margin="normal"
          />
          <Grid container spacing={4}>
            {/* Right Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                מחולל שאלות
              </Typography>
              <TextField
                fullWidth
                label="כותרת"
                name="title"
                value={formData.title}
                onChange={handleChange}
                margin="normal"
                sx={{ textAlign: 'right' }}
              />
              <TextField
                fullWidth
                label="תיאור"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
                sx={{ textAlign: 'right' }}
              />
              <TextField
                fullWidth
                label="טקסט חומר"
                name="materialText"
                value={formData.materialText}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
                sx={{ textAlign: 'right' }}
              />
              <Box display="flex" alignItems="center" mt={2}>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  שאלות רב-ברירה?
                </Typography>
                <Switch
                  name="isMultipleChoice"
                  checked={formData.isMultipleChoice}
                  onChange={handleChange}
                />
              </Box>
              {formData.isMultipleChoice && (
                <Slider
                  value={answersAmount}
                  onChange={handleAnswersAmount}
                  min={2}
                  max={10}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                    { value: 6, label: '6' },
                    { value: 7, label: '7' },
                    { value: 8, label: '8' },
                    { value: 9, label: '9' },
                    { value: 10, label: '10' },
                  ]}
                  sx={{ mt: 4 }}
                />
              )}
              <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                שלח
              </Button>
            </Grid>

            {/* Left Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                שאלה
              </Typography>
              <Box p={2} border="1px solid #ccc" borderRadius="8px" bgcolor="#f9f9f9">
                {loading ? (
                  <Typography>טוען...</Typography>
                ) : error ? (
                  <Typography>{error}</Typography>
                ) : (
                  question && <Typography>{question}</Typography>
                )}
              </Box>
              <Typography variant="h6" gutterBottom>
                הסבר
              </Typography>
              <Box p={2} border="1px solid #ccc" borderRadius="8px" bgcolor="#f9f9f9">
                {loading ? (
                  <Typography>טוען...</Typography>
                ) : error ? (
                  <Typography>{error}</Typography>
                ) : (
                  explanation && <Typography>{explanation}</Typography>
                )}
              </Box>
              <Typography variant="h6" gutterBottom>
                פתרון
              </Typography>
              <Box p={2} border="1px solid #ccc" borderRadius="8px" bgcolor="#f9f9f9">
                {loading ? (
                  <Typography>טוען...</Typography>
                ) : error ? (
                  <Typography>{error}</Typography>
                ) : (
                  solution && <Typography>{solution}</Typography>
                )}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">משוב:</Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="הזן את המשוב שלך כאן..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                margin="normal"
              />
              <Box mt={2} display="flex" gap={2}>
                <Button variant="outlined" color="primary" onClick={handleRegenerate}>
                  צור מחדש
                </Button>
                <Button variant="contained" color="primary">
                  שמור והמשך
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default FormTemplate;
