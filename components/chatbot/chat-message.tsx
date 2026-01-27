import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
    const isUser = role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${isUser
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    }`}
            >
                {isUser ? (
                    <p className="text-sm whitespace-pre-wrap">{content}</p>
                ) : (
                    <div className="text-sm prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-strong:text-inherit">
                        <ReactMarkdown
                            components={{
                                a: ({ href, children }) => {
                                    const isInternal = href?.startsWith("/");
                                    if (isInternal) {
                                        return (
                                            <Link
                                                href={href || "/"}
                                                className="text-red-600 dark:text-red-400 underline hover:text-red-700 dark:hover:text-red-300 font-medium"
                                            >
                                                {children}
                                            </Link>
                                        );
                                    }
                                    return (
                                        <a
                                            href={href || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-600 dark:text-red-400 underline hover:text-red-700 dark:hover:text-red-300 font-medium"
                                        >
                                            {children}
                                        </a>
                                    );
                                },
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}