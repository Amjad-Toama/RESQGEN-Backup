import React, { createContext, useContext, useState } from 'react';
import { generateQuestionPrompt } from "../prompts";
import { useClient } from './ClientContext';

// Create a Context
const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [questions, setQustions] = useState({
    question: '',
    explanation: '',
    solution: '',
  });

  const { client } = useClient();

  const resetFields = () => {
    setQustions({
        question: '',
        explanation: '',
        solution: '',
    });
  };

  // The extraction data method given a response.
  const extractQuestionAndExplanation = (text) => {
    const questionMatch = text.match(/<exam_question>([\s\S]*?)<\/exam_question>/);
    const explanationMatch = text.match(/<explanation>([\s\S]*?)<\/explanation>/);
    const solutionMatch = text.match(/<solution>([\s\S]*?)<\/solution>/);
  
    const extractedQuestion = questionMatch ? questionMatch[1].trim() : null;
    const extractedExplanation = explanationMatch ? explanationMatch[1].trim() : null;
    const extractedSolution = solutionMatch ? solutionMatch[1].trim() : null;
    console.log(extractedQuestion)
    console.log(extractedExplanation)
    console.log(extractedSolution)
    // Update the state
    setQustions({
      question: extractedQuestion,
      explanation: extractedExplanation,
      solution: extractedSolution,
    });
    console.log(questions.question)
    console.log(questions.explanation)
    console.log(questions.solution)
  };

  // Generate new question method.
  const handleQuestionGeneration = async (formData) => {
    // Initialize the fields.
    resetFields();
    // setError(null);
    // setLoading(true);
    // Create prompt.
    const prompt = generateQuestionPrompt(formData);
    try {
      // const response = await fetch
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
      // setError('Failed to fetch response. Please try again later.');
    } finally {
      // setLoading(false);
    }
  };

  // // Regenerate a question based-on feedback.
  // const handleRegenerate = async () => {
  //   // Initialize the fields.
  //   setQuestion('');
  //   setExplanation('');
  //   setError(null);
  //   setLoading(true);
  //   // Create prompt.
  //   const promptFeedback = regenerateQuestionPrompt(formData, question, feedback);

  //   try {
  //     // Send a request to generate new question.
  //     const message = await client.messages.create({
  //       max_tokens: 1024, // Adjust as needed
  //       messages: [{ role: 'user', content: promptFeedback }],
  //       model: 'claude-3-opus-20240229',
  //     });
  //     // Extract the data from the response.
  //     extractQuestionAndExplanation(message.content[0].text)
  //   } catch (err) {
  //     console.error(err);
  //     setError('Failed to fetch response. Please try again later.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <QuestionsContext.Provider value={{ questions, setQustions, handleQuestionGeneration }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  return useContext(QuestionsContext);
};
