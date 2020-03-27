export class Account {

    favorites = [];
    avatar = 'http://placehold.it/240x240';
    bio = 'Tell the world about yourself';

    constructor(id, userName, password, avatar, bio, accountType) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.avatar = avatar;
        this.bio = bio;
        this.accountType = accountType;
    }
}

export default Account;