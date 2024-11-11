// next-auth.d.ts

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string; // Add the custom id property here
      role?: string; // Add other custom fields as needed
    };
  }

  interface User {
    id: string; // Ensure this matches the type you add to the token
    role?: string;
  }
}
