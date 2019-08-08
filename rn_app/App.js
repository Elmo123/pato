import React from 'react';
import { Button, Dimensions, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import { pushNotifications } from './src/services';
import BackgroundTask from 'react-native-background-task';

// Notification
pushNotifications.configure();

var isItNull;

var jsonData = require('./data/data.json'); 
// database url tag
var tag = '0000'
var conn = false;
const freq = 30000; //30 sec

//settings
const RNFS = require('react-native-fs');
const pathSet = RNFS.DocumentDirectoryPath + '/settings.json';
const defSettings = require('./data/settings.json');

// setup settings variable matching File Systems (react-native-fs) object
var settings = {
  _40: null,
  _65: null,
  _55: null
}

// ** GLOBALLY USED VARIABLES ** \\

// Amount of data shown in Details Screen
var maxDet = 0;

// For progress bar control
var maxElev = 0;
var minElev = 0;
var maxFlow = 0;
var minFlow = 0;

// notification alarms
var alarmEMax = 9999;
var alarmEMin = 0;
var alarmFMax = 9999;
var alarmFMin = -9999;

// notification messages
const maxElevTempText = "Veden korkeus liian korkea";
const minElevTempText = "Veden korkeus liian matala";
const maxFlowTempText = "Veden virtaus liian nopea";
const minFlowTempText = "Veden virtaus liian hidas";
var notificationText = "<-EMPTY->";

// ** END OF GLOBAL VARIABLES ** \\

// Background task

BackgroundTask.define(() => {
  console.log('Background task execute');
  
  a = new MainScreen();
  a.notifications();
  fetchSingle();
  BackgroundTask.finish();
})
// Using specific settings
openSettingsJSON();

class MainScreen extends React.Component {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
    this.state = {
      datElev: jsonData.data[0].elevation,         // Elevation
      datFlow: jsonData.data[0].flowspeed,         // Flow Speed
      connection: conn,
      notiSent: false
    };
    setInterval(() => (
      this.updateState(),
      this.setState({connection: conn}),
      this.notifications()
      ), 100);
    setInterval(() => (
      fetchSingle()
    ), freq);
  }
  componentDidMount() {
    BackgroundTask.schedule();
  }
  
  updateState(){
    if (jsonData.data[0]!=null){
      this.setState({datElev: jsonData.data[0].elevation});
      this.setState({datFlow: jsonData.data[0].flowspeed});
    }
  }

  notifications(){
    // NOTIFICATIONS
    if (this.state.datElev >= alarmEMax && this.state.notiSent == false && this.state.datElev != null){
      notificationText = maxElevTempText;
      pushNotifications.localNotification(notificationText);
      this.setState({notiSent: true});
      setTimeout(() =>(
        this.setState({notiSent: false})
      ), 10000);
    }
    else if (this.state.datElev <= alarmEMin && this.state.notiSent == false && this.state.datElev != null){
      notificationText = minElevTempText;
      pushNotifications.localNotification(notificationText);
      this.setState({notiSent: true});
      setTimeout(() =>(
        this.setState({notiSent: false})
      ), 10000);
    }
    else if (this.state.datFlow >= alarmFMax && this.state.notiSent == false  && this.state.datFlow != null){
      notificationText = maxFlowTempText;
      pushNotifications.localNotification(notificationText);
      this.setState({notiSent: true});
      setTimeout(() =>(
        this.setState({notiSent: false})
      ), 10000);
    }
    else if (this.state.datFlow <= alarmFMin && this.state.notiSent == false  && this.state.datFlow != null){
      notificationText = minFlowTempText;
      pushNotifications.localNotification(notificationText);
      this.setState({notiSent: true});
      setTimeout(() =>(
        this.setState({notiSent: false})
      ), 10000);
    }
  }

  render() {
    var {height, width} = Dimensions.get('window');
    return (
      <View style={{ flex: 1}}>
        <View>
          <Text>{'Database connected: ' + this.state.connection + isItNull}</Text>
        </View>
        <View style={{marginLeft: width * 0.3, marginTop: height * 0.35}}>
          <Progress.Bar progress={(this.state.datElev - minElev) / (maxElev - minElev)} width={height*0.7} height={15} borderColor={"black"} style={{transform: [{ rotate: '-90deg' }]}} animated={false}/>
        </View>
        <View style={{marginTop: height * 0.08}}>
          <View style={{marginLeft: width * 0.2, marginTop: 7, width: '50%'}}>
            <Button
              title="Details"
              onPress={() => {fetchData(), this.props.navigation.navigate('Details')}}
            />
          </View>
          <View style={{marginLeft: width * 0.2, marginTop: 7, width: '50%'}}>
            <Button
              title="Settings"
              onPress={() => this.props.navigation.navigate('Settings')}
            />
          </View>
        </View>
        <View style={{flex: 1, marginLeft: width * 0.1, marginBottom: 20, justifyContent: 'flex-end'}}>
          <Progress.Bar progress={(this.state.datFlow - minFlow) / (maxFlow - minFlow)} width={width*0.8} height={15} color={"red"} borderColor={"black"}  animated={false}/>
        </View>
      </View>
    );
  }
}

