import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flowers: []
    }

  this.componentDidMount(
    axios.get(`${process.env.REACT_SERVER_URL}/flowersData`)
    .then(response => {
      this.setState({ flowers: response.data });
    }).catch(err => { console.error(err) })
  )
    

   const addFaFlower=(index)=>{ 
     const body={
       name:this.state.name[index].name, 
       instructions:this.state.instructions[index].instructions,
       photo:this.state.photo[index].photo,
     }
     axios.post(`${process.env.REACT_SERVER_URL}/flowers`,body).then(response => {

     }).catch(err => {console.log(err)});
   }

  }
  render() {
    return (
      <>
        <h1>API Flowers</h1>
        {this.state.flowers.length>0 &&
        this.state.flowers.map(flower => {
          return(

            <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{flower.name}Card Title</Card.Title>
            <Card.Text>{flower.instructions}
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <img src={flower.photo} alt=''/>
            <Button variant="primary" onClick={()=>this.addFaFlower(flower)}  >Add-To-Fav button</Button>
          </Card.Body>
        </Card>
            )
        })
        
  }
      </>
    )
  }
}

export default Home;
