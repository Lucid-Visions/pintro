import React, { useReducer } from 'react';
import { ScrollView, SafeAreaView, Text, View, TextInput, TouchableOpacity } from "react-native"
import PropTypes from 'prop-types';

import WideButtonComponent from "../../../components/WideButtonRight";

import BackButton from '../../shared/back-button';

import {
  initialState,
  title,
  subTitle,
  nameLabel,
  namePlaceholder,
  storyLabel,
  storyPlaceholder,
  ctaText
} from './constants';

import styles from './styles';

const reducer = (state, { field, value}) => {
  return {
    ...state,
    [field]: value
  }
};

const CreateCommunity = ({ navigation }) => {

  const [ state, dispatch ] = useReducer(reducer, initialState)
  
  const onChange = (field, value) => {
    dispatch({ field, value })
  };

  const { name, story } = state;

  return (
    <ScrollView style={styles.container2}>
      <SafeAreaView style={styles.container1}>
        <View style={styles.container}>
          
          <BackButton navigation={navigation} />
          
          <View>
            <Text style={styles.h1}>{title}</Text>
            <Text style={styles.h2}>{subTitle}</Text>
          </View>

          <View style={styles.bottomBorder}>
            <Text style={styles.prompt}>{nameLabel}</Text>
              <TextInput
                  style={styles.placeholder}
                  placeholder={namePlaceholder}
                  onChangeText={text => onChange('name', text)}
                  value={name}
              />
          </View>
  
          <View style={styles.bottomBorder}>
            <Text style={styles.prompt}>{storyLabel}</Text>
            <TextInput
                style={{...styles.placeholder,height:100}}
                multiline={true}
                placeholder={storyPlaceholder}
                onChangeText={text => onChange('story', text)}
                value={story}
            />
          </View>
  
          <View>
            <TouchableOpacity underlayColor="white">
                <WideButtonComponent
                    value={ctaText}
                    source={require("../../../assets/arrow-right-white.png")}
                    containerStyle={{
                    ...styles.btn
                    }}
                    textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: 'lightgrey' }}
                />
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </ScrollView>
  )
};

CreateCommunity.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default CreateCommunity;

// export default class BusSignUpScreen1 extends Component {
//     static navigationOptions = {
//         headerLeft: "Arrow_back", // To be changed with an icon.
//     }

//     constructor(props) {
//         super(props)
//         this.state = {
//             companyName: '',
//             tagline: '',
//             companyStory: '',
//             seekingInvestment: false,
//             currentlyHiring: false,
//             loggedUser: ""
//         }
//     }

//     toggleState1 = () => {
//       this.setState({
//           seekingInvestment: !this.state.seekingInvestment
//       })
//       console.log("seekingInvestment")
//     }

//     toggleState2 = () => {
//       this.setState({
//           currentlyHiring: !this.state.currentlyHiring
//       })
//       console.log("currentlyHiring")
//     }

//     componentDidMount() {
//       this.fetchOwnerData();
//     }

//     fetchOwnerData = async () => {
//       var myHeaders = new Headers();
//       var userToken = await AsyncStorage.getItem("token");
//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("Authorization", userToken);
  
//       var requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow"
//       };
  
//       var response = await fetch(
//         `http://${env.host}:${env.port}/api/v1/user/data?`,
//         requestOptions
//       ).catch(err => {
//         console.log(err)
//         return;
//       });
  
//       var responseText = await response.text();
//       var responseJson = JSON.parse(responseText);
  
//       if (responseJson.err) {
//         console.log("here",responseJson.err);
//         return;
//       }
      
//       this.setState({loggedUser: responseJson})
//     }

//     async registerBusiness() {
//       const { navigation } = this.props;

//       var userToken = await AsyncStorage.getItem("token");
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("Authorization", userToken);

//       var input = JSON.stringify({
//         name: this.state.companyName,
//         tagline: this.state.tagline,
//         bio: this.state.companyStory,
//         seeking_investment: this.state.seekingInvestment,
//         currently_hiring: this.state.currentlyHiring
//       });

//       var requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: input,
//         redirect: "follow"
//       };

//       var response = await fetch(
//         `http://${env.host}:${env.port}/api/v1/business`,
//         requestOptions
//       );

//       var responseJson = await response.json();
//       if (response.ok) {
//         var companyID = responseJson._id
//         var ownerID = responseJson.owner.user_id
//         navigation.navigate("BusSignUp2", {companyID: companyID, user: this.state.loggedUser});
//       } else {
//         alert(responseJson.message);
//       }
//     }

