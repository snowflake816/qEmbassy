export interface VaultAuth {
  address: string
  publicKey: string
  isAuthenticated: boolean
}

export interface UserProfile {
  address: string
  name: string
  role: "ambassador" | "team_lead" | "admin"
  status: "active" | "inactive" | "pending"
  nftMinted: boolean
  nftId?: string
  teamId?: string
  country?: string
  region?: string
  joinedDate: string
}

// Mock function to simulate vault file authentication
export async function authenticateVault(
  file: File,
  password: string,
): Promise<{ success: boolean; address?: string; error?: string }> {
  // Simulate authentication delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock validation
  if (password.length < 8) {
    return { success: false, error: "Invalid password" }
  }

  // Mock successful authentication
  const mockAddress = "QUBIC" + Math.random().toString(36).substring(2, 15).toUpperCase()
  return { success: true, address: mockAddress }
}

// Mock function to get user profile
export async function getUserProfile(address: string): Promise<UserProfile | null> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock user data
  return {
    address,
    name: "John Ambassador",
    role: "ambassador",
    status: "active",
    nftMinted: true,
    nftId: "NFT-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    country: "United States",
    region: "North America",
    joinedDate: "2024-01-15",
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("qubic_auth") !== null
}

// Get current user from localStorage
export function getCurrentUser(): VaultAuth | null {
  if (typeof window === "undefined") return null
  const auth = localStorage.getItem("qubic_auth")
  return auth ? JSON.parse(auth) : null
}

// Save auth to localStorage
export function saveAuth(address: string, publicKey: string): void {
  const auth: VaultAuth = {
    address,
    publicKey,
    isAuthenticated: true,
  }
  localStorage.setItem("qubic_auth", JSON.stringify(auth))
}

// Logout
export function logout(): void {
  localStorage.removeItem("qubic_auth")
  localStorage.removeItem("user_profile")
}
