import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { usePetsContext } from '../context/pets_context'

import {
  Loading,
  Error,
  PetImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SinglePetPage = () => {
  const { id } = useParams()
  const history = useHistory()

  const {single_pet_loading:loading, single_pet_error:error, single_pet:pet, fetchSinglePet} = usePetsContext()

  useEffect(() => {
    fetchSinglePet(id)
    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    if(error) {
      setTimeout(() => {
        history.push('/')
      }, 3000)
    }
    // eslint-disable-next-line
  }, [error])

  if(loading) {
    return <Loading />
  }

  if(error) {
    return <Error />
  }

  const {name, type, bio, breed, isAdopted, id:sn, image} = pet
 
  return <Wrapper>
    <PageHero title={name} pet/>
    <div className="section section-center page">
      <Link to='/pets' className='btn'>
        back to pets
      </Link>
      <div className="pet-center">
        <img src={image} alt='test' />
        <section className="content">
          <h2>{name}</h2>
          <p className='bio'> {bio}</p>
          <p className="info">
            <span>Available : </span>
            {isAdopted ? 'Adoptable' : 'Adopted'}
          </p>
          <p className="info">
            <span>Serial Number : </span>
            {sn}
          </p>
          <p className="info">
            <span>Breed : </span>
            {breed}
          </p>
          <hr />
        </section>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .pet-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .bio {
    line-height: 2;
    max-width: 45em;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .pet-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SinglePetPage
