import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export const auth = async () => {
  const session = await getServerSession(authOptions);
  return session;
};