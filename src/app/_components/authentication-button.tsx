import { SignInButton, SignOutButton } from "@clerk/nextjs";
type User = {
  id: string;
  fullName: string | null;
  // Add additional custom attributes here
};

export const SignInOutButton = ({
  isSignedIn,
  user,
}: {
  isSignedIn: boolean;
  user: User | null;
}) => {
  return (
    <div className="flex flex-row gap-4">
      {isSignedIn && (
        <h3 style={{ marginTop: "4px" }}>Hello, {user!.fullName}</h3>
      )}
      {isSignedIn ? <SignOutButton /> : <SignInButton />}
    </div>
  );
};
