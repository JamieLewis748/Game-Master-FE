// import React, { useState } from "react";
// import { SafeAreaView, Text, Button } from "react-native";
// import DatePicker from "react-native-datepicker";

// const MyDatePicker = () => {
//     const [selectedDate, setSelectedDate] = useState("");

//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//     };

//     return (
//         <SafeAreaView>
//             <Text>Select a Date</Text>
//             <DatePicker
//                 style={{ width: 200 }}
//                 date={selectedDate}
//                 mode="date"
//                 placeholder="Select Date"
//                 format="MM/DD/YYYY" 
//                 maxDate="01/01/2030"
//                 confirmBtnText="Confirm"
//                 cancelBtnText="Cancel"
//                 onDateChange={handleDateChange}
//             />
//         </SafeAreaView>
//     );
// };

// export default MyDatePicker;