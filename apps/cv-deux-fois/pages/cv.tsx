import Image from "next/image"

export default function CV(){
    return (
        <div className='cv' style={{minWidth:'360px', maxWidth:'900px', width:'95%',overflow:'hidden'}}>
            <Image src="/assets/img/cv.png" alt="cv" width={707} height={980} layout="responsive" style={{marginLeft:'50%', translate:'translate(-50%, 0)'}} 
            onClick={() => window.open('Philippe_Kevin_CV.pdf', '_blank')}/>

        </div>
    );
}