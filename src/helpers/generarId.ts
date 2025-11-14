import { v4 as uuidv4 } from "uuid";

export const generarId = (): string => {
    return uuidv4();
};