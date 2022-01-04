import React, {useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { Home, About, SinglePet, Cart, Checkout, Error, Pets, PrivateRoute, AuthWrapper  } from './pages'

function App() {
const callBackendAPI = async () => {
  const response = await fetch('/', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }});
  const body = await response;
  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body
};

useEffect(() => {
  callBackendAPI()
}, [])

  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/pets'>
            <Pets />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/pets/:id' children={<SinglePet />} />
          <PrivateRoute exact path='/checkout'>
            <Checkout />
          </PrivateRoute>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router> 
    </AuthWrapper>
  )
}

export default App
