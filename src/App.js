import React from "react";
import { useState, useEffect  } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Configuration, OpenAIApi } from "openai";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Button, Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },    
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  // Function to toggle between dark mode and light mode
  useEffect(() => {
    // Update the theme-color meta tag based on the current mode
    const themeColor = darkMode ? "#12233B" : "#fafafa";
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeColor);
    }
  }, [darkMode]);


  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main className="main" >
       <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
       
        <Container maxWidth="md" sx={{ mt: '0rem'}} >
        
        <Button sx={{ textTransform: 'capitalize' }} onClick={toggleDarkMode} startIcon={darkMode ? <DarkModeRoundedIcon /> : <WbSunnyRoundedIcon />}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
        <Card sx={{pt:2, pl:2, pr:2, pb:2}}>
        
        <Typography variant="h5" className="heading-title" gutterBottom>
      React Chat Gpt
      </Typography>
        <TextField fullWidth  type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write your prompt.." id="outlined-basic" label="Write your prompt.." variant="outlined" />
          <Button sx={{ mt: '1rem'}} variant="contained" onClick={handleClick} disabled={loading || prompt.length === 0}>
          {loading ? "Generating..." : "Generate"}
         </Button>
        <p className="result">{result}</p>
        </Card>
      </Container>
      </Box>
    </ThemeProvider>
      
    </main>
  );
}

export default App;