import { Box, TextField } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel, { a11yProps } from "./components/TabPanel";

import UploadMaterials from "./components/UploadMaterials";
import GenerateQuestions from "./components/GenerateQuestions";
import EditNSave from "./components/EditNSave";
import { useClient } from "./contexts/ClientContext";
import { useTabs } from "./contexts/TabsContext";


const FormTemplate = () => {
  const { apiKey, setApiKey } = useClient();
  const { tabValue, setTabValue } = useTabs();

  return (
    <Box>
      <Box sx={{ width:'100%'}}>
        <TextField
          fullWidth
          label="מפתח API"
          name="apiKey"
          value={apiKey}
          onChange={(event) => {setApiKey(event.target.value);}}
          margin="normal"
        />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs onChange={(event, newValue) => {setTabValue(newValue);}}>
            <Tab label='העלאת חומר' {...a11yProps(0)} />
            <Tab label='יצירת שאלות' {...a11yProps(1)} />
            <Tab label='עריכה ושמירה' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0} ><UploadMaterials /></TabPanel>
        <TabPanel value={tabValue} index={1}><GenerateQuestions /></TabPanel>
        <TabPanel value={tabValue} index={2}><EditNSave /></TabPanel>
      </Box>
    </Box>
  );
};

export default FormTemplate;
