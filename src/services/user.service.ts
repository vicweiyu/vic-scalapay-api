import User from '../model/user.model';

class UserService {
  async createUser(username: string, password: string) {
    const result = await User.create({ username, password });

    return result;
  }

  async getUserInfo({ id, username }: { id?: number; username?: string }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    username && Object.assign(whereOpt, { username });

    const result = await User.findOne({
      attributes: [
        'id',
        'username',
        'password',
        'first_name',
        'last_name',
        'mobile_number',
        'address',
        'is_locked',
        'is_deleted',
      ],
      where: whereOpt,
    });

    return result;
  }

  async updateUserPWDByID({ id, password }: { id: number; password?: string }) {
    const whereOpt = { id };
    const t_user = {};
    password && Object.assign(t_user, { password });

    const result = await User.update(t_user, { where: whereOpt });

    return result[0] > 0;
  }
}

export default new UserService();
