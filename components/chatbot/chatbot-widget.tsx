"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInterface from "./chat-interface";
import { CHATBOT_NAME } from "@/lib/chatbot-persona";

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <div className="fixed bottom-6 right-6 z-50 group">
                    {/* Pulse ring animation */}
                    <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-25" />

                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        Chat with {CHATBOT_NAME}
                        <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900" />
                    </div>

                    {/* Button */}
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="relative h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
                        size="icon"
                    >
                        <MessageCircle className="h-6 w-6" />
                    </Button>
                </div>
            )}

            {/* Chat Interface */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] max-h-[calc(100vh-3rem)] bg-white dark:bg-gray-900 rounded-lg shadow-2xl z-50 flex flex-col">
                    {/* Header */}
                    <div className="bg-red-600 text-white p-4 rounded-t-lg flex justify-between items-center flex-shrink-0">
                        <h3 className="font-bold">{CHATBOT_NAME}</h3>
                        <Button
                            onClick={() => setIsOpen(false)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white hover:bg-red-700"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Chat Interface */}
                    <ChatInterface />
                </div>
            )}
        </>
    );
}