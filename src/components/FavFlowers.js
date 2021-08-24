import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';



class FavFlowers extends React.Component {
constructor(props){
  super(props);
  this.state({
    flowerFa:[],
    newflower:{},
    show : false
    
  })
this.componentDidMount(
  axios.get(`${process.env.REACT_SERVER_URL}/flowersFa`).then(response => {
    this.setState({flower:response.data})
  }).catch()
)

const deleteFlower=(id)=>{
  // const id =this.state.flowerFa.id
  axios.delete(`${process.env.REACT_SERVER_URL}/deleteFA/${id}`)
  .then(response => {this.setState({flowerFa:response.data})})
  .catch()


}

const shawingModeleUpdate=(flower)=>{
  this.setState({
    newflower:flower,
    show:true,

  })
}
 const updataFlower=(flower)=>{
   const id =this.state.newflower.id
   const body={
     name:this.state.newflower.name, 
     instructions:this.state.newflower.instructions, 
     photo :this.state.newflower.photo

   }
   axios.put(`${process.env.REACT_SERVER_URL}/updataFlower/${id}`,body)
   .then(response=>{
     let newArray=this.state.newflower.map(value=>{
       if(value.id===id){
         
       }
     })
   })
 }


}

  render() {
    const { isAuthenticated } = this.props.auth0;

    return(
      <>
        {/* <h1>My Favorite Flowers</h1> */}
        {isAuthenticated &&
        <flowerFa
          const show={this.state.show}
          const updataFlower={this.updataFlower}
          const shawingModeleUpdate={this.shawingModeleUpdate}
        />
        }

        {this.state.flowerFa.length>0 &&
        this.state.flowerFa.map(flower => {
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
            <Button variant="primary" onClick={()=>this.deleteFlower(flower)} >Delete</Button>
            <Button variant="primary" onClick={()=>this.shawingModeleUpdate(flower)} >Delete</Button>
          </Card.Body>
        </Card>
            )
        })
      }
      </>
    )
  }
}

export default FavFlowers;
