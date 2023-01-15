/* eslint-disable import/no-anonymous-default-export */

import { Navigate } from 'react-router-dom';
import { SigninForm } from './../components/auth/SigninForm';
import { state } from '../state';
import { useSnapshot } from 'valtio';

export default () => {
  const { me } = useSnapshot(state);

  return me? <Navigate to="/feed" /> : <SigninForm />;
};
