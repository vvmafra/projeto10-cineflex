import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"

export default function SeatsPage() {
    const [seatsMovie, setSeatsMovie] = useState(undefined)
    const [selectedSeat, setSelectedSeat] = useState([])
    const { idSessao } = useParams()
    
    
    console.log(selectedSeat)
    
    function clickSeat(seat){
        console.log(seat.isAvailable)
        const newSeat = [...selectedSeat]
        setSelectedSeat([...newSeat, seat])
    }


    useEffect(() => {
        const urlSeats = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        const promise = axios.get(urlSeats)

        promise.then((res) => {
            setSeatsMovie(res.data)
            console.log(res.data)
        })

        promise.catch((err) => {
            console.log(err.response.data)
        })
    }, [])

    if (seatsMovie === undefined) {
        return <div>Loading...</div>
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)
            
            <SeatsContainer>
            {seatsMovie.seats.map((sea) => (
                <SeatItem 
                key={sea.id}
                id={sea.id}
                isAvailable={sea.isAvailable} 
                onClick={() => clickSeat(sea.name, sea.isAvailable)}>
                    {sea.name}
                    </SeatItem>
                ))}
            </SeatsContainer>
            

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle isAvailable={1}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable={2}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable={3}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={seatsMovie.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{seatsMovie.movie.title}</p>
                    <p>{seatsMovie.day.weekday} - {seatsMovie.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: ${props => {
        if (props.isAvailable === 1) {
            return "1px solid #0E7D71"
        } else if (props.isAvailable === 2) {
            return "1px solid #7B8B99"
        } else if (props.isAvailable === 3) {
            return "1px solid #F7C52B"
        }
    }}; 
    background-color: ${props => {
        if (props.isAvailable === 1) {
            return "#1AAE9E"
        } else if (props.isAvailable === 2) {
            return "#C3CFD9"
        } else if (props.isAvailable === 3) {
            return "#FBE192"
        }
    }};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: ${props => props.isAvailable ? "1px solid #808F9D" : 
"1px solid #F7C52B"};
    background-color: ${props => props.isAvailable ? "#C3CFD9" : 
"#FBE192"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`