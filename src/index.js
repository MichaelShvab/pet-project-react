import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { PetsProvider } from './context/pets_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

// dev-7mp1r5yp.us.auth0.com
// xDXXiV6tTolcX0AoffWs6nyOqElZUrrY

ReactDOM.render(
    <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <UserProvider>
        <PetsProvider>
            <FilterProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </FilterProvider>
        </PetsProvider>
    </UserProvider>
  </Auth0Provider>
, document.getElementById('root'))
