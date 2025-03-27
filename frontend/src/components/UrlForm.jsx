import React, { useState } from 'react';

const UrlForm = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [linkUrl, setLinktUrl] = useState('');
    let thelink = "";
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://localhost:60624/url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(longUrl),
        });

        const data = await response.text();

        if (response.ok) {
            console.log(data);
            if (JSON.parse(data).url) {
                thelink = JSON.parse(data).url
                console.log(thelink);
            }
            setShortUrl("");
            setLinktUrl(thelink);
        }
        else {
            setShortUrl(data);
            setLinktUrl("");
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Enter the Long URL (ex: https://www.cnn.com) below to retrieve its short URL</p>
                    <input
                        type="text"
                        style={{
                            width: '22rem',
                            margin: '0.5rem 0'
                        }}

                        placeholder="ex: https://www.cnn.com"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                    />
                </label>

                <button type="submit">Shorten URL</button>
            </form>
            {shortUrl && <p>Short URL: {shortUrl}</p>}
            {<p><a href={linkUrl} target="_blank">{linkUrl}</a></p>}

        </div>
    );
};

export default UrlForm;