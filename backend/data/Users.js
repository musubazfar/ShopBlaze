import bcrypt from 'bcryptjs'

const Users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('admin@1', 10),
        isAdmin: true
    },
    {
        name: 'Musub Khan',
        email: 'musub@psca.gop.pk',
        password: bcrypt.hashSync('musub@1', 10),
        isAdmin: true
    },
    {
        name: 'Taimoor Karim',
        email: 'taimoor@email.com',
        password: bcrypt.hashSync('taimoor@1', 10),
        isAdmin: false
    },
]

export default Users;