class DetailScreen extends React.Component {  
  render() {
    var dataFlat = appendData();
    var {height, width} = Dimensions.get('window');
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
          <View style={{ flex: 1, flexDirection: 'row'}}>
            <View style={[{ width: "35%"}]}> 
              <Text>Timestamp</Text>
            </View>
            <View style={[{ width: "35%"}]}> 
              <Text>Flow Speed</Text>
            </View>
            <View style={[{ width: "30%"}]}> 
              <Text>Elevation</Text>
            </View>
          </View>

          <View style={{ flex: -1, flexDirection: 'row', marginTop: height*0.03}}>
            <FlatList
              data={dataFlat}
              numColumns={3}
              renderItem={({item}) => <Text style={[{ width: "35%"}]}>{item.key}</Text>}
            />
          </View>

        <View style={[{ width: "80%", margin: width * 0.1}]}>
          <Button
            title="Return"
            onPress={() => this.props.navigation.navigate('Main')}
          />
        </View>
      </View>
    );
  }
}

class SetScreen extends React.Component {
  state = {
    maxE: maxElev.toString(),
    minE: minElev.toString(),
    maxF: maxFlow.toString(),
    minF: minFlow.toString(),
    maxD: maxDet.toString(),

    maxEA: alarmEMax.toString(),
    minEA: alarmEMin.toString(),
    maxFA: alarmFMax.toString(),
    minFA: alarmFMin.toString(),
  };

  restoreDefSet = () => {    
    var defaultJson = {
      settings: {
        maxElev:    defSettings["settings"].maxElev,
        minElev:    defSettings["settings"].minElev,
        maxFlow:    defSettings["settings"].maxFlow,
        minFlow:    defSettings["settings"].minFlow,
        maxDet:     defSettings["settings"].maxDet,
        alarmEMax:  defSettings["settings"].alarmEMax,
        alarmEMin:  defSettings["settings"].alarmEMin,
        alarmFMax:  defSettings["settings"].alarmFMax,
        alarmFMin:  defSettings["settings"].alarmFMin
      }
    };
    RNFS.writeFile(pathSet, JSON.stringify(defaultJson), 'utf8')
      .then(() => {
        console.log('File written');
      })
      .catch((err) => {
        console.log(err.message);
      });
      openSettingsJSON();
  }

  saveSettings = () => {
    maxElev   = parseInt(this.state.maxE);
    minElev   = parseInt(this.state.minE);
    maxFlow   = parseInt(this.state.maxF);
    minFlow   = parseInt(this.state.minF);
    maxDet    = parseInt(this.state.maxD);
    alarmEMax = parseInt(this.state.maxEA);
    alarmEMin = parseInt(this.state.minEA);
    alarmFMax = parseInt(this.state.maxFA);
    alarmFMin = parseInt(this.state.minFA);

    var txtJson = {
      settings: {
        maxElev: maxElev, 
        minElev: minElev,
        maxFlow: maxFlow,
        minFlow: minFlow,
        alarmEMax: alarmEMax,
        alarmEMin: alarmEMin,
        alarmFMax: alarmFMax,
        alarmFMin: alarmFMin,
        maxDet: maxDet
      }
    };

    // Write settings.json file
    RNFS.writeFile(pathSet, JSON.stringify(txtJson), 'utf8')
      .then((success) => {
        console.log('File written');
      })
      .catch((err) => {
        console.log(err.message);
      });
      openSettingsJSON();
  }
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
        <View style= {{marginTop: '10%'}}>
          <View style={{flex: -1, flexDirection: 'row', marginLeft:'15%'}}>
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={[
                {key: "Max Elevation: "}, 
                {key: "Min Elevation: "}, 
                {key: "Max Flow Speed: "},
                {key: "Min Flow Speed: "},
                {key: "Max data stored: "}
              ]}
              renderItem={({item}) =>
                  <Text style={[{paddingTop: 4, textAlign: "right", height: 30}]}>
                    {item.key}
                  </Text>
                }
            />

