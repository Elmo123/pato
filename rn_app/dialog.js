import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

class dialogAlert extends Component {
    state = {
        dialogVisible: false
    };

    showDialog = () => {
        this.setState({dialogVisible: true});
    };

    render() {
        return (
            <View>
                <DialogInput visible={this.state.dialogVisible}
                    title={"DialogInput 1"}
                    message={"Message for DialogInput #1"}
                    hintInput ={"HINT INPUT"}
                    submitInput={ () => {this.showDialog(false)}}
                    closeDialog={ () => {this.showDialog(false)}}>
                </DialogInput>
            </View>     
        );
    }




}