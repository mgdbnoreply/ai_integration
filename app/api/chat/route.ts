import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { CHATBOT_PERSONA } from "@/lib/chatbot-persona";
import { TOOL_DEFINITIONS, executeTool } from "@/lib/chatbot-tools";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Get the base URL for internal API calls
function getBaseUrl(request: NextRequest): string {
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    return `${protocol}://${host}`;
}

export async function POST(request: NextRequest) {
    try {
        const { message, history } = await request.json();
        const baseUrl = getBaseUrl(request);

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: CHATBOT_PERSONA,
            tools: [{ functionDeclarations: TOOL_DEFINITIONS }],
        });

        // Start chat with history
        const chat = model.startChat({
            history: history || [],
        });

        // Send the user's message
        let result = await chat.sendMessage(message);
        let response = result.response;

        // Handle function calls (may need multiple rounds)
        while (response.functionCalls() && response.functionCalls()!.length > 0) {
            const functionCalls = response.functionCalls()!;
            const functionResponses = [];

            // Execute each function call
            for (const call of functionCalls) {
                console.log(`Executing tool: ${call.name}`, call.args);
                const toolResult = await executeTool(call.name, call.args as Record<string, any>, baseUrl);
                functionResponses.push({
                    functionResponse: {
                        name: call.name,
                        response: { result: toolResult },
                    },
                });
            }

            // Send function results back to the model
            result = await chat.sendMessage(functionResponses);
            response = result.response;
        }

        // Return the final text response
        const textResponse = response.text();

        return NextResponse.json({ response: textResponse });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}