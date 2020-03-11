// import { ActionTypes } from '.';
import { Auth } from '../../services';

export const login = async user => {
  const { a } = await Auth.Login(user.email, user.password);
  console.log(a);
};
