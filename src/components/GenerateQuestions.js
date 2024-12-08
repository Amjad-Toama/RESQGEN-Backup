import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";

import { useState } from "react";

const GenerateQuestions = () => {
    const [difficulty, setDifficulty] = useState("Medium");
    const [questionsAmount, setQuestionsAmount] = useState(5);
    const [questionType, setQuestionType] = useState("openQuestion");

    const handleQuestionsAmount = (event) => {
        const value = Number(event.target.value);
        if (value >= 1 && value <= 20)
            setQuestionsAmount(value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection:'column', gap:2, maxWidth: 1000, margin: '0 auto', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' , borderRadius: '15px', padding: '20px' }}>
            <Box sx={{ display: 'flex', gap:2}}>
                <FormControl fullWidth>
                    <InputLabel>רמת קושי</InputLabel>
                    <Select
                        value={difficulty}
                        label={difficulty}
                        onChange={(event) => {setDifficulty(event.target.value)}}
                    >
                        <MenuItem value="Easy">קל</MenuItem>
                        <MenuItem value="Medium">בינוני</MenuItem>
                        <MenuItem value="Advanced">מתקדם</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="מספר שאלות"
                    type="number"
                    value={questionsAmount}
                    onChange={handleQuestionsAmount}
                    fullWidth
                />
            </Box>
            <Box>
                <Typography>סוג השאלות</Typography>
                <FormControl>
                    <RadioGroup name="questions-type" defaultValue="openQuestion" onChange={(event) => {setQuestionType(event.target.value)}} row>
                        <FormControlLabel value="openQuestion" control={<Radio />} label="שאלות פתוחות"/> 
                        <FormControlLabel value="multipleChoice" control={<Radio />} label="רב-ברירה"/>
                        <FormControlLabel value="trueFalse" control={<Radio />} label="נכון\לא נכון"/>
                    </RadioGroup>
                </FormControl>
            </Box>
            <Button variant="contained">צור שאלות</Button>
        </Box>
    );
};

export default GenerateQuestions;