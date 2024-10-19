import { ICurrentUser } from ".";

export type TAuthContext = {
	user: ICurrentUser | null;
	setUser: React.Dispatch<React.SetStateAction<ICurrentUser | null>>;
};