import { Shield, Zap, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusIndicator } from "../components/StatusIndicator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { OAuthFlowDiagram } from "../components/OAuthFlowDiagram";

const Landing = () => {
    const navigate = useNavigate();

    // Placeholder function - where OAuth initiation would happen
    const handleGoogleLogin = () => {
        console.log("🔐 OAuth Flow would start here:");
        console.log("1. Redirect to Google OAuth URL with client_id, redirect_uri, scope");
        console.log("2. User authenticates and grants permissions");
        console.log("3. Google redirects back to /callback with authorization code");

        // Simulate redirect to callback page with mock code
        setTimeout(() => {
            navigate("/callback?code=mock_auth_code_12345");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-hero">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="w-8 h-8 text-primary" />
                        <h1 className="text-xl font-bold text-foreground">OAuth 2.0 Academy</h1>
                    </div>
                    <StatusIndicator status={"unauthenticated"} />
                </div>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                        OAuth 2.0 Learning Platform
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Understand OAuth 2.0 Authorization Code Flow through interactive demonstration
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in">
                    <Card className="border-border shadow-lg hover:shadow-xl transition-all">
                        <CardHeader>
                            <Zap className="w-12 h-12 text-primary mb-2" />
                            <CardTitle>Interactive Learning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Watch the OAuth flow in action with detailed console logging
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border shadow-lg hover:shadow-xl transition-all">
                        <CardHeader>
                            <Shield className="w-12 h-12 text-accent mb-2" />
                            <CardTitle>Secure by Design</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Learn industry-standard authentication patterns
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border shadow-lg hover:shadow-xl transition-all">
                        <CardHeader>
                            <BookOpen className="w-12 h-12 text-destructive mb-2" />
                            <CardTitle>Educational Focus</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                No real authentication - pure learning environment
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Login Card */}
                <Card className="max-w-md mx-auto mb-12 shadow-xl border-border animate-fade-in-scale">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Get Started</CardTitle>
                        <CardDescription>
                            Click below to initiate the OAuth 2.0 flow
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            className="w-full"
                            onClick={handleGoogleLogin}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Sign in with Google
                        </Button>
                    </CardContent>
                </Card>

                {/* Info Section */}
                <Card className="mb-12 bg-primary/5 border-primary/20 shadow-lg animate-fade-in">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            What happens when you click login?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="space-y-3 text-muted-foreground">
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                                <span>You'll be redirected to Google's authorization server</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                                <span>After granting permissions, Google sends an authorization code</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                                <span>The code is exchanged for an access token</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</span>
                                <span>You're redirected to the dashboard with your profile information</span>
                            </li>
                        </ol>
                    </CardContent>
                </Card>

                {/* Flow Diagram */}
                <div className="animate-fade-in">
                    <OAuthFlowDiagram />
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border mt-16 py-8">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p className="text-sm">
                        Educational OAuth 2.0 Demo • No Real Authentication • Built with React + TypeScript
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
