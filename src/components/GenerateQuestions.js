import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { useQuestions } from '../contexts/QuestionsContext';
import { useForm } from "../contexts/FormContext";
import { useTabs } from "../contexts/TabsContext";

const GenerateQuestions = () => {
    const { handleQuestionGeneration } = useQuestions();
    const { formData, setFormData } = useForm();
    const { setTabValue } = useTabs();

    const handleQuestionsAmount = (event) => {
        const value = Number(event.target.value);
        if (value >= 1 && value <= 20)
            setFormData(event);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection:'column', gap:2, maxWidth: 1000, margin: '0 auto', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' , borderRadius: '15px', padding: '20px' }}>
            <Box sx={{ display: 'flex', gap:2}}>
                <FormControl fullWidth>
                    <InputLabel>רמת קושי</InputLabel>
                    <Select
                        name="complexity"
                        value={formData.complexity}
                        label={formData.complexity}
                        onChange={setFormData}
                    >
                        <MenuItem value="easy">קל</MenuItem>
                        <MenuItem value="medium">בינוני</MenuItem>
                        <MenuItem value="advanced">מתקדם</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name="questionsAmount"
                    label="מספר שאלות"
                    type="number"
                    value={formData.questionsAmount}
                    onChange={handleQuestionsAmount}
                    fullWidth
                />
            </Box>
            <Box>
                <Typography>סוג השאלות</Typography>
                <FormControl>
                    <RadioGroup name="questionType" defaultValue={formData.questionType} onChange={setFormData} row>
                        <FormControlLabel value="openEnded" control={<Radio />} label="שאלות פתוחות"/> 
                        <FormControlLabel value="multipleChoice" control={<Radio />} label="רב-ברירה"/>
                        <FormControlLabel value="trueFalse" control={<Radio />} label="נכון\לא נכון"/>
                    </RadioGroup>
                </FormControl>
            </Box>
            <Button onClick={() => {setTabValue(2); handleQuestionGeneration(formData)}} variant="contained">צור שאלות</Button>
        </Box>
    );
};

export default GenerateQuestions;