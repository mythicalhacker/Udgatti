import React ,{Component} from 'react';
import {Text, View } from 'react-native';
import {CardSection , Button , Card} from './common';
class AddDetails extends Component {


  render() {
    return(
      <Card>
        <CardSection>
        <Text> Product: </Text>
        <Text> {this.props.Product} </Text>
        </CardSection>


        <CardSection>
        <Text> Want to: </Text>
        <Text> {this.props.Deal} </Text>
        </CardSection>


        <CardSection>
        <Text> Quantity: </Text>
        <Text> {this.props.Quantity} </Text>
        </CardSection>


        <CardSection>
        <Text> Willing To Pay:</Text>
        <Text> {this.props.Willingtopay} </Text>
        </CardSection>



                <CardSection>
                <Text> User:</Text>
                <Text> {this.props.email} </Text>
                </CardSection>
      </Card>
    );
  }
}



export default AddDetails;
