import { useFormik } from 'formik';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

import MarkerPinIcon from './icons/MarkerPinIcon';
import ReceiverIcon from './icons/ReceiverIcon';
import SenderIcon from './icons/SenderIcon';
import AddressModal from './ui/AddressModal';
type DropDownProps = {
  label: string;
  type: 'sender' | 'receiver';
};
const DropDown = ({ label, type }: DropDownProps) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      address: '',
      name: '',
      surname: '',
      company: '',
      city: '',
      phoneNumber: '',
    },
    onSubmit: () => {
      setIsModalVisible(false);
    },
  });

  return (
    <>
      <AddressModal
        visible={isModalVisible}
        onClose={function (): void {
          setIsModalVisible(false);
        }}
        form={formik}
      />
      <TouchableOpacity onPress={() => setIsDropDownOpen(true)} style={styles.button}>
        <View style={styles.labelContainer}>
          {type === 'sender' ? <SenderIcon /> : <ReceiverIcon />}
          <View>
            <Text
              style={[
                formik.values.address
                  ? [Typography.textSmBold, styles.lineHeight]
                  : Typography.textSmMedium,
                { color: Colors.text.primary },
              ]}
            >
              {formik.values.address ? formik.values.address : label}
            </Text>
            {formik.values.name !== '' && (
              <Text
                style={[Typography.textSmMedium, { color: Colors.text.primary }, styles.lineHeight]}
              >
                {formik.values.name}
              </Text>
            )}
          </View>
        </View>
        {isDropDownOpen && (
          <Animated.View style={styles.dropDown}>
            {[1, 2, 3].map(item => (
              <TouchableOpacity
                onPress={() => {
                  setIsDropDownOpen(false);
                  setIsModalVisible(true);
                }}
                style={[styles.labelContainer, styles.dropDownItem]}
                key={item}
              >
                <MarkerPinIcon />
                <Text style={[Typography.textSmMedium, { color: Colors.text.primary }]}>
                  {label} {item}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </TouchableOpacity>
    </>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 22,
    gap: 18,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropDown: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    backgroundColor: Colors.background.white,
    ...Shadows.shadow_lg03,
    ...Shadows.shadow_lg02,
    ...Shadows.shadow_lg01,
  },
  dropDownItem: {
    padding: 10,
  },
  lineHeight: {
    lineHeight: 14,
  },
});
