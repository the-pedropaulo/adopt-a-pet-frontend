import { Button } from "@mui/material";
import styles from "./styles.module.scss";
import {TextService} from "../../data/services/TextService"
import { Pet } from '../../data/@types/Pet'

interface ICardProps {
    pet: Pet;
    onSelect: (pet: Pet) => void;
}

export default function Card({pet, onSelect}: ICardProps) {
    return (
    <div className={styles.card} key={pet.id}>
        <div className={styles.container}>
            <div>
                <img src={pet.foto} alt="" />
            </div>
            <div>
                <h4>{pet.nome}</h4>
                <p>{TextService.textLimited(pet.historia,50)}</p>
                
                <Button 
                variant={'contained'}
                fullWidth
                onClick={() => onSelect(pet)}
                >
                    Adotar {pet.nome}
                </Button>
            </div>

        </div>
    </div>
    )
}