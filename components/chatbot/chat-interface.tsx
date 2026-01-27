"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "./chat-message";
import { CHATBOT_NAME, WELCOME_MESSAGE } from "@/lib/chatbot-persona";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const QUICK_ACTIONS = [
    { label: "🎮 Games", prompt: "What games are in the database?" },
    { label: "📱 Devices", prompt: "What devices are in the collection?" },
    { label: "📚 Research", prompt: "Tell me about RMGP's research and publications" },
    { label: "👋 About", prompt: "Who runs RMGP and what's the mission?" },
    { label: "📰 News", prompt: "What's the latest news from RMGP?" },
    { label: "❓ Help", prompt: "What can you help me with?" },
];

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: WELCOME_MESSAGE },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (messageText?: string) => {
        const textToSend = messageText || input.trim();
        if (!textToSend || isLoading) return;

        if (!messageText) setInput("");

        const newMessages = [...messages, { role: "user" as const, content: textToSend }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const history = newMessages.slice(1, -1).map((msg) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }],
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: textToSend, history }),
            });

            const data = await response.json();

            if (data.response) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.response },
                ]);
            } else {
                throw new Error("No response");
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I encountered an error. Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickAction = (prompt: string) => {
        sendMessage(prompt);
    };

    const showQuickActions = messages.length === 1;

    return (
        <div className="flex flex-col h-full min-h-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} role={msg.role} content={msg.content} />
                ))}

                {/* Quick Actions - only show after welcome message */}
                {showQuickActions && !isLoading && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {QUICK_ACTIONS.map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleQuickAction(action.prompt)}
                                className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 transition-colors"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}

                {isLoading && (
                    <ChatMessage role="assistant" content={`${CHATBOT_NAME} is thinking...`} />
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t flex-shrink-0">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        placeholder={`Ask ${CHATBOT_NAME} anything...`}
                        disabled={isLoading}
                    />
                    <Button
                        onClick={() => sendMessage()}
                        disabled={isLoading || !input.trim()}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}