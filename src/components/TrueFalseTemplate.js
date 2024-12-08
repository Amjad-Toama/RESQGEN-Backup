import { Box, Typography, TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const TrueFalseTemplate = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection:'column', gap:2, width: '90%', margin: '0 auto', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' , borderRadius: '15px', padding: '20px' }}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', paddingBottom:2}}>
                <Typography>שאלה</Typography>
                <Box p={2} border="1px solid #ccc" borderRadius="8px" bgcolor="#f9f9f9">

                </Box>
                <Typography>הסבר</Typography>
                <Box p={2} border="1px solid #ccc" borderRadius="8px" bgcolor="#f9f9f9">
                    
                </Box>
                <Typography>פתרון</Typography>
                <Box p={2} border="1px solid #ccc" borderRadius="8px" bgcolor="#f9f9f9">
                    
                </Box>
            </Box>
            <Box sx={{borderBottom: 1, borderColor: 'divider', paddingBottom:2}}>
                <Typography>תשובות אפשריות</Typography>
                <FormControl>
                    <RadioGroup>
                        <FormControlLabel value="answer-1" control={<Radio />} label="נכון"/> 
                        <FormControlLabel value="answer-2" control={<Radio />} label="לא נכון"/>
                    </RadioGroup>
                </FormControl>
                <Typography>משוב לתלמיד על התשובה</Typography>
                <TextField disabled fullWidth></TextField>
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

export default TrueFalseTemplate;