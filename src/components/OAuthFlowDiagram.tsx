import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
    { id: 1, title: "User Clicks Login", desc: "Initiates OAuth flow" },
    { id: 2, title: "Redirect to Provider", desc: "Google/GitHub auth page" },
    { id: 3, title: "User Authorizes", desc: "Grants permissions" },
    { id: 4, title: "Callback with Code", desc: "Returns auth code" },
    { id: 5, title: "Exchange Code", desc: "Get access token" },
    { id: 6, title: "Access Granted", desc: "User authenticated" },
];

export const OAuthFlowDiagram = () => {
    return (
        <Card className="p-6 bg-card border-border shadow-lg">
            <h3 className="text-lg font-semibold mb-6 text-foreground">OAuth 2.0 Authorization Flow</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3">
                        <div className="flex-1 bg-gradient-primary rounded-lg p-4 text-primary-foreground shadow-md hover:shadow-lg transition-all">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                                    {step.id}
                                </div>
                                <h4 className="font-semibold text-sm">{step.title}</h4>
                            </div>
                            <p className="text-xs opacity-90">{step.desc}</p>
                        </div>
                        {index < steps.length - 1 && index % 3 !== 2 && (
                            <ArrowRight className="hidden md:block text-muted-foreground flex-shrink-0" />
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-accent">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Educational Demo - No Real Authentication</span>
            </div>
        </Card>
    );
};
