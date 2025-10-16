import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
    status: "authenticated" | "unauthenticated" | "loading";
    className?: string;
}

export const StatusIndicator = ({ status, className }: StatusIndicatorProps) => {
    const config = {
        authenticated: {
            icon: CheckCircle2,
            text: "Authenticated",
            color: "text-accent",
            bgColor: "bg-accent/10",
        },
        unauthenticated: {
            icon: XCircle,
            text: "Not Authenticated",
            color: "text-muted-foreground",
            bgColor: "bg-muted",
        },
        loading: {
            icon: Loader2,
            text: "Checking...",
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
    };

    const { icon: Icon, text, color, bgColor } = config[status];

    return (
        <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full", bgColor, className)}>
            <Icon className={cn("w-4 h-4", color, status === "loading" && "animate-spin")} />
            <span className={cn("text-sm font-medium", color)}>{text}</span>
        </div>
    );
};
