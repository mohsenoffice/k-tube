import React from 'react';
import VideoListItem from './VideoListItem';


const VideosList = (props) => {

    //alert(props.videos);
    const videoItems = props.videos.map((video) => {
        return (
            <VideoListItem
                onVideoSelect={props.onVideoSelect}
                sendSelectedVideo={props.sendSelectedVideo}
                key={video.videoId}
                video={video}
            />
        );
    });


    return (
        <ul className="video-element">
            { videoItems }
        </ul>
    );
};

export default VideosList;