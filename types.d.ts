import "next-auth";

declare module "next-auth" {
  interface Session {
    id: string; // Add the `id` property
  }
}
