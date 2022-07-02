import { Axios, AxiosError } from "axios";
import { useState, useEffect } from "react";
import { Pet } from '../@types/Pet'
import { ApiService } from "../services/ApiService"; 

export function useIndex() {

    const [listPets, setListPets] = useState<Pet[]>([])

    const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
    const [email, setEmail] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
      ApiService.get('/pets')
      .then((response) => {
        setListPets(response.data);
      }).catch((err) => {
        console.log(err)
      })
    }, [])

    useEffect(() => {
      if(selectedPet === null) {
        clearForm();
      }
    }, [selectedPet])

    function adopt() {
      if(selectedPet !== null) {
        if(validateDataAdoption()) {
          ApiService.post('/adocao', {
            pet_id: selectedPet.id,
            email,
            valor: amount
          }).then(() => {
            setSelectedPet(null);
            setMessage('Pet adotado com sucesso');
          }).catch((error: any) => {
            setMessage(error.response?.data.message);          
          })
        } else {
          setMessage('Preencha os campos corretamente!')
        }
      }
    }

    function validateDataAdoption() {
      return email.length > 0 && amount.length > 0;
    }

    function clearForm() {
      setEmail('')
      setAmount('')
    }

    return { 
        listPets, 
        selectedPet, 
        setSelectedPet,
        email, 
        setEmail,
        amount,
        setAmount,
        message,
        setMessage,
        adopt
    };
}