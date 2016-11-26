var bcrypt = require('bcrypt');

let users = [
    {
        first_name: 'Bob',
        last_name: 'Williams',
        email: 'bob@williams.com',
        password_digest: 'green',
    },
    {
        first_name: 'Barry',
        last_name: 'Smith',
        email: 'barry@smith.com',
        password_digest: 'blue'

    },
    {
        first_name: 'Bernard',
        last_name: 'Jones',
        email: 'bernard@jones.com',
        password_digest: 'purple'
    },
    {
        first_name: 'Beatrice',
        last_name: 'Johnson',
        email: 'red',
        password_digest: 'beatrice@johnson.com'
    },
    {
        first_name: 'Billy',
        last_name: 'Browne',
        email: 'billy@browne.com',
        password_digest: 'orange'
    },
    {
        first_name: 'Bella',
        last_name: 'Miller',
        email: 'bella@miller.com',
        password_digest: 'yellow'
    },
    {
        first_name: 'Bethany',
        last_name: 'Davis',
        email: 'bethany@davis.com',
        password_digest: 'black'
    },
    {
        first_name: 'Brian',
        last_name: 'Taylor',
        email: 'brian@taylor.com',
        password_digest: 'white'
    },
    {
        first_name: 'Bernadette',
        last_name: 'Wilson',
        email: 'bernadette@wilson.com',
        password_digest: 'brown'
    },
    {
        first_name: 'Betsy',
        last_name: 'White',
        email: 'betsy@white.com',
        password_digest: 'indigo'
    },
    {
        first_name: 'Bertha',
        last_name: 'Hill',
        email: 'bertha@hill.com',
        password_digest: 'pink'
    },
    {
        first_name: 'Brittany',
        last_name: 'Thomas',
        email: 'brittany@thomas.com',
        password_digest: 'aqua'
    },
    {
        first_name: 'Bailey',
        last_name: 'Clark',
        email: 'bailey@clarke.com',
        password_digest: 'fuschia'
    },
    {
        first_name: 'Brooke',
        last_name: 'Jackson',
        email: 'brooke@jackson.com',
        password_digest: 'turquoise'
    },
    {
        first_name: 'Brenda',
        last_name: 'Allen',
        email: 'brenda@allen.com',
        password_digest: 'chartreuse'
    },
    {
        first_name: 'Barb',
        last_name: 'Evans',
        email: 'barb@evans.com',
        password_digest: 'lavender'
    },
    {
        first_name: 'Ben',
        last_name: 'Martin',
        email: 'ben@martin.com',
        password_digest: 'lilac'
    },
    {
        first_name: 'Brad',
        last_name: 'Wright',
        email: 'brad@wright.com',
        password_digest: 'magenta'
    },
    {
        first_name: 'Bruce',
        last_name: 'King',
        email: 'bruce@king.com',
        password_digest: 'vermilion'
    },
    {
        first_name: 'Brett',
        last_name: 'Adams',
        email: 'brett@adams.com',
        password_digest: 'violet'
    }

]

var newUsers = users.map(user => {
    bcrypt.hash(user.password_digest, 10, function(err, hash) {
        user.password_digest = hash;
    })
    return user;
})

module.exports = newUsers;
