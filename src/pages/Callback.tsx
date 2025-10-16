import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "../components/ui/card";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "../components/ui/button";

const Callback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const code = searchParams.get("code");
        const error = searchParams.get("error");

        if (error) {
            console.error("❌ OAuth Error:", error);
            setStatus("error");
            setErrorMessage(error);
            return;
        }

        if (!code) {
            console.error("❌ No authorization code received");
            setStatus("error");
            setErrorMessage("No authorization code received");
            return;
        }

        // Simulate token exchange
        console.log("🔄 Exchanging authorization code for access token...");
        console.log("📝 Authorization Code:", code);

        // Simulate API call delay
        setTimeout(() => {
            try {
                // Mock response from token endpoint
                const mockTokenResponse = {
                    access_token: "ya29.mock_access_token_" + Math.random().toString(36).substr(2, 9),
                    expires_in: 3600, // 1 hour
                    token_type: "Bearer",
                    scope: "profile email",
                };

                // Mock user profile
                const mockUser = {
                    id: "user_" + Math.random().toString(36).substr(2, 9),
                    name: "Demo User",
                    email: "demo@oauth-academy.dev",
                    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
                };

                console.log("✅ Token received:", mockTokenResponse);
                console.log("👤 User profile:", mockUser);

                setStatus("success");

                // Redirect to dashboard after brief success display
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            } catch (err) {
                console.error("❌ Token exchange failed:", err);
                setStatus("error");
                setErrorMessage("Failed to exchange authorization code");
            }
        }, 2000);
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-8 text-center shadow-xl border-border animate-fade-in-scale">
                {status === "loading" && (
                    <div className="space-y-6">
                        <div className="relative">
                            <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 animate-pulse-glow" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-foreground">Exchanging Authorization Code</h2>
                            <p className="text-muted-foreground">
                                Securely obtaining your access token...
                            </p>
                        </div>
                        <div className="bg-muted rounded-lg p-4 text-left space-y-2 text-sm font-mono">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span>POST /oauth/token</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span>Validating authorization code...</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span>Fetching user profile...</span>
                            </div>
                        </div>
                    </div>
                )}

                {status === "success" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="relative">
                            <CheckCircle2 className="w-16 h-16 text-accent mx-auto" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-foreground">Authentication Successful!</h2>
                            <p className="text-muted-foreground">
                                Redirecting to dashboard...
                            </p>
                        </div>
                    </div>
                )}

                {status === "error" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="relative">
                            <XCircle className="w-16 h-16 text-destructive mx-auto" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-foreground">Authentication Failed</h2>
                            <p className="text-muted-foreground">
                                {errorMessage || "Something went wrong during authentication"}
                            </p>
                        </div>
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                            <p className="text-sm text-destructive font-mono break-all">
                                Error: {errorMessage}
                            </p>
                        </div>
                        <Button
                            // variant="gradient"
                            size="lg"
                            onClick={() => navigate("/")}
                            className="w-full"
                        >
                            Return to Home
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Callback;
