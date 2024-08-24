"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Stack, TextField, Button } from "@mui/material";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm the GSU RMP for the Department of Computer Science. How can I assist you?"
    }
  ]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom when a new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() === "") return; // Prevent sending empty messages

    const relevantKeywords = ["professor", "instructor", "teacher", "GSU", "computer science", "CS", "faculty"];
    const messageContainsRelevantKeyword = relevantKeywords.some(keyword =>
      message.toLowerCase().includes(keyword)
    );

    const responseContent = messageContainsRelevantKeyword
      ? "" // This is where you would process the valid messages normally
      : "I can only assist with questions about GSU Computer Science professors.";

    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: responseContent }
    ]);

    setMessage("");

    if (messageContainsRelevantKeyword) {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([...messages, { role: "user", content: message }])
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      reader.read().then(function processText({ done, value }) {
        if (done) {
          return;
        }

        const text = decoder.decode(value, { stream: true });
        result += text;

        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];
          const otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text }
          ];
        });

        reader.read().then(processText);
      });
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/GSU.jpg')",
      }}
    >
      <Stack 
        direction="column" 
        width="600px" 
        height="800px" 
        bgcolor="rgba(255, 255, 255, 0.9)" 
        boxShadow="0px 4px 15px rgba(0, 0, 0, 0.2)" 
        borderRadius={12} 
        p={3} 
        spacing={3}
        style={{
          animation: "slideIn 0.5s ease-out"
        }}
      >
        <Stack direction="column" spacing={3} flexGrow={1} overflow="auto" maxHeight="800px">
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
            >
              <Box
                bgcolor={message.role === "assistant" ? "#004080" : "#0039A6"} 
                color="white"
                borderRadius={8}
                p={4}
                maxWidth="80%"
                boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
                style={{
                  background: "linear-gradient(45deg, #0066cc, #001757)",
                  lineHeight: 1.7,
                  marginBottom: '16px',
                  fontSize: '16px',
                }}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField 
            label="Type your message..." 
            fullWidth 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            variant="outlined"
            InputProps={{
              style: {
                borderRadius: 16,
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage}
            style={{
              background: "linear-gradient(45deg, #0066cc, #001757)", // Gradient button
              color: "white",
              borderRadius: 16,
              padding: "8px 24px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s ease-in-out"
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
