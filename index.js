const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: 'tmthXrgCCKU8Z4aJSOlNphyTD',
    appSecret: 'FBE1CZqBpySumCjH1EmWuvBQqCqfC875AJ6cADZBWoENnLwjTz',
    accessToken: '1343637962274164736-ASdhOdU8vXj6shAc1EMU2Hlwd37xrA',
    accessSecret: 'm7HysbOQWMmzHsUWUVIR1jbue7AKqwolaYYKcY3W204zT',
});

function passURL() {
    //var input = document.getElementById("userInput").value;

    //console.log(input);
    getID('https://twitter.com/BenTodar/status/1472499316182982657')
}
function getID(url) {
    var s = url;
    var l = s.length;
    var found = s.indexOf("status/");
    var id = s.substring(found + 7, l);
    console.log(id);
    getTweets(id)
}

async function getTweets(id) {
    return new Promise((resolve, reject) => {
        client.v1.singleTweet(id, {
            expansions: [
                'entities.mentions.username',
                'in_reply_to_user_id',
                'attachments.media_keys',
                'attachments.poll_ids',
                'author_id',
            ],
        })
            .then((val) => {
                console.log(`Full Text \n${val.full_text}`);
                
                console.log(`Fav Count \n${val.favorite_count}`);
                if (val.quote_count == null) {
                    console.log(`Quote Count \n0`);
                }
                else {
                    console.log(`Quote Count \n${val.quote_count}`);
                }
                console.log(`Retweet Count \n${val.retweet_count}`);
                console.log(`User Name \n${val.user.name}`);
                console.log(`Screen Name \n${val.user.screen_name}`);
                console.log(`Image URL \n${val.user.profile_image_url_https}`);
                console.log(`Verified Status \n${val.user.verified}`);
                if (val.entities.urls.length == 0) {
                    console.log("NO URLs")
                } else {
                    val.entities.urls.forEach((values) => {
                        console.log(values.display_url);
                        console.log(values.expanded_url);
                        console.log(values.indices);
                        console.log(values.unwound);
                        console.log(values.url);
                    })
                }
                if (val.extended_entities == null) {
                    console.log("NO ENTITIES");
                } else {
                    if (val.extended_entities.media == null)
                        console.log("NO MEDIA");
                    else {
                        val.extended_entities.media.forEach((value) => {
                            console.log(`Image URL \n${value.media_url_https}`);
                            if (value.video_info == null) {
                                console.log("No Video");
                            } else {
                                console.log(`Video URL \n${value.video_info.variants[1].url}`);
                            }
                        });
                    }
                }
                return (resolve);
            }).catch((err) => {
                console.log(err);
                return (reject);
            })
    })
}
async function main() {
    try {
        passURL();
    } catch (e) {
        console.error(e);
    }
}
setInterval(main, 1000);