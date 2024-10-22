import { IUser } from ".";

export type TAuthContext = {
	user: IUser | null;
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
	handleSetUser: Function
	logout: Function
	isLoading: boolean
};