            <View style={{ flex: -1, marginRight:'15%', width: '30%'}}>
              <TextInput
                    keyboardType="number-pad" 
                    style={{fontSize: 15, paddingTop: 0, paddingBottom: 0, height: 30}}
                    onChangeText={(text) => (
                        this.setState({maxE: text})
                      )}
                    value={this.state.maxE}
                    onEndEditing={() => {
                      if (this.state.maxE == ''){
                        this.setState({maxE: '0'});
                      }
                    }}
              />
              <TextInput 
                    keyboardType="number-pad"
                    style={{fontSize: 15, paddingTop: 0, paddingBottom: 0, height: 30}}
                    onChangeText={(text) => (   
                        this.setState({minE: text})
                      )}
                    value={this.state.minE}
                    onEndEditing={() => {
                      if (this.state.minE == ''){
                        this.setState({minE: '0'});
                      }
                    }}
              />
              <TextInput 
                    keyboardType="number-pad"
                    style={{fontSize: 15, paddingTop: 0, paddingBottom: 0, height: 30}}
                    onChangeText={(text) => (
                        this.setState({maxF: text})
                      )}
                    value={this.state.maxF}
                    onEndEditing={() => {
                      if (this.state.maxF == ''){
                        this.setState({maxF: '0'});
                      }
                    }}
              />
              <TextInput
                    keyboardType="number-pad"
                    style={{fontSize: 15, paddingTop: 0, paddingBottom: 0, height: 30}}
                    onChangeText={(text) => (
                        this.setState({minF: text})
                      )}
                    value={this.state.minF}
                    onEndEditing={() => {
                      if (this.state.minF == ''){
                        this.setState({minF: '0'});
                      }
                    }}
              />
              <TextInput 
                    keyboardType="number-pad"
                    style={{fontSize: 15, paddingTop: 0, paddingBottom: 0, height: 30}}
                    onChangeText={(text) => (
                        this.setState({maxD: text})
                      )}
                    value={this.state.maxD}
                    onEndEditing={() => {
                      if (this.state.maxD == ''){
                        this.setState({maxD: '0'});
                      }
                    }}
              />
            </View>
          </View>

          <View style={{ flex: -1, flexDirection: 'row', marginLeft:'15%', marginTop:'5%'}}>
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={[
                  {key: "Max Elevation Alarm: "},
                  {key: "Min Elevation Alarm: "},
                  {key: "Max Flow Speed Alarm: "},
                  {key: "Min Flow Speed Alarm: "}
                ]}
                renderItem={({item}) => 
                <Text style={[{paddingTop: 4, textAlign: "right", height: 30}]}>
                    {item.key}
                </Text>
                }
            />          
            <View style={{ flex: -1, marginRight:'15%', width:'30%'}}>
              <TextInput 
                    keyboardType="number-pad"
                    style={{fontSize: 15, paddingTop: 0, paddingBottom: 0, height: 30}}
                    onChangeText={(text) => (
                        this.setState({maxEA: text})
                      )}
                    value={this.state.maxEA}
                    onEndEditing={() => {
                      if (this.state.maxEA == ''){
                        this.setState({maxEA: '0'});
                      }
                    }}
              />
              <TextInput 
                    keyboardType="number-pad"
                    style={{fontSize: 15, paddingTop: 0, paddingBottom: 0, height: 30}}
                    onChangeText={(text) => (   
                        this.setState({minEA: text})
                      )}
                    value={this.state.minEA}
                    onEndEditing={() => {
                      if (this.state.minEA == ''){
                        this.setState({minEA: '0'});
                      }
                    }}
              />
              <TextInput 
                    keyboardType="number-pad"
                    style={{fontSize: 15, paddingTop: 0, paddingBottom: 0, height: 30}}
                    onChangeText={(text) => (
                        this.setState({maxFA: text})
                      )}
                    value={this.state.maxFA}
                    onEndEditing={() => {
                      if (this.state.maxFA == ''){
                        this.setState({maxFA: '0'});
                      }
                    }}
              />
              <TextInput 
                    keyboardType="number-pad"
                    style={{fontSize: 15, paddingTop: 0, paddingBottom: 0, height: 30}}
                    onChangeText={(text) => {
                        if (text == null){
                          text = '0';
                        }
                        this.setState({minFA: text})                    
                      }
                    }
                    value={this.state.minFA}
                    onEndEditing={() => {
                      if (this.state.minFA == ''){
                        this.setState({minFA: '0'});
                      }
                    }}
              />
            </View>
          </View>
        </View>
        <View>
          <TextInput 
            style={{fontSize: 15, paddingTop: 0, paddingBottom: 0, height: 30}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onEndEditing={() => {tag = this.state.text} }
          />
        </View>
        <View style={[{ width: "90%", margin: 10}]}>
        <Button 
          title="Save"
          onPress={() => (this.saveSettings(), this.props.navigation.navigate('Main'))}
        />
        </View>
        <View style={[{ width: "90%", margin: 10}]}>
        <Button 
          title="Restore Defaults"
          onPress={() => (this.restoreDefSet(), this.props.navigation.navigate('Main'))}
        />
        </View>
        <View style={[{ width: "90%", margin: 10}]}>
          <Button
            title="Cancel"
            onPress={() => (openSettingsJSON(), this.props.navigation.navigate('Main'))}
          />
        </View>
        
      </View>
    );
  }
}

