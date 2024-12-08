import { Box, Button, TextField } from "@mui/material";

const UploadMaterials = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection:'column', gap:2, maxWidth: 1000, margin: '0 auto', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' , borderRadius: '15px', padding: '20px' }}>
            <TextField
                fullWidth
                label="חומר לימוד"
                placeholder="הכנס את החומר הלימודי כאן..."
                name="materialText"
                // value={formData.materialText}
                // onChange={handleChange}
                margin="normal"
                multiline
                rows={5}
                sx={{
                    '& .MuiInputBase-root': {
                        resize: 'vertical',
                        overflow: 'auto',
                    }
                }}  
            />
            <TextField
                fullWidth
                label="דגשים והנחיות ליצירה"
                placeholder="למשל: 'התמקד במטרת למידה X הוסף הנחיות ספציפיות ליצירת השאלות' או 'שים דגש על נושא Y' "
                name="materialText"
                margin="normal"
                multiline
                resizable
                rows={3}
                sx={{
                    '& .MuiInputBase-root': {
                        resize: 'vertical',
                        overflow: 'auto',
                    }
                }}  
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                >
                    המשך ליצירת שאלות
                </Button>
                <Button
                    variant="outlined"
                    sx={{ mt: 3 }}
                >
                    העלאת קובץ
                </Button>
            </Box>
        </Box>
    );
};

export default UploadMaterials;