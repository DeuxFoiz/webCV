
export default function IframeJS(props: {
    link: string;
}) {
    // const Container = styled.div`
    //     border: none;
    //     overflow: hidden;
    //     scrollbar-width: none;
    //     height: 100%;
    //     width: 100%;
    //     `;
    // const Iframe = styled.iframe`
    //     border: none;
    //     overflow: hidden;
    //     scrollbar-width: none;
    //     width: 375px;
    //     min-height: 375px;
    //     `;
    return (
        
        <div className="">
            <style>
                {`
                .drop {
                    animation: drop 5s ease-in-out;
                    background-color: var(--bg-body);
                }
                @keyframes drop {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-100%);
                    }
            `}
            </style>
            <iframe src={props.link} title="iframe drop" />
        </div>
    );
}
