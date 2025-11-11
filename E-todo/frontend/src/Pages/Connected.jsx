import './Connected.css'
import imgParams from './Assets/imgParametres.png'

const Connected = () => {

    return (
        <body>
            <header>
                <button>
                    déconnexion
                </button>
                <div>
                    profil
                </div>
                <button className='settings'>
                    <img className="settings" src={imgParams} alt='Settings'/>
                </button>
            </header>
            <main>
                <div className='container'>
                    <div>not started</div>
                    <div>todo</div>
                    <div>in progress</div>
                    <div>done</div>
                </div>
            </main>
            <footer>
                 <div>
                    <p>
                        Foundate by Sen-Sam & Kenan <br />
                        email : <br />
                        - sen-sam.sam@epitech.eu <br />
                        - kenan.lacrampe-cuyaubere-flieutete@epitech.eu <br />
                        address : 2 Pl. Louis Daubenton, 44100 Nantes
                    </p>
                </div>
            </footer>
        </body>
    )
}

export default Connected