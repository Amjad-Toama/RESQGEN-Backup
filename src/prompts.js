export const generateQuestionPrompt = (formData) => `
    You are an AI assistant tasked with creating exam questions based on given course material in hebrew. Your goal is to generate high-quality questions that effectively test understanding of the material.

    First, carefully read and analyze the following course material and the highlights and guidelines:

    <course_material>
    ${formData.materialText}
    </course_material>

    <highlights_guidelines>
    ${formData.highlightsNGuidelines}
    <highlights_guidelines>

    Based on this material, you will create ${formData.questionsAmount} exam questions as specified by the user. The user will provide two parameters:

    1. Question type: This will be either "multiple choice", "open-ended", or "true-false"
    2. Number of questions.
    3. Questions complexity 'easy', 'medium', or 'advanced'.

    Here are your instructions:

    1. Generate exam questions in hebrew:
        - If the question type is "multiple choice", create a question with four options. Ensure that only one option is correct.
        - If the question type is "true false", create a question that requires thinking. Ensure that only one option is true and the other false.
        - If the question type is "open-ended", create a question that requires a detailed written response.
        - Ensure that the questions are challenging and require critical thinking, not just memorization of facts.

    2. Provide an explanation in hebrew:
        - For each question, explain what specific knowledge or skills from the course material the question is testing.
        - Discuss how the question relates to key concepts or learning objectives from the material.

    3. Provide a solution in hebrew:
        - For multiple choice questions, indicate the correct answer and explain why it is correct. Also, briefly explain why the other options are incorrect.
        - For true false questions, indicate teh correct answer and explain why it is true. Also, briefly explain why the other statement is false.
        - For open-ended questions, provide a model answer that would receive full marks. Explain the key points that should be included in a high-scoring response.

    Format your output as follows:
    
    <exam_question>
    [Insert the exam question here. For multiple choice, include all answer options each option on newline.]
    </exam_question>

    <explanation>
    [Insert your explanation of what the question tests here.]
    </explanation>

    <solution>
    [Insert the solution and explanation here.]
    </solution>

    Remember to tailor the difficulty and complexity of the questions to match the level of the course material provided. Aim to create questions that not only test recall but also understanding, application, and analysis of the material.

    The questions type: ${formData.questionType}
    The amount of questions ${formData.questionsAmount}
    The questions complexity ${formData.complexity}

    Please generate one exam question based on these specifications.
`;

export const regenerateQuestionPrompt = (formData, question, feedback) => `
    You are tasked with improving an exam question based on provided course material and feedback in hebrew. Follow these steps carefully:

    1. Review the following course material:
    <course_material>
    ${formData.materialText}
    </course_material>

    2. Examine the original exam question:
    <original_question>
    ${question}
    </original_question>

    3. Consider the feedback provided:
    <feedback>
    ${feedback}
    </feedback>

    4. Analyze the course material, original question, and feedback:
    a. Identify key concepts from the course material that should be tested
    b. Evaluate how well the original question aligns with these concepts
    c. Consider how the feedback suggests the question could be improved

    5. Write a better exam question in hebrew that:
    a. Addresses the key concepts from the course material more effectively
    b. Incorporates the suggestions from the feedback
    c. Maintains an appropriate difficulty level for the course
    d. Is clear, concise, and unambiguous
    e. If the question type is "multiple choice", create a question with the specified number of answer options. Ensure that only one option is correct.
    f. If the question type is "open-ended", create a question that requires a detailed written response.

    6. Provide an explanation in hebrew:
    - For each question, explain what specific knowledge or skills from the course material the question is testing.
    - Discuss how the question relates to key concepts or learning objectives from the material.

    7. Provide a solution in hebrew:
    - For multiple choice questions, indicate the correct answer and explain why it is correct. Also, briefly explain why the other options are incorrect.
    - For open-ended questions, provide a model answer that would receive full marks. Explain the key points that should be included in a high-scoring response.

    8. Present your response in the following format:
    <exam_question>
    [Insert the exam question here. For multiple choice, include all answer options each option on newline.]
    </exam_question>

    <explanation>
    [Insert your explanation of what the question tests here.]
    </explanation>

    <solution>
    [Insert the solution and explanation here.]
    </solution>

    Remember to tailor the difficulty and complexity of the questions to match the level of the course material provided. Aim to create questions that not only test recall but also understanding, application, and analysis of the material.

    The multiple answers question: ${formData.isMultipleChoice}
    The number of answers (for multiple choice only) is:

    Ensure that your improved question is substantively different from the original while still testing the same core concepts. Be creative in your approach, but remain focused on the course material and the goals of the exam.
`;