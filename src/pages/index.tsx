import type { NextPage } from 'next'
import { useState } from 'react'
import Card from '../components/Card/Card'
import styles from '../ui/styles/Home.module.css'
import { Dialog, TextField, 
  Grid, DialogActions, 
  Button, Snackbar 
} from '@mui/material'
import { useIndex } from '../data/hooks/useIndex'


const Home: NextPage = () => {
  
  const {
    listPets, 
    selectedPet, setSelectedPet, 
    email, setEmail, 
    amount, setAmount,
    message, setMessage,
    adopt
  } = useIndex()

  return (
    <div>
      <span className={styles.container}>
        Com um pequeno valor mensal, você pode adotar um pet
      </span>

      <div className={styles.list}>
      {listPets.map((pet,key) => (
        <Card 
        key={key}
        pet={pet}
        onSelect={(pet) => setSelectedPet(pet)}
        />
      ))}
      </div>

      <Dialog 
      open={selectedPet !== null} 
      fullWidth 
      PaperProps={{sx: {p:'20px'}}}
      onClose={() => setSelectedPet(null)}
      >

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
            label={"E-mail"} 
            type={'email'} 
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
            label={"Quantia por mês"}
            type={'number'} 
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
        </Grid>

        <DialogActions sx={{sx: {p:5} }}>
          <Button 
          color={'secondary'}
          onClick={() => setSelectedPet(null)}
          >
            Cancelar
          </Button>
          <Button 
          variant={'contained'}
          onClick={() => adopt()}
          >
            Confirmar adoção
            </Button>
        </DialogActions>
        
      </Dialog>

      <Snackbar 
      open={message.length > 0} 
      message={message}
      autoHideDuration={2500}
      onClose={() => setMessage('')}
      />
    </div>
  )
}

export default Home
