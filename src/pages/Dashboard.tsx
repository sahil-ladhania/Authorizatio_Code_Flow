import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Shield,
    LogOut,
    Eye,
    EyeOff,
    Copy,
    RefreshCw,
    Clock,
    CheckCircle2,
    Terminal,
    User,
    Mail,
    KeyRound,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"; 
import { Badge } from "../components/ui/badge";

// --- Static Mock Data ---
const MOCK_USER = {
    id: "109876543210987654321",
    name: "Avery Developer",
    email: "avery.developer@example.com",
    picture: "https://i.pravatar.cc/150?img=1"
};

const MOCK_ACCESS_TOKEN = "ya29.a0ARl2qP9S-T-I_gJ-gH-jK-lM-nP-qR-sT-uV-wX-yZ-0A_1B_2C_3D_4E_5F_6G_7H_8I_9J";
const TOKEN_EXPIRY_DURATION = 300000;
const MOCK_TOKEN_ACQUIRED_AT = Date.now() - 60000;
const MOCK_TOKEN_EXPIRY = MOCK_TOKEN_ACQUIRED_AT + TOKEN_EXPIRY_DURATION;

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(MOCK_USER);
    const [accessToken, setAccessToken] = useState(MOCK_ACCESS_TOKEN); 
    const [tokenExpiry, setTokenExpiry] = useState(MOCK_TOKEN_EXPIRY); 
    const [showToken, setShowToken] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState("");
    const [apiResponse, setApiResponse] = useState<any>(null);
    const [isTestingApi, setIsTestingApi] = useState(false);

    // Token expiry countdown
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = tokenExpiry - now;

            if (diff <= 0) {
                setTimeRemaining("Token expired");
                clearInterval(interval);
            } else {
                const totalSeconds = Math.floor(diff / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                setTimeRemaining(`${minutes}m ${seconds.toString().padStart(2, '0')}s`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [tokenExpiry]);

    const handleLogout = () => {
        console.log("🚪 Logging out...");
        toast.success("Logged out successfully");
        // In a real app, you'd clear the token from state/storage here.
        navigate("/");
    };

    const handleRefreshToken = () => {
        console.log("🔄 Refreshing access token...");
        // Disable refresh button during mock refresh
        // Simulate token refresh
        setTimeout(() => {
            const newToken = "ya29.mock_refreshed_token_" + Math.random().toString(36).substr(2, 9);
            const newExpiry = Date.now() + TOKEN_EXPIRY_DURATION; // Reset timer
            setAccessToken(newToken);
            setTokenExpiry(newExpiry);
            toast.success("Token refreshed successfully");
        }, 1000);
    };

    const handleCopyToken = () => {
        if (accessToken) {
            navigator.clipboard.writeText(accessToken).then(() => {
                toast.info("Access Token copied to clipboard!");
            }).catch(err => {
                console.error('Could not copy text: ', err);
                toast.error("Failed to copy token.");
            });
        }
    };

    const handleTestApi = async () => {
        setIsTestingApi(true);
        setApiResponse(null);
        console.log("🧪 Testing Google API with access token...");

        // Simulate API call
        setTimeout(() => {
            const mockResponse = {
                kind: "calendar#events",
                summary: "Demo Calendar",
                items: [
                    {
                        id: "event1",
                        summary: "OAuth 2.0 Study Session",
                        start: { dateTime: "2025-10-17T10:00:00Z" },
                        end: { dateTime: "2025-10-17T11:00:00Z" },
                    },
                    {
                        id: "event2",
                        summary: "React Learning",
                        start: { dateTime: "2025-10-18T14:00:00Z" },
                        end: { dateTime: "2025-10-18T15:30:00Z" },
                    },
                ],
            };

            setApiResponse(mockResponse);
            setIsTestingApi(false);
            toast.success("API test successful");
            console.log("✅ API Response:", mockResponse);
        }, 1500);
    };

    const maskToken = (token: string) => {
        if (!token) return "";
        return `${token.substring(0, 12)}...${token.substring(token.length - 8)}`;
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
                    <Button variant="destructive" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="mb-8 animate-fade-in">
                    <h2 className="text-4xl font-bold mb-2 text-foreground">Welcome back!</h2>
                    <p className="text-muted-foreground">Your OAuth 2.0 authentication is active</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* User Profile Card */}
                    <Card className="border-border shadow-lg animate-fade-in">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                User Profile
                            </CardTitle>
                            <CardDescription>Your authenticated user information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-20 h-20 border-2 border-primary">
                                    <AvatarImage src={user?.picture} alt={user?.name} className="rounded-full object-cover" />
                                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl flex items-center justify-center rounded-full">
                                        {user?.name?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-foreground">{user?.name}</h3>
                                    <Badge variant="secondary" className="mt-1">
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                        Verified
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-3 bg-muted/50 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-xs text-muted-foreground">Email</p>
                                        <p className="text-sm font-medium text-foreground break-all">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <KeyRound className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-xs text-muted-foreground">User ID</p>
                                        <p className="text-sm font-mono text-foreground break-all">{user?.id}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Token Information Card */}
                    <Card className="border-border shadow-lg animate-fade-in">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-accent" />
                                Access Token
                            </CardTitle>
                            <CardDescription>OAuth 2.0 access token details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm break-all">
                                {showToken ? accessToken : maskToken(accessToken || "")}
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowToken(!showToken)}
                                    className="flex-1"
                                >
                                    {showToken ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                                    {showToken ? "Hide" : "Show"} Token
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCopyToken}
                                    className="flex-1"
                                >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Token
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium text-foreground">Expires in:</span>
                                </div>
                                <Badge variant="secondary" className="font-mono">
                                    {timeRemaining}
                                </Badge>
                            </div>

                            <Button
                                variant="default" // Assuming 'gradient' is not a standard shadcn/ui variant, changing to 'default'
                                className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90"
                                onClick={handleRefreshToken}
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refresh Token
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* API Testing Section */}
                <Card className="mt-6 border-border shadow-lg animate-fade-in">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-destructive" />
                            API Testing
                        </CardTitle>
                        <CardDescription>
                            Test authenticated API calls using your access token
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            // variant="success" is not a standard shadcn/ui variant, changing to 'default' with custom class
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            size="lg"
                            onClick={handleTestApi}
                            disabled={isTestingApi || timeRemaining === "Token expired"}
                        >
                            {isTestingApi ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    Testing API...
                                </>
                            ) : (
                                <>
                                    <Terminal className="w-4 h-4 mr-2" />
                                    Test Google Calendar API
                                </>
                            )}
                        </Button>

                        {apiResponse && (
                            <div className="bg-muted rounded-lg p-4 animate-fade-in">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-sm text-foreground">API Response</h4>
                                    <Badge variant="secondary">200 OK</Badge>
                                </div>
                                <pre className="text-xs overflow-auto max-h-96 bg-card p-4 rounded border border-border">
                                    {JSON.stringify(apiResponse, null, 2)}
                                </pre>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Debug Panel */}
                <Card className="mt-6 bg-card/50 border-dashed border-2 animate-fade-in">
                    <CardHeader>
                        <CardTitle className="text-sm font-mono">Debug Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4 text-xs font-mono">
                            <div className="space-y-2">
                                <div>
                                    <span className="text-muted-foreground">Auth Status:</span>
                                    <Badge variant="secondary" className="ml-2">Authenticated</Badge>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Token Type:</span>
                                    <span className="ml-2 text-foreground">Bearer</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-muted-foreground">Scope:</span>
                                    <span className="ml-2 text-foreground">profile email</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Provider:</span>
                                    <span className="ml-2 text-foreground">Google OAuth 2.0</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default Dashboard;