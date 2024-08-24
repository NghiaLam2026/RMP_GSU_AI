import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// System prompt
const systemPrompt = `
System Prompt:

You are an expert advisor specializing in helping students find the best professors based on their specific queries. You have access to a comprehensive database of professor reviews, ratings, and related metadata.

Your task is to provide the top 3 professor recommendations that best match the student's query. For each query:

Use Retrieval-Augmented Generation (RAG) to accurately retrieve and analyze the most relevant professor data.
Prioritize professors with the highest overall ratings (4 or 5 stars) but also consider specific qualities mentioned in reviews, such as teaching effectiveness, approachability, clarity, and subject expertise.
Provide a clear summary of why each professor is a good match for the query, including their overall rating, the subject they teach, and key highlights from their reviews.
Ensure that the recommendations are precise, taking into account both numerical ratings and qualitative feedback from students.
Be concise, informative, and focused on delivering the best possible recommendations that align with the student's academic needs and preferences.


`;

export async function POST(req) {
    const data = await req.json();
    
    // Initialize Pinecone client
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pc.index('rag').namespace('ns1');

    // Get the last message content from the request data
    const text = data[data.length - 1].content;

    // Create an embedding using OpenAI API
    const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',  // Use a correct model identifier
        input: text,
        encoding_format: 'float',
    });

    // Extract the embedding from the response
    const embedding = embeddingResponse.data[0].embedding;

    // Query the Pinecone index using the embedding
    const result = await index.query({
        topK: 5,
        includeMetadata: true,
        vector: embedding,
    });

    // Generate the result string
    let resultString = "Return results from vector db done automatically: ";
    result.matches.forEach((match) => {
        resultString += `
        Professor: ${match.id}
        Review: ${match.metadata.review}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n\n`;
    });

    const lastMessage = data[data.length - 1];
    const lastMessageContent = lastMessage.content + resultString;
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

    // Create a chat completion using OpenAI API
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            ...lastDataWithoutLastMessage,
            { role: "user", content: lastMessageContent },
        ],
        stream: true,
    });

    // Create a stream to handle the response
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        const text = encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            } catch (err) {
                controller.error();
            } finally {
                controller.close();
            }
        },
    });

    return new NextResponse(stream);
}
