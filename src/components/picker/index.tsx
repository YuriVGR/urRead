import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/pro-solid-svg-icons";

interface PickerProps {
  options: any[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

interface ItemProps {
  label: string[];
  value: string[];
  onPress: () => void;
}

const DropdownPickerItem = ({ label, onPress }: ItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View>
        <Text style={{ fontWeight: "400" }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const DropdownPicker = ({
  options,
  selectedValue,
  onValueChange,
  modalVisible,
  setModalVisible,
}: PickerProps) => {
  const [selected, setSelected] = useState(options[0].value);

  const modalPosition = { top: 10, left: 10 };

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Text style={styles.buttonText}>{selected}</Text>
        <View style={{ flexDirection: "column" }}>
          <FontAwesomeIcon icon={faAngleUp} style={{ marginBottom: -2.5 }} />
          <FontAwesomeIcon icon={faAngleDown} style={{ marginTop: -2.5 }} />
        </View>
      </View>
      <Modal visible={modalVisible} transparent={true}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.optionsContainer}>
            {options.map((option, itemIndex) => (
              <React.Fragment key={itemIndex}>
                <DropdownPickerItem
                  key={itemIndex}
                  label={option.label}
                  value={option.value}
                  onPress={() => {
                    setSelected(option.value);
                    onValueChange(option.value);
                    setModalVisible(false);
                  }}
                />

                {itemIndex < options.length - 1 && (
                  <View style={styles.divider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Modal

  modalContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  optionsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "column",
    width: "50%",
  },
  // Object

  item: {
    padding: 15,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  divider: {
    height: 1,
    width: "90%",
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
  },

  // Button
  // Button
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    gap: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});
