exports.up = function(next) {
  this
    .model('User')
    .update(
        {},
        {
            $set: { createdAt: Date.now() }
        },
        {
            multi: true,
            strict: false
        },
        function (error, numberAffected, raw) {
            if (error) {
                console.error(error);
            }
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);
            next();
        }
    );
};

exports.down = function(next) {
    this
        .model('User')
        .update(
            {},
            {
                $unset: { createdAt: 1 }
            },
            {
                multi: true,
                strict: false
            },
            function (error, numberAffected, raw) {
                if (error) {
                    console.error(error);
                }
                console.log('The number of updated documents was %d', numberAffected);
                console.log('The raw response from Mongo was ', raw);
                next();
            }
        );
};