import { db } from "~/server/db";

export const TOKEN_LENGTH = 6;
const generateShortToken = (length: number = TOKEN_LENGTH): string => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
};

const isTokenUnique = async (token: string) => {
  return (
    (await db.urlMapping.count({
      where: {
        token,
      },
    })) === 0
  );
};

export const generateUniqueToken = async () => {
  let token = generateShortToken();
  while (!(await isTokenUnique(token))) {
    token = generateShortToken();
  }
  return token;
};
