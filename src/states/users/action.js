import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'users/receive',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      // Panggil API untuk melakukan pendaftaran
      await api.register({ name, email, password });

      // Jika pendaftaran berhasil, kita tidak perlu melakukan apa-apa khusus di sini
    } catch (error) {
      // Tangani error saat pendaftaran gagal
      if (error.message.includes('email already is taken')) {
        throw new Error('email already is taken');
      } else {
        // Melempar kesalahan yang tidak terkait dengan email sudah terdaftar
        throw error;
      }
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
