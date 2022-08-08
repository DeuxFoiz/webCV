import Image from 'next/image';
export default function Intro() {
    return (
        <div className="chapter bg-trigger">
            <h1 className="big-title">DeuxFois</h1>
            <h2 className="subtitle big-title" style = {{ margin:"0", padding:"0"}}>Etudiant en Master AIDN</h2>
                <div className='flex-row flex-center pres'>
                    <p className="text">
                    Je suis étudiant dans le domaine des Applications Interactives et des Données Numériques <br/>
                    Je souhaite me spécialiser dans l&rsquo;intelligence artificielle et les métiers de la data, du web ou d&rsquo;applications lourdes.<br/>
                    <br/>
                    Je partage les notes obsidian sur mon blog, ainsi que des articles que je conseil sur ces sujets et l&rsquo;informatique en général.<br/>
                    N&rsquo;hésitez pas à regarder mon Portfolio ou mon Curriculum Vitae pour plus d&rsquo;informations.
                    
                    </p>
                    <div  className="img-pres pres-content">
                        <Image src="/../assets/img/programming.svg" alt="DeuxFois" width={400} height={400} loading="lazy"/>
                    </div>
                </div>
                <div className="flex-row flex-center action">
                <a className='btn action call-action'>
                <svg className="svg-inline" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-right" role="img" viewBox="0 0 512 512" data-fa-i2svg="">
                <path fill="currentColor" d="M512 256c0-141.4-114.6-256-256-256S0 114.6 0 256c0 141.4 114.6 256 256 256S512 397.4 512 256zM265.9 382.8C259.9 380.3 256 374.5 256 368v-64H160c-17.67 0-32-14.33-32-32v-32c0-17.67 14.33-32 32-32h96v-64c0-6.469 3.891-12.31 9.875-14.78c5.984-2.484 12.86-1.109 17.44 3.469l112 112c6.248 6.248 6.248 16.38 0 22.62l-112 112C278.7 383.9 271.9 385.3 265.9 382.8z" data-darkreader-inline-fill=""></path></svg>
                    Voir mon Portfolio
                </a>
                <a className="btn action second-action" href="resume.html">
                    <svg className="svg-inline" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-lines" role="img" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM272 416h-160C103.2 416 96 408.8 96 400C96 391.2 103.2 384 112 384h160c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 352h-160C103.2 352 96 344.8 96 336C96 327.2 103.2 320 112 320h160c8.836 0 16 7.162 16 16C288 344.8 280.8 352 272 352zM288 272C288 280.8 280.8 288 272 288h-160C103.2 288 96 280.8 96 272C96 263.2 103.2 256 112 256h160C280.8 256 288 263.2 288 272z" data-darkreader-inline-fill=""></path></svg>
                    Voir mon Curriculum
                </a>
                </div>
            

        </div>
    );
}