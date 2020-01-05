import React from 'react';

import UserProfile from './UserProfile';

const VideoListItem = ({ video, onVideoSelect, sendSelectedVideo }) => {
    const imageUrl = video.thumbnail;

    return (
        <li  key={video.videoId} onClick={() =>{ onVideoSelect(video);
        sendSelectedVideo(UserProfile.getName(), video.videoId, video.title);}} >
        <div className="list-item">
            <div className="thumbnail">
                <img src={imageUrl} alt="youtube-thumbnail"/>
            </div>
            <div className="video-details">
                <div title={video.title}>
                    {video.title.substring(0,20)}
                </div>
                <div title={video.description}>
                    {video.description.substring(0,20)}
                </div>
                <div>
                    Total votes - TPD
                </div>
            </div>
        </div>
        </li>
    );
};

export default VideoListItem;