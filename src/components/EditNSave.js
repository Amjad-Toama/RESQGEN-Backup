import { Box } from "@mui/material";
// import TrueFalseTemplate from "./TrueFalseTemplate";
// import MultichoiceTemplate from "./MultichoiceTemplate";
import OpenQuestionTemplate from "./OpenQuestionTemplate";
import { useQuestions } from "../contexts/QuestionsContext";

const EditNSave = () => {
    const { questions } = useQuestions();

    return (
        <Box sx={{ display: 'flex', flexDirection:'column', gap:2, maxWidth: 1000, margin: '0 auto', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' , borderRadius: '15px', padding: '40px' }}>
            {/* <TrueFalseTemplate /> */}
            <OpenQuestionTemplate questions={questions}/>
            {/* <MultichoiceTemplate /> */}
        </Box>
    );
}

export default EditNSave;