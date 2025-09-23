import { Image } from 'expo-image';
import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import FileIcon from '../icons/FileIcon';
import PackageIcon from '../icons/PackageIcon';
import ReceiverIcon from '../icons/ReceiverIcon';
import SenderIcon from '../icons/SenderIcon';
import XIcon from '../icons/XIcon';

import Button from './Button';
import Card from './Card';
import Tag from './Tag';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

const InfoModal: React.FC<Props> = ({ visible, onClose, title }) => {
  const windowHeight = useWindowDimensions().height;
  const height = windowHeight * 0.85;
  const billingInfo = [
    { label: 'მიწოდების ფასი', value: '$12.00' },
    { label: 'დამატ, სერვისები', value: '$0.00' },
    { label: 'ნივთების საფასური', value: '$0.00' },
    { label: 'COD საკომისიო', value: '$0.00' },
    { label: 'COD - გადახდა კურიერთან', value: '$0.00' },
    { label: 'კომპანიას ერიცხება', value: '$0.00' },
    {
      label: 'ანგარიშწორების ტიპი',
      value: 'ინვოისი',
    },
  ];
  const billingData = {
    icon: <FileIcon stroke={Colors.icon.black} />,
    title: 'ბილინგის ინფორმაცია',
    body: billingInfo,
  };
  const senderData = {
    icon: <SenderIcon />,
    title: 'გამგზავნი',
    body: [
      { label: 'სახელი', value: 'ჯონ დოუ' },
      { label: 'ტელეფონი', value: '+995 599 12 34 56' },
      { label: 'მისამართი', value: 'თბილისი, ვაჟა-ფშაველას გამზ. 132' },
      { label: 'ელ. ფოსტა', value: 'john.doe@example.com' },
    ],
  };
  const receiverData = {
    icon: <ReceiverIcon stroke={Colors.icon.black} />,
    title: 'მიმღები',
    body: [
      { label: 'სახელი', value: 'ჯონ დოუ' },
      { label: 'ტელეფონი', value: '+995 599 12 34 56' },
      { label: 'მისამართი', value: 'თბილისი, ვაჟა-ფშაველას გამზ. 132' },
      { label: 'ელ. ფოსტა', value: 'john.doe@example.com' },
    ],
  };
  const invoiceData = {
    body: [
      {
        label: 'სტატუსი',
        value: <Tag label={'pending'} variant='warning' />,
      },
      {
        label: 'თარიღი',
        value: '12/12/2023',
      },
      { label: 'საბანკო ანგარიში', value: 'GE29TB7190109400000003' },
      { label: 'სერვისები', value: 'მიწოდება' },
      { label: 'სულ', value: '$12.00' },
    ],
  };
  const AmanatInfo = () => (
    <View style={styles.container}>
      <Image source={require('../../assets/images/box.png')} style={styles.image} />
      <View style={styles.gap}>
        <Text style={[Typography.textSmRegular, styles.black]}>
          წონა: <Text style={Typography.textSmBold}>0.5კგ - მდე</Text>
        </Text>
        <Text style={[Typography.textSmRegular, styles.black]}>
          რაოდენობა: <Text style={Typography.textSmBold}>2</Text>
        </Text>
      </View>
    </View>
  );
  const data = {
    icon: <PackageIcon />,
    title: 'ინფორმაცია ამანათზე',
    body: <AmanatInfo />,
  };
  const ActionCard = () => {
    return (
      <View style={styles.actionContainer}>
        <Button variant='secondary' size='sm' onPress={() => {}}>
          დახმარება
        </Button>
        <Button variant='secondary' size='sm' onPress={() => {}}>
          ინვოისი
        </Button>
        <Button variant='secondary' size='sm' onPress={() => {}}>
          ბეჭვდა
        </Button>
      </View>
    );
  };
  const actionData = {
    title: 'შეკვეთა: #223394',
    body: <ActionCard />,
  };

  return (
    <Modal visible={visible} transparent animationType='slide' onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, { height }]}>
          <View style={styles.row}>
            <Text style={[Typography.textMdSemiBold, styles.black]}>{title}</Text>

            <TouchableOpacity onPress={onClose}>
              <XIcon width={12} height={12} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.body}>
            <Card variant='info' data={actionData} />
            <Card variant='info' data={data} />
            <Card variant='info' data={invoiceData} />
            <Card variant='info' data={senderData} />
            <Card variant='info' data={receiverData} />
            <Card variant='info' data={billingData} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.modal.overlay,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modal: {
    width: '100%',
    backgroundColor: Colors.modal.background,
    borderRadius: 12,
    padding: 18,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  body: {
    gap: 10,
    marginTop: 20,
  },
  black: {
    color: Colors.text.black,
  },
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 14,
    gap: 16,
    alignItems: 'center',
    backgroundColor: Colors.background.infoAmanat,
  },
  gap: {
    gap: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  image: { width: 75, height: 75 },
});
