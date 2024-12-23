export interface IUser {
  uid: string;
  username: string | null;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  token: string;
}