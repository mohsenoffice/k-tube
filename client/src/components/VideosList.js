import React from 'react';
import VideoListItem from './VideoListItem';


const VideosList = (props) => {

    //alert(props.videos);
    const videoItems = props.videos.map((video) => {
        return (
            <VideoListItem
                onVideoSelect={props.onVideoSelect}
                key={video.videoId}
                video={video}
            />
        );
    });


    return (
        <ul>
            { videoItems }
        </ul>
    );
};

export default VideosList;