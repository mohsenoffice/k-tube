
import React from 'react';

const VideoListItem = ({ video, onVideoSelect }) => {
    const imageUrl = video.thumbnail;

    return (
        <li key={video.id} onClick={() => onVideoSelect(video)} >
            <div>
                <div>
                    <img src={imageUrl} alt="youtube-thumbnail"/>
                </div>
            </div>
            <div>
                <div>
                    {video.title}
                </div>
                <div>
                    {video.description}
                </div>
                <div>
                    Total votes - TPD
                </div>
            </div>
        </li>
    );
};

export default VideoListItem;