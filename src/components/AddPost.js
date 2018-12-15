import React, {Component} from 'react';
import {Text , View, TouchableOpacity,Picker} from 'react-native';
import firebase from 'firebase';
import {Card, CardSection, Input} from './common'
import Button from './common/Button';
import {Actions} from 'react-native-router-flux';
import Adds from './Adds';

//1 is none
//2 is buy
//3 is rent


    let final=[];
class AddPost extends Component{
  state =  {
    option: 'none',
    user: '',
    email: '',
    areas: [],
    ilaka: '',
    area: 'fbd'
    };

    componentWillMount() {
      console.log("We are in");
      var self =this;
      firebase.database().ref('users/').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          if(childKey == firebase.auth().currentUser.uid) {
            console.log("is ");
              self.setState({'email':childData.email})
          }
        });
      });
      console.log("khali h kay",self.state.email);

      firebase.database().ref('Areas/').once('value',function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          self.setState(pre => ({
            areas: [...pre.areas,childData.Area]
          }));
        })
        console.log("Areas are:",self.state.areas);
        final=self.renderAreas();
      })

    }
renderAreas() {
  return  this.state.areas.map(function(Area, index){
    return(
          <Picker.Item  key = {index} label = {Area} value = {Area}  />
    );
  })
}

  logic() {
    if(this.state.option === 'none') {
      return (
        this.option()
      );
    }
    else if(this.state.option === 'buy') {
      return(
        this.buy()
      );
    }
    else if(this.state.option === 'rent') {
      return(
        this.rent()
      );
    }
  }
  option() {
    return(
      <Card>
        <TouchableOpacity
        onPress={()=>{this.setState({option:'buy'})}}
      >
        <CardSection>

        <Text>Buy</Text>

        </CardSection>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>{this.setState({option:'rent'})}}
      >
        <CardSection>

        <Text>Rent</Text>

      </CardSection>
  </TouchableOpacity>


        <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Log out
          </Button>
        </CardSection>

      </Card>

    );
  }


  buy() {
    return(
      <Card>
        <TouchableOpacity
        onPress={()=>{this.setState({option:'none'})}}
      >
        <CardSection>
        <Text> Buy </Text>
        </CardSection>
      </TouchableOpacity>

        <CardSection>
        <Input

          Label='Product'
          value={this.state.product}
          onChangeText={product =>this.setState({product})}
          />
        </CardSection>

      <CardSection>
        <Input

          Label='Quantity'
          value={this.state.quantity}
          onChangeText={quantity =>this.setState({quantity})}
          />
        </CardSection>


        <CardSection>
        <Input

          Label='Willing To Pay'
          value={this.state.willingtopay}
          onChangeText={willingtopay =>this.setState({willingtopay})}
          />
        </CardSection>

        <CardSection>
        <Input
          Label='Ilaka'
          value={this.state.ilaka}
          onChangeText={ilaka =>this.setState({ilaka})}
          />

        </CardSection>
          <Picker selectedValue={this.state.area} onValueChange={area=>{this.setState({area})}}>
            {final}
          </Picker>
        <CardSection>
        <Button onPress={()=>{this.setState({option:'none'})}}>
        Options
        </Button>
        </CardSection>


    <CardSection>
          <Button onPress = {this.onBuyProduct.bind(this)}>
          Submit
          </Button>
        </CardSection>



      </Card>
    );
  }




    rent() {
      return(
        <Card>
          <TouchableOpacity
          onPress={()=>{this.setState({option:'none'})}}
        >
          <CardSection>
          <Text> Rent </Text>
          </CardSection>
        </TouchableOpacity>
          <CardSection>

          <Input
            Label = 'Product'
            value={this.state.product}
            onChangeText={product =>this.setState({product})}
            />
          </CardSection>

        <CardSection>
          <Input
            Label='Quantity'
            value={this.state.quantity}
            onChangeText={quantity =>this.setState({quantity})}
            />
          </CardSection>


          <CardSection>
          <Input
            Label='Willing To Pay'
            value={this.state.willingtopay}
            onChangeText={willingtopay =>this.setState({willingtopay})}
            />
          </CardSection>


          <CardSection>
          <Button onPress={()=>{this.setState({option:'none'})}}>
          Options
          </Button>
          </CardSection>


      <CardSection>
            <Button onPress = {this.onRentProduct.bind(this)}>
            Submit
            </Button>
          </CardSection>



        </Card>
      );
    }






  onRentProduct() {

        console.log(this.state.product);
        if(this.state.product == null || this.state.product == '' || typeof this.state.product == undefined) {
          console.log("Error");
          alert("Please fill all the Mandatory Fields");
        }
        else if(this.state.quantity == null || this.state.quantity == '' || typeof this.state.quantity == undefined) {
          alert("Please fill all the Mandatory Fields");
        }

        else if(this.state.willingtopay == null || this.state.willingtopay == '' || typeof this.state.willingtopay == undefined) {
          alert("Please fill all the Mandatory Fields");
        }
    else {
        var useris = firebase.auth().currentUser.uid;
        var destination = "/Notifications/";
        destination = destination + useris;
        firebase.database.ref(destination).set({
        addFrom: this.props.emailFrom,
        Product: this.state.product,
        Quantity: this.state.quantity,
        Willingtopay: this.state.willingtopay,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        Deal: "Rent",
      });
      alert("Your Add has been posted Successfully");
      }

  }




  onBuyProduct() {

    console.log(this.state.product);
    if(this.state.product == null || this.state.product == '' || typeof this.state.product == undefined) {
      console.log("Error");
      alert("Please fill all the Mandatory Fields");
    }
    else if(this.state.quantity == null || this.state.quantity == '' || typeof this.state.quantity == undefined) {
      alert("Please fill all the Mandatory Fields");
    }

    else if(this.state.willingtopay == null || this.state.willingtopay == '' || typeof this.state.willingtopay == undefined) {
      alert("Please fill all the Mandatory Fields");
    }
    else {

      var destination = "/Notifications/";
      var useris = firebase.auth().currentUser.uid;
      destination = destination + useris;
      // var emailis = this.props.emailFrom;
      // var finalEmail = emailis.replace(/[^a-z0-9]/gi,'')
      // var requestToFinalkey = requestTo.replace(/[^a-z0-9]/gi,'');
      var date = new Date();
      var ti = date.getTime();
      firebase.database().ref('Areas/' +ti).update( {
        Area: this.state.ilaka
      });
      firebase.database().ref(destination).set({

        Product: this.state.product,
        Quantity: this.state.quantity,
        Willingtopay: this.state.willingtopay,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        Deal: "Buy",
        EmailFrom: this.state.email,
      });
      alert("Your Add has been posted Successfully");
      }

  }


  render() {
    return(
      <View>
        {this.logic()}
      </View>
    );
  }
}


export default AddPost;
