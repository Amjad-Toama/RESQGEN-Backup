import { Box, Typography, TextField, Button } from "@mui/material";

const OpenQuestionTemplate = ({ questions }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection:'column', gap:2, width: '90%', margin: '0 auto', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' , borderRadius: '15px', padding: '20px' }}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', paddingBottom:2}}>
                <Typography>שאלה</Typography>
                <Box p={2} border="1px solid #ccc" borderRadius="8px" bgcolor="#f9f9f9">
                    {questions.question}
                </Box>
                <Typography>הסבר</Typography>
                <Box p={2} border="1px solid #ccc" borderRadius="8px" bgcolor="#f9f9f9">
                    {questions.explanation}
                </Box>
                <Typography>פתרון</Typography>
                <Box p={2} border="1px solid #ccc" borderRadius="8px" bgcolor="#f9f9f9">
                    {questions.solution}
                </Box>
            </Box>
            <Box>
                <Typography>משוב</Typography>
                <TextField
                        fullWidth
                        placeholder=""
                        name="Feedback"
                        margin="normal"
                        multiline
                        resizable
                        rows={3}
                        sx={{
                            '& textarea': {
                                resize: 'vertical',
                            },
                        }}
                    />
            </Box>
            <Box sx={{display:"flex", justifyContent:"space-between", gap:2, width:'100%'}}>
                <Button sx={{ flex:1}} variant="contained" color="primary">שמור</Button>
                <Button sx={{ flex:1}} variant="outlined" color="primary">צור מחדש</Button>
            </Box>
        </Box>
    );
}

export default OpenQuestionTemplate;