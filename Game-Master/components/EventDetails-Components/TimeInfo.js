import react from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { View } from "react-native";

const TimeInfo = ({ time }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton icon="clock-outline" size={16} color="gray" />
            <Paragraph>
                <Paragraph style={{ fontWeight: "bold" }}>Time: </Paragraph>
                {time}
            </Paragraph>
        </View>
    );
};

export default TimeInfo;