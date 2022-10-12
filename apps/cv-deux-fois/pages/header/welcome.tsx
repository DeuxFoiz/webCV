import Image from 'next/image';
export default function Welcome(props : {
    isExpanded : boolean,
}) {
    return (
    <div className={`flex-column flex-center overview `}>
        <h1 className='welcome-tile'>DeuxFois</h1>
        <p className='bio'>Bonjour<span role='img' aria-label="Bonjour et bienvenue">👋🏻</span>et bienvenue <br/> 
        Je suis un étudiant Vannetais passionné
            <br/>
            <br/>Je cherche un stage de M2
            <br/> pour le premier semestre de l'année 2023
        </p>
        <Image src={require('../../public/assets/img/pdp.jpg')} className="pdp" alt="profil"  width={150} height={150} loading="lazy"/>
    </div>
    );
}
