'use strict'

const {Map, Record} = require ('immutable')

const userInitialState = Record ({
    profileData: new (Record ({
        updated_time: '',
        locale: '',
        user_id: '',
        user_name: '',
        picture: '',
        name: '',
        zipcode: '',
        address: '',
        state: '',
        city: '',
        country: '',
        phone: '',
        email: '',
        followers: 0,
        following: 0,
        facebook: '',
        instagram: '',
        specsHistory: new (Map)
    })),

    loginType: null,
    onStart: true,

})

export default userInitialState
