# Rate My Professor GSU AI 🎓

Rate My Professor GSU AI is a web application designed to help students at Georgia State University (GSU) find the best professors for their courses. The application uses advanced AI techniques, including Retrieval-Augmented Generation (RAG) and a vector database, to deliver precise and personalized professor recommendations based on user queries.

## Features 💡

- **Professor Recommendations**: The system provides the top 3 professor recommendations based on user queries, considering both ratings and qualitative feedback from student reviews.
- **Interactive Chat Interface**: Users can interact with the AI through a chat interface, asking for professor recommendations based on specific criteria.
- **RAG-Based Retrieval**: Utilizes RAG to accurately retrieve and analyze relevant professor data from a comprehensive database.
- **Dynamic Response Generation**: AI generates responses that include professor ratings, subjects taught, and key highlights from reviews.

## Technologies Used 💻

- **Next.js**: Framework for building the web application.
- **OpenAI**: For creating embeddings and generating responses.
- **Pinecone**: Vector database for storing and querying professor data.
- **React**: For building the front-end chat interface.
- **Material-UI**: UI components for a modern and responsive design.

## Usage ⚡

1. **Start the Chat**: Begin interacting with the AI by asking for professor recommendations. The AI will guide you through the process.
2. **Receive Recommendations**: Based on your query, the AI will provide you with the top 3 professor recommendations, including ratings and review highlights.
3. **Explore Professors**: Learn more about each professor through the detailed summaries provided by the AI.

## How It Works 🔍

1. **User Query**: The user inputs a query related to GSU professors.
2. **Embedding Creation**: The query is converted into an embedding using the OpenAI API.
3. **Vector Database Query**: The embedding is used to query the Pinecone vector database, retrieving the most relevant professor data.
4. **Response Generation**: The AI generates a response using the retrieved data and provides the user with a concise and informative summary of the top 3 professors.

## Contact 🌐

If you have any questions or feedback, please feel free to reach out:

- **GitHub**: [NghiaLam2026](https://github.com/NghiaLam2026)
- **Email**: nghiatlam03@gmail.com

## LIVE DEMP
- Link: https://rmp-gsu-ai.vercel.app/
