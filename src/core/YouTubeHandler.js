import ytch from 'yt-channel-info';
import fs from 'fs';

let channels = [
    'UCewMTclBJZPaNEfbf-qYMGA', // JackSucksAtLife
    'UCxLIJccyaRQDeyu6RzUsPuw', // JackSucksAtStuff
    'UCd15dSPPT-EhTXekA7_UNAQ', // JackSucksAtGeography
    'UCyktGLVQchOpvKgL7GShDWA', // Jack Massey Welsh
    'UCF9R3Ln-u52vUdSO-pFdETw', // JacksEpicYouTubeChannel...
    'UCqx-my2rOoQuEOHKNNgNppw', // JackSucksAtEspañol
    'UCbu2qTa75eyjwCKOugX8F6A', // turdboi420
];

export async function updateFile() {
    let data = [];

    for (let channel of channels) {
        let payload = {
            channelId: channel,
            sortBy: 'popular',
            channelIdType: 0,
        };
        await ytch
            .getChannelVideos(payload)
            .then((response) => {
                if (!response.alertMessage) {
                    for (let item of response.items) {
                        data.push(item);
                        // console.log(item);
                    }
                } else {
                    console.log('Channel could not be found.'); // throw response.alertMessage
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    let nData = [];
    for (let video of data) {
        let output = {
            title: video.title,
            thumbnail: `https://i3.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
            author: video.author,
            views: video.viewCount,
            viewsText: video.viewCountText,
            url: `https://www.youtube.com/watch?v=${video.videoId}`,
        };

        nData.push(output);
    }

    let json = JSON.stringify({ videos: nData }, null, 2);
    fs.writeFileSync('./data.json', json);
}

updateFile();
