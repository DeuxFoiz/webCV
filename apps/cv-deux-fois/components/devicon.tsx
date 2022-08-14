import Image from "next/image";
export default function Devicon(props: {
  img_link: string;
  border_color: string;
  name: string;
}) {


    return (
        <div className="devicon"  style={{ borderColor: props.border_color }} >
            <style
                dangerouslySetInnerHTML={{
                __html: `
                .img-devicon {
                    height: 24px;
                    border-radius: 50%;
                }
                .devicon {
                    padding: 0.2rem;
                    margin: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: left;
                    flex-direction: row;
                    border-radius: 20px;
                    border-style: solid;
                    border-width: 1px;
                    width: 100px;
                    height: 25px;
                }
                .devicon-content {
                    margin-left: 0.2rem;
                    margin-right: 0.2rem;
                    color: var(--font-color);
                    font-size: 0.875rem;
                }
                `,
                }}
            />
        
            {props.img_link !== undefined && props.img_link !== "" ? (
            <Image src={props.img_link} className="img-devicon" alt="devicon" width={25} height={25}  />
            ) : null}
            <p className='devicon-content link'>{props.name}</p>
                
        </div>
  );
}