//     render() {
//         const {navigation} = this.props
//         return (
//             <ScrollView style={styles.container2} showsVerticalScrollIndicator={false}>
//             <SafeAreaView style={styles.container1}>
//             <View style={styles.container}>
//             {navigation.canGoBack() && (
//               <TouchableOpacity
//                 onPress={() => {
//                   navigation.goBack();
//                 }}
//               >
//                 <Image
//                   source={require("../assets/leftArrow.png")}
//                   style={{
//                     height: 20,
//                     width: 25,
//                     resizeMode: "contain",
//                     marginLeft: 20
//                   }}
//                 />
//               </TouchableOpacity>
//             )}
//                 <View>
//                     <Text style={styles.h1}>Let's get into it</Text>
//                     <Text style={styles.h2}>Build your company profile</Text>
//                 </View>

//                 <View style={styles.bottomBorder}>
//                     <Text style={styles.prompt}>Company Name</Text>
//                     <TextInput
//                         style={styles.placeholder}
//                         placeholderTextColor={'#ACACAC'}
//                         placeholder="Enter your company name"
//                         onChangeText={(companyName) => this.setState({companyName})}
//                         value={this.state.companyName}
//                     />
//                 </View>

//                 <View style={styles.bottomBorder}>
//                     <Text style={styles.prompt}>Tagline</Text>
//                     <TextInput
//                         style={styles.placeholder}
//                         placeholderTextColor={'#ACACAC'}
//                         placeholder="Enter your tagline"
//                         onChangeText={(tagline) => this.setState({tagline})}
//                         value={this.state.tagline}
//                     />
//                 </View>

//                 <View>
//                     <Text style={styles.prompt}>Are you.. ?</Text>
//                     <View 
//                       flexDirection={'row'}
//                       marginBottom={5}
//                       paddingTop={20}
//                       alignSelf={'center'}
//                       alignItems={'center'}
//                       justifyContent={"center"}
//                     >
//                       <View style={{flexDirection: "row", marginBottom: 5, justifyContent: "space-between" }}>
//                         <TouchableOpacity style={styles.companyBtn} onPress={ this.toggleState1 }>
//                           <View style={this.state.seekingInvestment ? {borderRadius: 120/2, backgroundColor: '#1A1A1A'} : {borderRadius: 120/2, backgroundColor: '#F0F0F1'}}>
//                             <Image
//                               source={this.state.seekingInvestment ? require('../assets/black-circle-check.png') : require('../assets/black-circle-transparent.png')}
//                               style={{resizeMode: 'center', width: 25, height: 25} }>
//                             </Image>
//                           </View>
//                           <Text style={[styles.companyText, this.state.seekingInvestment && styles.companyText]}>Seeking Investment</Text>
//                         </TouchableOpacity>
//                       </View>
//                       <View style={{flexDirection: "row", marginBottom: 5, justifyContent: "space-between" }}>
//                         <TouchableOpacity style={styles.companyBtn} onPress={ this.toggleState2 }>
//                           <View style={this.state.currentlyHiring ? {borderRadius: 120/2, backgroundColor: '#1A1A1A'} : {borderRadius: 120/2, backgroundColor: '#F0F0F1'}}>
//                             <Image
//                               source={this.state.currentlyHiring ? require('../assets/black-circle-check.png') : require('../assets/black-circle-transparent.png')}
//                               style={{resizeMode: 'center', width: 25, height: 25}} >
//                             </Image>
//                           </View>
//                           <Text style={[styles.companyText, this.state.currentlyHiring && styles.companyText]}>Currently Hiring</Text>
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                 </View>

//                 <View style={styles.bottomBorder}>
//                     <Text style={styles.prompt}>Company story</Text>
//                     <TextInput
//                         style={{...styles.placeholder,height:100}}
//                         placeholderTextColor={'#ACACAC'}
//                         multiline={true}
//                         placeholder={"Tell us about your company"}
//                         onChangeText={(companyStory) => {if(companyStory.length<160){this.setState({companyStory})}else{alert("160 Chars max")}}}
//                         value={this.state.companyStory}
//                     />
//                 </View>

//                 <View paddingTop={20} alignSelf={'center'}>
//                     <TouchableOpacity onPress={() => this.registerBusiness()} underlayColor="white">
//                         <WideButtonComponent
//                             value={"STEP 1 OF 5"}
//                             source={require("../assets/arrow-right-white.png")}
//                             containerStyle={{
//                             ...styles.btn
//                             }}
//                             textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: 'lightgrey' }}
//                         />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//           </SafeAreaView>
//           </ScrollView>
//         )
//     }
// }