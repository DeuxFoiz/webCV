export default function Blog() {
    return (
        <iframe src="https://deuxfois.github.io/quartz/"
        // style={{"width": "100%", "height": "100%", "position": "absolute", "top": "0", "left": "0", "border": "none"}}
        style={{"width": "100vw", "height": "1800px", "border": "none", marginTop:'-400px',zIndex:'1'}}
        title="blog"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
        </iframe>

    );
    }