/*------- Functions outside of Classes ------*/
// Opens settings.json if it exists
function openSettingsJSON (){
  RNFS.exists(pathSet)
    .then(  (exists) => {
      if (exists){
        settings = RNFS.readFile(pathSet, 'utf8');
        console.log('Successfully opened ' + pathSet);
      }
      else if(!exists){
        // if settings.json doesn't exist, using preset default settings
        settings._55 = JSON.stringify(defSettings);
        console.log('Unable to open: ' + pathSet + ' \nUsing default settings');    
      }
      else{
        settings._55 = JSON.stringify(defSettings);
        console.log('This shouldn\'t happen\nUnable to open: ' + pathSet + ' \nUsing default settings');
      }
    
    })
    .then(() => {
      setTimeout(() =>(
        loadSettings()
        ), 1);
    });
}

// Sets settings to match values from settings.json
function loadSettings(){
  var set = JSON.parse(settings._55);

  if(set != null){  
    maxDet = set["settings"].maxDet;
    maxElev = set["settings"].maxElev;
    minElev = set["settings"].minElev;
    maxFlow = set["settings"].maxFlow;
    minFlow = set["settings"].minFlow;

    // notification alarms
    alarmEMax = set["settings"].alarmEMax;
    alarmEMin = set["settings"].alarmEMin;
    alarmFMax = set["settings"].alarmFMax;
    alarmFMin = set["settings"].alarmFMin;

    console.log('Succesfully loaded settings')
  }
  else {
    console.log('Failed to load settings');
  }
}

// Deleting settings.json file
// Not used in normal usage of application
function clearSettingsJSON(){
  temp_path = RNFS.DocumentDirectoryPath + '/settings.json';
  return RNFS.unlink(temp_path)
    .then(() => {
      console.log('FILE DELETED');
    })
    .catch((err) => {
      console.log(err.message);
  });
}

// Parsing data from JSON for Flatlist
function appendData () {
  var data = [];
  let j = 0;
  for (let i=0;i<maxDet;i++){
    if (jsonData.data[i] == null){
      break;
    }
    data[j] = {key: jsonData.data[i].timestamp};
    j++;
    data[j] = {key: jsonData.data[i].flowspeed};
    j++;
    data[j] = {key: jsonData.data[i].elevation};
    j++;
  }
  return data;
}
function fetchSingle(){
  console.log('Fetch with tag: ' + tag);
  var a = fetch('http://' + tag + '.ngrok.io/v1/single.json')  
    .then((response) => {
      if (response.status >= 400 && response.status < 600){
        console.log('Error\nresponse status: ' + response.status);
        conn = false;
        return;
      }
      else{
        conn = true;
        console.log('Connected: ' + JSON.stringify(jsonData));
        return response.json();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  setTimeout(() =>
    {if (a._55.data != null){
      console.log('Success: ' + JSON.stringify(a._55.data));
    }
    else {
      console.log('failed? \ndata: ' + JSON.stringify(a));
      isItNull = JSON.stringify(a);
    } 
  }, 1); 
}
function fetchData(){
  console.log('Fetch with tag: ' + tag);
  var a = fetch('http://' + tag + '.ngrok.io/v1/data.json') //database URL
  .then((response) => {
      if (response.status >= 400 && response.status < 600){
        console.log('Error\nresponse status: ' + response.status);
        conn = false;
        return;
      }
      else{
        conn = true;
        console.log('Connected');
        return response.json();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  setTimeout(() =>
    {if (a._55 != null){
      console.log('Success');
    }
    else {
      console.log('failed? \ndata: ' + JSON.stringify(a));
    } 
  }, 1);       
}

/* --- End of Functions --- */

const RootStack = createStackNavigator(
  {
    Main: MainScreen,
    Details: DetailScreen,
    Settings: SetScreen,
  },
  {
    initialRouteName: 'Main',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}